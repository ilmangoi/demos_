var express = require("express");
var router = express.Router();

const mainRouter = (query) => {
  /* GET home page. */
  router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
  });
  router.use(require("./weChat")(query));
  return router;
};

module.exports = mainRouter;
