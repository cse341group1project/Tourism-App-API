const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Welcome to Africa");
});
router.use("/", require("./swagger"));
router.use("/site", require("./site"));

module.exports = router;
