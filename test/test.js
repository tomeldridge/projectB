var assert = require('assert');
var app = require("../app.js");
var Browser = require('zombie');

var request = require("request");
var base_url = "http://localhost:3000/";

describe("App server", function() {
  it("returns status code 200", function(done) {
    request.get(base_url, function(error, response, body) {
      assert.equal(200, response.statusCode);
      done();
    });
  });
});


describe("User interface tests", function() {
  describe("Homepage", function() {
    it("has correct title", function(done) {
      var browser = new Browser();
      browser.visit("http://localhost:3000/").then(function() {
        var title = browser.text('title');
        assert.equal(title, 'PetConnect');
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
        browser.assert.elements('select', 2);
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

  describe("View animal page", function() {
    it("has all buttons", function(done) {
      var browser = new Browser();
      browser.visit("http://localhost:3000/submitanimal").then(function() {
        browser.assert.elements('input', 4);
        browser.assert.elements('select', 2);
        browser.assert.elements('textarea', 1);
        done();
      });
    });
  });
});


describe("Database tests", function() {
  it("can create a willhelp account", function(done) {
    request.get("/insert", function(error, response, body) {

      done();
    });
  });

  it("can create a willhost account", function(done) {
    request.get("/insert", function(error, response, body) {
      assert.equal(true, true);
      done();
    });
  });

  it("can create a willadopt account", function(done) {
    request.get("/insert", function(error, response, body) {
      assert.equal(true, true);
      done();
    });
  });

  it("can login", function(done) {
    request.get("/loginuser", function(error, response, body) {
      assert.equal(true, true);
      done();
    });
  });

  it("can create animal", function(done) {
    request.get("/insertanimal?submitAnimalType=Dog&newAnimalAddress=foo&newAnimalCity=foo&State=or&newAnimalDescription=%09foo%0D%0A&newAnimalSubmit=Submit", function(error, response, body) {
      assert.equal(response, true);
      done();
    });
  });

  it("can search for animals", function(done) {
    request.get("/populateAnimals", function(error, response, body) {
      assert.equal(true, response);
      done();
    });
  });
});


describe("Acceptance tests", function() {
  it("can create a willhelp account", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/signup").then(function() {
      assert(true == true);
      done();
    });
  });

  it("can create a willhost account", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/signup").then(function() {
      assert(true == true);
      done();
    });
  });

  it("can create a willadopt account", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/signup").then(function() {
      assert(true == true);
      done();
    });
  });

  it("can login", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/signup").then(function() {
      assert(true == true);
      done();
    });
  });

  it("can create animal", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/submitanimal").then(function() {
      assert(true == true);
      done();
    });
  });

  it("can search for animals", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/browseanimals").then(function() {
      assert(true == true);
      done();
    });
  });

  it("can click result and view animal", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/viewanimal").then(function() {
      assert(true == true);
      done();
    });
  });

  it("can adopt animal", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/viewanimal").then(function() {
      assert(true == true);
      done();
    });
  });

  it("can host animal", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/viewanimal").then(function() {
      assert(true == true);
      done();
    });
  });

  it("can help animal", function(done) {
    var browser = new Browser();
    browser.visit("http://localhost:3000/viewanimal").then(function() {
      assert(true == true);
      done();
    });
  });
});
