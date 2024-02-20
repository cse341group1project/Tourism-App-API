const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("transportation")
    .find();
  result.toArray().then((transportation) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(transportation);
  });
};

const getSingle = async (req, res) => {
  const transportationId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("hotels")
    .find({ _id: transportationId });
  result.toArray().then((transportation) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(transportation[0]);
  });
};

const createTransportation = async (req, res) => {
  const transportation = {
    source: req.body.source,
    destination: req.body.destination,
    mode: req.body.mode,
    duration: req.body.duration,
    cost: req.body.cost,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("transportation")
    .insertOne(transportation);
  if (response.acknowledge) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error ||
          "Some error occurred while creating the transportation."
      );
  }
};

const updateTransportation = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid hotels id to update a transportation.");
  }
  const transportationId = new ObjectId(req.params.id);
  const transportation = {
    source: req.body.source,
    destination: req.body.destination,
    mode: req.body.mode,
    duration: req.body.duration,
    cost: req.body.cost,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("transportation")
    .replaceOne({ _id: transportationId }, transportation);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating transportation."
      );
  }
};

const deleteTransportation = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json("Must use a valid site id to delete a transportation.");
  }
  const transportationId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("transportation")
    .deleteOne({ _id: transportationId });
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting transportation."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createTransportation,
  updateTransportation,
  deleteTransportation,
};
