const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());

let prod = [
  {
    name: "Product1",
    description: "Description of Product 1",
    Price: "200",
  },
  {
    name: "Product2",
    description: "Description of Product 2",
    Price: "300",
  },
  {
    name: "Product3",
    description: "Description of Product 3",
    Price: "200",
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
  prod.push(req.body);
  res.json(prod);
});
