import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 7000;

const app = express();

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
