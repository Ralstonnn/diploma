const express = require("express");
const session = require("express-session");
const loginSystem = require("./loginSystem");
const { con } = require("./DbHandler");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "very secure secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // Two hours in ms
      sameSite: true,
      secure: false, // Set secure to true in production !!!
    },
  })
);

// TODO: add error handling
app.get("/api/get-words", (req, resp) => {
  con.query(
    `select w.word, w.definition from words w inner join user u on w.user_id = u.id 
    where u.login = '${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      resp.json(res);
    }
  );
});

app.get("/api/learn-words", (req, resp) => {
  con.query(
    `select w.word, w.definition, time_before_repeat, repeat_counter from words w inner join user u on w.user_id = u.id 
    where u.login = '${req.session.login}' and w.to_learn = 1`,
    (err, res) => {
      if (err) throw err;
      resp.json(res);
    }
  );
});

app.get("/api/repeat-words", (req, resp) => {
  con.query(
    `select w.word, w.definition, time_before_repeat, repeat_counter from words w inner join user u on w.user_id = u.id 
    where u.login = '${req.session.login}' and w.to_learn = 0 and w.time_before_repeat <= curdate()`,
    (err, res) => {
      if (err) throw err;
      resp.json(res);
    }
  );
});

app.post("/api/add-words", (req, resp) => {
  con.query(
    `select id from user where login='${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      let user_id = res[0].id;

      con.query(
        `select word from words where word = '${req.body.word}' and user_id = ${user_id}`,
        (err, res) => {
          if (err) throw err;

          if (res.length === 0)
            con.query(
              `insert into words (word, definition, user_id) value ('${req.body.word}', '${req.body.definition}', ${user_id})`,
              (err) => {
                if (err) throw err;
                resp.json({ response: "y", value: "add" });
              }
            );
          else
            con.query(
              `update words set word='${req.body.word}', definition='${req.body.definition}' where user_id = ${user_id}`,
              (err) => {
                if (err) throw err;
                resp.json({ response: "y", value: "update" });
              }
            );
        }
      );
    }
  );
});

app.post("/api/delete-word", (req, resp) => {
  con.query(
    `select id from user where login='${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      let user_id = res[0].id;

      con.query(
        `delete from words where user_id=${user_id} and word='${req.body.word}' and definition='${req.body.definition}'`,
        (err) => {
          if (err) throw err;
          resp.json({ response: "y" });
        }
      );
    }
  );
});

// TODO: Write code to finish a training
app.post("/api/finish-training", (req, resp) => {
  con.query(
    `select id from user where login='${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      let user_id = res[0].id;

      req.body.result.forEach((item) => {
        con.query(
          `update words set time_before_repeat='${item.time_before_repeat}', repeat_counter=${item.repeat_counter}, to_learn=0 where word='${item.word}' and user_id = ${user_id}`,
          (err) => {
            if (err) throw err;
          }
        );
      });
    }
  );

  resp.json({ response: "y" });
});

/**
 * LOGIN SYSTEM
 */
app.post("/api/is-logged-in", loginSystem.isLoggedIn);
app.post("/api/login", loginSystem.login);
app.post("/api/logout", loginSystem.logout);
app.post("/api/register", loginSystem.register);

app.listen(PORT, () =>
  console.log(`Server listening to http://localhost:${PORT}...`)
);
