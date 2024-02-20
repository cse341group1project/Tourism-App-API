const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("restaurants")
    .find();
  result.toArray().then((restaurants) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(restaurants);
  });
};

const getSingle = async (req, res) => {
  const restaurantsId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("restaurants")
    .find({ _id: restaurantsId });
  result.toArray().then((restaurants) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(restaurants[0]);
  });
};

const createRestaurants = async (req, res) => {
  const restaurants = {
    name: req.body.name,
    location: req.body.location,
    cuisine: req.body.cuisine,
    rating: req.bodyrating,
    price_range: req.body.price_range,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("restaurants")
    .insertOne(restaurants);
  if (response.acknowledge) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the restaurants."
      );
  }
};

const updateRestaurants = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid hotels id to update a restaurants.");
  }
  const restaurantsId = new ObjectId(req.params.id);
  const restaurants = {
    name: req.body.name,
    location: req.body.location,
    cuisine: req.body.cuisine,
    rating: req.bodyrating,
    price_range: req.body.price_range,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("restaurants")
    .replaceOne({ _id: restaurantsId }, restaurants);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating restaurants."
      );
  }
};

const deleteRestaurants = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid site id to delete a restaurants.");
  }
  const restaurantsId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("restaurants")
    .deleteOne({ _id: restaurantsId });
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while deleting restaurants."
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createRestaurants,
  updateRestaurants,
  deleteRestaurants,
};
