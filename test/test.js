var assert = require('assert');
var app = require("../app.js");
var Browser = require('zombie');

var request = require("request");
var base_url = "http://localhost:3000/";

describe("App server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        assert.equal(200, response.statusCode);
        done();
      });
    });
  });
});

describe("Homepage", function() {
  it("has correct title", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/").then(function() {
      var title = browser.text('title');
      assert.equal(title, 'Test Site Page');
      done();
    });
  });

  it("has correct h1", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/").then(function() {
      assert.equal(browser.text('h1'), 'Welcome To PetConnect');
      done();
    });
  });

  it("has all links", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/").then(function() {
      browser.assert.elements('form', 3);
      done();
    });
  });
});

describe("Signup page", function() {
  it("has all inputs", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/signup").then(function() {
      browser.assert.elements('input', 23);
      done();
    });
  });
});

describe("Login page", function() {
  it("has all inputs", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/login").then(function() {
      browser.assert.elements('input', 3);
      done();
    });
  });
});

describe("Browse animals page", function() {
  it("has all inputs", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/browseanimals").then(function() {
      browser.assert.elements('input', 1);
      browser.assert.elements('select', 1);
      done();
    });
  });
});

describe("Submit animal page", function() {
  it("has all inputs", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/submitanimal").then(function() {
      browser.assert.elements('input', 4);
      browser.assert.elements('select', 2);
      browser.assert.elements('textarea', 1);
      done();
    });
  });
});
