// import DBModel from "../models/db_model.js";
// import Student from "../models/student.js";
// 
// var db = new DBModel("./db/test.db")

const DBModel = require('../models/db_model.js')
const Student = require('../models/student.js')
const Cohort = require('../models/cohort.js')

var db = new DBModel("../db/test.db")

describe('CREATE Student', function() {
  it('should run as expected (no callback)', function() {
    Student.create(db.connection, {firstname: 'John', lastname: 'Doe', cohort_id: 2});
  })
})

describe('FINDALL Student', function() {
  it('should invoke callback done', function(done) {
    Student.findAll(db.connection, done);
  })
})

describe('FINDBYID Student', function() {
  it('should run as expected (no callback)', function() {
    Student.findById(db.connection, 1);
  })
})

describe('UPDATE Student', function() {
  it('should run as expected (no callback)', function() {
    Student.update(db.connection, {id: 1, firstname: 'Johnny', lastname: 'Doe', cohort_id: 2});
  })
})

describe('WHERE Student', function() {
  it('should invoke callback done', function(done) {
    Student.where(db.connection, "firstname = 'John'", done);
  })
})

describe('DELETE Student', function() {
  it('should run as expected (no callback)', function() {
    Student.delete(db.connection, 1);
  })
})


describe('CREATE Cohort', function() {
  it('should run as expected (no callback)', function() {
    Cohort.create(db.connection, {name: 'Group 1'});
  })
})

describe('FINDALL Cohort', function() {
  it('should invoke callback done', function(done) {
    Cohort.findAll(db.connection, done);
  })
})

describe('FINDBYID Cohort', function() {
  it('should run as expected (no callback)', function() {
    Cohort.findById(db.connection, 1);
  })
})

describe('UPDATE Cohort', function() {
  it('should run as expected (no callback)', function() {
    Cohort.update(db.connection, {id: 1, name: 'Other group'});
  })
})

describe('WHERE Cohort', function() {
  it('should invoke callback done', function(done) {
    Cohort.where(db.connection, "name = 'Other group'", done);
  })
})

describe('DELETE Cohort', function() {
  it('should run as expected (no callback)', function() {
    Cohort.delete(db.connection, 1);
  })
})
