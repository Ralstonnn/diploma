const { con } = require("./DbHandler");

module.exports = {
  login: function (req, resp) {
    con.query(
      `select password from user where login = "${req.body.login.toLowerCase()}"`,
      (err, res) => {
        if (err) throw err;
        if (res.length === 0) {
          resp.json({ response: "n" });
          return null;
        }
        if (res[0].password === req.body.password) {
          req.session.loggedIn = true;
          req.session.login = req.body.login;
          resp.json({ response: "y" });
          return null;
        }
        resp.json({ response: "n" });
      }
    );
  },
  register: function (req, resp) {
    con.query(
      `insert into user (login, password) value ('${req.body.login}', '${req.body.password}')`
    );
    resp.json({ response: "y" });
  },
  isLoggedIn: function (req, resp) {
    if (req.session.loggedIn) {
      resp.json({
        response: "y",
        login: req.session.login,
      });

      return null;
    }

    resp.json({ response: "n" });
  },
  logout: function (req, resp) {
    req.session.loggedIn = false;
    resp.json({ response: "y" });
  },
};
