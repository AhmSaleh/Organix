var router = require("express").Router();
const product = require("./proudct");

//Product
router.use("/product", product);

//...

module.exports = router;
