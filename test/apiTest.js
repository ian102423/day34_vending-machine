const apiApp = require("../api");
const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
chai.should();
const request = require("supertest");

describe("GET /api/customer/items", function() {
  it("should return successfully", function(done) {
    request(apiApp)
      .get("/api/customer/items")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
      })
      .end(done);
  });
});

describe("POST /api/customer/items/:itemId/purchases", function() {
  it("should return successfully", function(done) {
    const newItem = {
      money_given: 130
    };
    request(apiApp)
      .post("/api/customer/items/2/purchases")
      .send(newItem)
      .expect(200)
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        assert.equal(res.body.data.message, "ENJOY YOUR PURCHASE");
      })
      .end(done);
  });
});

describe("GET /api/vendor/purchases", function() {
  it("should return successfully", function(done) {
    request(apiApp)
      .get("/api/vendor/purchases")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        // res.body["data"].should.be.above(0);
      })
      .end(done);
  });
});

describe("GET /api/vendor/money", function() {
  it("should return successfully", function(done) {
    request(apiApp)
      .get("/api/vendor/money")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body["status"], "success");
        res.body["data"].should.be.above(0);
      })
      .end(done);
  });
});

describe("POST /api/vendor/items", function() {
  it("should return successfully", function(done) {
    const newItem = {
      id: 4,
      description: "Coffee",
      cost: 30,
      quantity: 50
    };
    request(apiApp)
      .post("/api/vendor/items")
      .send(newItem)
      .expect(200)
      .expect("item is added")
      .end(done);
  });
});

describe("PUT /api/vendor/items/:itemId", function() {
  it("should return successfully", function(done) {
    const updateItem = {
      description: "Bubble Gum",
      cost: 25,
      quantity: 100
    };
    request(apiApp)
      .put("/api/vendor/items/2")
      .send(updateItem)
      .expect(200)
      .expect("item is updated")
      .end(done);
  });
});
