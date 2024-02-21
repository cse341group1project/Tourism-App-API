const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("hotels").find();
  result.toArray().then((hotels) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(hotels);
  });
};

const getSingle = async (req, res) => {
  const hotelsId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("hotels")
    .find({ _id: hotelsId });
  result.toArray().then((hotels) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(hotels[0]);
  });
};

const createHotels = async (req, res) => {
  const hotels = {
    name: req.body.name,
    location: req.body.location,
    rating: req.body.rating,
    amenities: req.body.amenities,
    price_range: req.body.price_range,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("hotels")
    .insertOne(hotels);
  if (response.acknowledge) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the hotels.");
  }
};

const updateHotels = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid hotels id to update a hotels.");
  }
  const hotelsId = new ObjectId(req.params.id);
  const hotels = {
    name: req.body.name,
    location: req.body.location,
    rating: req.body.rating,
    amenities: req.body.amenities,
    price_range: req.body.price_range,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("hotels")
    .replaceOne({ _id: hotelsId }, hotels);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating hotels.");
  }
};

const deleteHotels = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid site id to delete a Hotel.");
  }
  const hotelsId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("hotels")
    .deleteOne({ _id: hotelsId });
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting hotels.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createHotels,
  updateHotels,
  deleteHotels,
};