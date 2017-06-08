"use strict"
const repl = require('repl');
// const sqlite = require('sqlite3').verbose();
const DBModel = require('./models/db_model.js');
const Student = require('./models/student.js');
const Cohort = require('./models/cohort.js');
// let file = './db/student.db';
// let db = new sqlite.Database(file);

let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
});

// import DBModel from "./models/db_model.js";
// import Cohort from "./models/cohort.js";
// import Student from "./models/student.js";

var dbModel = new DBModel('./db/student.db')
// let students = new Student();

replServer.context.dbModel = dbModel;
replServer.context.student = Student;
replServer.context.cohorts = Cohort;
