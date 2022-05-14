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
          req.session.login = req.login;
          resp.json({ response: "y" });
          return null;
        }
        resp.json({ response: "n" });
      }
    );
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
};
