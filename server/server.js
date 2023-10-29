const express = require("express");
const { readdirSync } = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    `mongodb+srv://learning_pawn:${process.env.MONGO_PASSWORD}@cluster0.3ieir.mongodb.net/evolveX`,
    {}
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err));

app.get("/", (req, res) => {
  res.json({ message: "backend running" });
});

require("./routes/userRoutes")(app);
require("./routes/service")(app);
// readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Running on: ${PORT}.`);
});
