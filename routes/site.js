const router = require("express").Router();

const siteController = require("../controllers/site");
const { IsAuthenticated } = require("../middleware/authenticate");

router.get("/", siteController.getAll);

router.get("/:id", siteController.getSingle);

router.post("/", IsAuthenticated, siteController.createSite);

router.put("/:id", IsAuthenticated, siteController.updateSite);

router.delete("/:id", IsAuthenticated, siteController.deleteSite);

module.exports = router;
