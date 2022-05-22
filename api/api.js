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

// TODO: Find out if its safe to pass an id from db to the component
// TODO: add error handling
app.get("/api/get-words", (req, resp) => {
  con.query(
    `select d.word, d.definition from dictionary d inner join users u 
    on d.user_id = u.id where u.login = '${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      resp.json(res);
    }
  );
});

app.get("/api/learn-words", (req, resp) => {
  con.query(
    `select d.word, d.definition, time_before_repeat, repeat_counter from 
    dictionary d inner join users u on d.user_id = u.id 
    where u.login = '${req.session.login}' and d.to_learn = 1`,
    (err, res) => {
      if (err) throw err;
      resp.json(res);
    }
  );
});

app.get("/api/repeat-words", (req, resp) => {
  con.query(
    `select d.word, d.definition, time_before_repeat, repeat_counter from 
    dictionary d inner join users u on d.user_id = u.id 
    where u.login = '${req.session.login}' and d.to_learn = 0 and 
    d.time_before_repeat <= curdate()`,
    (err, res) => {
      if (err) throw err;
      resp.json(res);
    }
  );
});

app.post("/api/set-to-learn", (req, resp) => {
  con.query(
    `select id from users where login='${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      let user_id = res[0].id;

      con.query(
        `update dictionary set to_learn = 1, repeat_counter = 1 where 
        word='${req.body.word}' and definition='${req.body.definition}' 
        and user_id=${user_id} `,
        (err) => {
          if (err) throw err;
          resp.json({ response: "y" });
        }
      );
    }
  );
});

app.post("/api/set-reprat-date", (req, resp) => {
  con.query(
    `select id from users where login='${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      let user_id = res[0].id;

      if (req.body.increaseRepeatCounter) {
        con.query(
          `update dictionary set time_before_repeat = '${req.body.date}', 
          repeat_counter = repeat_counter+1 where word='${req.body.word}' 
          and definition='${req.body.definition}' and user_id=${user_id} `,
          (err) => {
            if (err) throw err;
            resp.json({ response: "y" });
          }
        );

        return;
      }

      con.query(
        `update dictionary set time_before_repeat = '${req.body.date}', 
        repeat_counter = 1 where word='${req.body.word}' 
        and definition='${req.body.definition}' and user_id=${user_id} `,
        (err) => {
          if (err) throw err;
          resp.json({ response: "y" });
        }
      );
    }
  );
});

app.post("/api/add-words", (req, resp) => {
  con.query(
    `select id from users where login='${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      let user_id = res[0].id;

      con.query(
        `select word from dictionary where word = '${req.body.word}' 
        and user_id = ${user_id}`,
        (err) => {
          if (err) throw err;

          con.query(
            `insert into dictionary (word, definition, user_id) 
            value ('${req.body.word}', '${req.body.definition}', ${user_id})`,
            (err) => {
              if (err) throw err;
              resp.json({ response: "y", value: "add" });
            }
          );
        }
      );
    }
  );
});

app.post("/api/delete-word", (req, resp) => {
  con.query(
    `select id from users where login='${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      let user_id = res[0].id;

      con.query(
        `delete from dictionary where user_id=${user_id} and 
        word='${req.body.word}' and definition='${req.body.definition}'`,
        (err) => {
          if (err) throw err;
          resp.json({ response: "y" });
        }
      );
    }
  );
});

app.post("/api/finish-learn-training", (req, resp) => {
  con.query(
    `select id from users where login='${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      let user_id = res[0].id;

      req.body.result.forEach((item) => {
        con.query(
          `update dictionary set 
          time_before_repeat='${item.time_before_repeat}', to_learn=0 
          where word='${item.word}' and user_id = ${user_id}`,
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
