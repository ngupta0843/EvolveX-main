const controller = require("../controllers/userController");

module.exports = function (app) {
  app.post("/signup", controller.signup);
  app.get("/be-mentor", controller.beMentor);
  app.get("/verify-mentor/:token", controller.verifyMentor);
  app.post("/login", controller.signin);
};
