const router = require("express").Router();

const restaurantsController = require("../controllers/restaurants");
const { IsAuthenticated } = require("../middleware/authenticate");

router.get("/", restaurantsController.getAll);

router.get("/:id", restaurantsController.getSingle);

router.post("/", IsAuthenticated, restaurantsController.createRestaurants);

router.put("/:id", IsAuthenticated, restaurantsController.updateRestaurants);

router.delete("/:id", IsAuthenticated, restaurantsController.deleteRestaurants);

module.exports = router;
