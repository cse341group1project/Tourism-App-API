const router = require("express").Router();

const transportationController = require("../controllers/transportation");
const { IsAuthenticated } = require("../middleware/authenticate");

router.get("/", transportationController.getAll);

router.get("/:id", transportationController.getSingle);

router.post(
  "/",
  IsAuthenticated,
  transportationController.createTransportation
);

router.put(
  "/:id",
  IsAuthenticated,
  transportationController.updateTransportation
);

router.delete(
  "/:id",
  IsAuthenticated,
  transportationController.deleteTransportation
);

module.exports = router;
