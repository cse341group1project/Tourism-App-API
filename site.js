const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("site").find();
  result.toArray().then((site) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(site);
  });
};

const getSingle = async (req, res) => {
  const siteId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("site")
    .find({ _id: siteId });
  result.toArray().then((site) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(site[0]);
  });
};

const createSite = async (req, res) => {
  const site = {
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    images: req.body.images,
    rating: req.body.rating,
    reviews: req.body.review,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("calabar")
    .insertOne(site);
  if (response.acknowledge) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while creating the site.");
  }
};

const updateSite = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid site id to update a site.");
  }
  const siteId = new ObjectId(req.params.id);
  const site = {
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    images: req.body.images,
    rating: req.body.rating,
    reviews: req.body.review,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("site")
    .replaceOne({ _id: siteId }, site);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating site.");
  }
};

const deleteSite = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid site id to delete a site.");
  }
  const siteId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("site")
    .deleteOne({ _id: siteId });
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting sites.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createSite,
  updateSite,
  deleteSite,
};