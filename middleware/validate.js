const validator = require("../helpers/validate");

const saveCalabar = (req, res, next) => {
  const validationRule = {
    id: "string",
    address: "required|string",
    city: "required|string",
    rating: "string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveAbuja = (req, res, next) => {
  const validationRule = {
    id: "string",
    title: "required|string",
    location: "required|string",
    description: "required|string",
    price: "string",
    currency: "string",
    bedrooms: "required|string",
    bathrooms: "required|string",
    size: "required|string",
    amenities: "required|string",
    images: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCalabar,
  saveAbuja,
};
