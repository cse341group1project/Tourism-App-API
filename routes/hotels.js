const router = require("express").Router();

const hotelsController = require("../controllers/hotels");
const { IsAuthenticated } = require("../middleware/authenticate");

router.get("/", hotelsController.getAll);

router.get("/:id", hotelsController.getSingle);

router.post("/", IsAuthenticated, hotelsController.createHotels);

router.put("/:id", IsAuthenticated, hotelsController.updateHotels);

router.delete("/:id", IsAuthenticated, hotelsController.deleteHotels);

module.exports = router;
