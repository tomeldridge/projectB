var assert = require('assert');
var Browser = require('zombie');
var mysql = require('mysql');
var request = require("request");
var base_url = "http://ec2-35-164-210-244.us-west-2.compute.amazonaws.com/";

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
      browser.visit(base_url).then(function() {
        var title = browser.text('title');
        assert.equal(title, 'PetConnect');
        done();
      });
    });

    it("has correct h1", function(done) {
      var browser = new Browser();
      browser.visit(base_url).then(function() {
        assert.equal(browser.text('h1'), 'Welcome To PetConnect');
        done();
      });
    });

    it("has all links", function(done) {
      var browser = new Browser();
      browser.visit(base_url).then(function() {
        browser.assert.elements('form', 3);
        done();
      });
    });
  });

  describe("Signup page", function() {
    it("has all inputs", function(done) {
      var browser = new Browser();
      browser.visit(base_url + "signup").then(function() {
        browser.assert.elements('input', 23);
        done();
      });
    });
  });

  describe("Login page", function() {
    it("has all inputs", function(done) {
      var browser = new Browser();
      browser.visit(base_url + "login").then(function() {
        browser.assert.elements('input', 3);
        done();
      });
    });
  });

  describe("Browse animals page", function() {
    it("has all inputs", function(done) {
      var browser = new Browser();
      browser.visit(base_url + "browseanimals").then(function() {
        browser.assert.elements('input', 1);
        browser.assert.elements('select', 2);
        done();
      });
    });
  });

  describe("Submit animal page", function() {
    it("has all inputs", function(done) {
      var browser = new Browser();
      browser.visit(base_url + "submitanimal").then(function() {
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
      browser.visit(base_url + "viewanimal").then(function() {
        browser.assert.elements('input', 3);
        done();
      });
    });
  });
});


describe("Database tests", function() {
  it("can create a willhelp account", function(done) {
    request.get(base_url + "insert?fname=John&lname=Doe&helpDog=true", function(error, response, body) {
      assert(response != undefined);
      var con = mysql.createConnection({
          host  : 'localhost',
          user  : 'root',
          password: 'Password',
          database: 'petConnectDB'
      });

      con.connect(function(err){
        if(err){
          console.log('Error Connecting To The DataBase!');
          return;
        }
          console.log('Connection Established To The DataBase');
      });


      con.query("SELECT * FROM profile WHERE fname='John' AND lname='Doe'", function(err, result){
        if(err) {
          next(err);
          return;
        }
        else {
          assert(result.length > 0);
        }
      });

      con.query("SELECT * FROM willHelp WHERE id=49", function(err, result){
        if(err) {
          next(err);
          return;
        }
        else {
          assert(result.length > 0);
          done();
        }
      });
    });
  });

  it("can create a willhost account", function(done) {
    request.get(base_url + "insert?fname=John1&lname=Doe1&hostDog=true", function(error, response, body) {
      assert(response != undefined);
      var con = mysql.createConnection({
          host  : 'localhost',
          user  : 'root',
          password: 'Password',
          database: 'petConnectDB'
      });

      con.connect(function(err){
        if(err){
          console.log('Error Connecting To The DataBase!');
          return;
        }
          console.log('Connection Established To The DataBase');
      });


      con.query("SELECT * FROM profile WHERE fname='John1' AND lname='Doe1'", function(err, result){
        if(err) {
          next(err);
          return;
        }
        else {
          assert(result.length > 0);
        }
      });

      con.query("SELECT * FROM willHost WHERE id=55", function(err, result){
        if(err) {
          next(err);
          return;
        }
        else {
          assert(result.length > 0);
          done();
        }
      });
    });
  });

  it("can create a willadopt account", function(done) {
    request.get(base_url + "insert?fname=John2&lname=Doe2&adoptDog=true", function(error, response, body) {
      assert(response != undefined);
      var con = mysql.createConnection({
          host  : 'localhost',
          user  : 'root',
          password: 'Password',
          database: 'petConnectDB'
      });

      con.connect(function(err){
        if(err){
          console.log('Error Connecting To The DataBase!');
          return;
        }
          console.log('Connection Established To The DataBase');
      });


      con.query("SELECT * FROM profile WHERE fname='John2' AND lname='Doe2'", function(err, result){
        if(err) {
          next(err);
          return;
        }
        else {
          assert(result.length > 0);
        }
      });

      con.query("SELECT * FROM willAdopt WHERE id=35", function(err, result){
        if(err) {
          next(err);
          return;
        }
        else {
          assert(result.length > 0);
          done();
        }
      });
    });
  });

  it("can find user", function(done) {
    request.get(base_url + "insert?fname=John3&lname=Doe3", function(error, response, body) {
      assert(response != undefined);
      var con = mysql.createConnection({
          host  : 'localhost',
          user  : 'root',
          password: 'Password',
          database: 'petConnectDB'
      });

      con.connect(function(err){
        if(err){
          console.log('Error Connecting To The DataBase!');
          return;
        }
          console.log('Connection Established To The DataBase');
      });


      con.query("SELECT * FROM profile WHERE fname='John3' AND lname='Doe3'", function(err, result){
        if(err) {
          next(err);
          return;
        }
        else {
          assert(result.length > 0);
          done();
        }
      });
    });
  });

  it("can create animal", function(done) {
    request.get(base_url + "insertanimal?animalType=Dog&address=foo&city=foo&state=or&description=foo", function(error, response, body) {
      var con = mysql.createConnection({
          host  : 'localhost',
          user  : 'root',
          password: 'Password',
          database: 'petConnectDB'
      });

      con.connect(function(err){
        if(err){
          console.log('Error Connecting To The DataBase!');
          return;
        }
          console.log('Connection Established To The DataBase');
      });

      con.query("SELECT * FROM animalInDistress WHERE description='foo'", function(err, result){
        if(err) {
          next(err);
          return;
        }
        else {
          assert(result.length > 0);
          done();
        }
      });
    });
  });
});
