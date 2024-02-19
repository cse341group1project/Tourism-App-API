const router = require("express").Router();

const siteController = require("../controllers/site");

router.get("/", siteController.getAll);

router.get("/:id", siteController.getSingle);

router.post("/", siteController.createSite);

router.put("/:id", siteController.updateSite);

router.delete("/:id", siteController.deleteSite);

module.exports = router;
