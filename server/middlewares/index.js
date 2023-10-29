const { expressjwt: jwt } = require("express-jwt");
const Service = require("../models/service");

exports.requireSignin = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.serviceOwner = async (req, res, next) => {
  let service = await Service.findById(req.params.serviceId).exec();
  let owner = service.postedBy._id.toString() === req.auth._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};
