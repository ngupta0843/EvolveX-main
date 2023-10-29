const express = require("express");
const formidable = require("express-formidable");
const controllers = require("../controllers/service");
const middlewares = require("../middlewares");

module.exports = function (app) {
  app.post("/create-service", formidable(), controllers.create);
  app.get("/services", controllers.services);
  app.get("/seller-services", controllers.sellerServices);
  app.delete("/delete-service/:serviceId", controllers.remove);
  app.get("/service/:serviceId", controllers.read);
  app.put("/update-service/:serviceId", formidable(), controllers.update);
  app.post("/msg-poster/:serviceId", controllers.msgPoster);
};
