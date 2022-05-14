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

app.post("/api/get-words", (req, resp) => {
  con.query(
    `select w.word, w.definition from words w inner join user u on w.user_id = u.id where u.login = '${req.session.login}'`,
    (err, res) => {
      if (err) throw err;
      resp.json(res);
    }
  );
});

// TODO: Write code to finish a training
app.post("/api/finish-training", (req, resp) => {
  // con.query("insert");
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
