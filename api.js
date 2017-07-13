const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
var vendingData = require("./data.js");
var purchaseData = require("./purchaseData.js");

// USE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/customer/items", (req, res) => {
  res.json({ status: "success", data: vendingData.items });
  console.log(vendingData);
});

app.post("/api/customer/items/:itemId/purchases", (req, res) => {
  let purchaseData = req.body;
  console.log("purchaseData = ", purchaseData);

  vendingData.items.forEach(function(vending) {
    if (vending.id == req.params.itemId) {
      console.log(req.body.money_given);
      if (vending.quantity > 0) {
        if (req.body.money_given >= vending.cost) {
          res.status(200).send({
            status: "success",
            data: {
              money_given: req.body.money_given,
              money_required: vending.cost,
              change_returned: req.body.money_given - vending.cost,
              message: "ENJOY YOUR PURCHASE"
            }
          });
        } else {
          res.status(200).send({
            status: "fail",
            data: {
              money_given: req.body.money_given,
              money_required: vending.cost,
              change_returned: req.body.money_given,
              message: "YOU DON'T HAVE ENOUGH MONEY FOR THIS ITEM"
            }
          });
        }
      } else {
        res.status(200).send({
          status: "fail",
          data: {
            money_given: req.body.money_given,
            money_required: vending.cost,
            change_returned: req.body.money_given,
            message: "OUT OF STOCK"
          }
        });
      }
    }
  });
});

app.get("/api/vendor/purchases", (req, res) => {
  res.json({ status: "success", data: purchaseData.purchases });
  console.log(vendingData);
});

app.get("/api/vendor/money", (req, res) => {
  res.json({ status: "success", data: vendingData.money_accepted });
  console.log(vendingData);
});

app.post("/api/vendor/items", (req, res) => {
  let itemData = req.body;
  console.log("itemData = ", itemData);
  vendingData.items.push(itemData);
  res.status(200).send("item is added");
});

app.put("/api/vendor/items/:itemId", (req, res) => {
  console.log("VENDING DATA ", vendingData);
  res.status(200).send("item is updated");
});

// LISTENER
app.listen(port, function() {
  console.log(`You are on the PORT: ${port}`);
});

module.exports = app;
