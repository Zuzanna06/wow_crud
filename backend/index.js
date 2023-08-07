import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "wow_arts",
});
// if there is a auth problem
// ALTER USER 'root '@'localhost' IDENTIFIED WITH mysql_native_password BY 'Lamadev123';

app.get("/", (req, res) => {
  res.json("hello this is in the backend");
});

app.get("/arts", (req, res) => {
  const q = "SELECT * FROM arts";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/arts", (req, res) => {
  const q =
    "INSERT INTO arts (`title`,`description`,`price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/arts/:id", (req, res) => {
  const artId = req.params.id;
  const q = " DELETE FROM arts WHERE id = ? ";

  db.query(q, [artId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const artId = req.params.id;
  const q =
    "UPDATE arts SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
    req.params.id,
  ];

  db.query(q, [...values/*, artId*/], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!!!");
});
