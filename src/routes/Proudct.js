var router = require("express").Router();

router.get("/", function (req, res) {
  res.send("product GET endpoint");
});

module.exports = router;
