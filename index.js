const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "secret1";

const app = express();
const port = 3333;

//POSTGRES CONNECTION SETTINGS START//
const pool = require("pg").Pool;
const db = new pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "testapi",
});
//POSTGRES CONNECTION SETTINGS END//

app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());

let prod = [];
let user = [
  {
    id: 1,
    username: "user1",
    password: "password1",
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
  },
];

//API ENDPOINT

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/product_details", function (req, res) {
  res.json(prod);
});

app.get("/product_price/:price", function (req, res) {
  console.log(req.params);
  arr = prod.filter((res) => res.Price == req.params.price);
  res.json(arr);
});

app.post("/product_add", function (req, res) {
  //console.log(req.body);
  const uuid = uuidv4();
  prod.push({ ...req.body, uuid });
  //prod.push(req.body);
  res.json(prod);
});

app.post("/login", async function (req, res) {
  const { username, password } = req.body;
  let result = await db.query(`SELECT * from users where username = '${username}'`);
  console.log(result.rows);
  if (!result.rows[0].username) {
    return res.status(400).json({ statusMsg: false, error: "Please try to login with correct credentials" });
  } else {
    if (result.rows[0].password !== password) {
      return res.status(400).json({ statusMsg: false, error: "Password Incorrect" });
    } else {
      var data = {
        username: result.rows[0].username,
      };
      let token_str = await jwt.sign(data, JWT_SECRET_KEY);
      return res.status(200).json({ statusMsg: true, message: "User Logged In Successfully", token: token_str });
    }
  }
});
