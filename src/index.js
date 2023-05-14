import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./database/db.js";
import * as dotenv from "dotenv";
import { spawn, spawnSync } from "child_process";
import { PythonShell } from "python-shell";

const PORT = process.env.PORT || 7000;

const app = express();

dotenv.config();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (_, res) => {
  res.send("Hello World!");
});

//check db connection
app.get("/db", (req, res) => {
  try {
    sequelize.authenticate();
    res.send("DB connected");
  } catch (error) {
    console.log(error);
  }
});

let myPythonScript = "";
const largeDataSet = [];

app.get("/parking-slots", (req, res) => {
  const python = spawn("py", ["./python/Smart-Parking.py"]);
  python.stdout.on("data", (data) => {
    largeDataSet.push(data);
  });

  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(largeDataSet.join(""));
  });
});
