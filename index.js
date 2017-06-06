"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";
var dbModel = new DBModel('./db/student.db');

let argv = process.argv
if(argv[2] == 'playtime'){
  console.log('-----Welcome-------');
  var repl = require('repl');
  var replServer = repl.start();
  replServer.context.dbModel = dbModel;
  replServer.context.Student = Student;
  replServer.context.Cohort = Cohort;
} else {
  help();
}

function help(){
  console.log("---Getting_Starter---");
  console.log("Jika Tidak ada Table nya lakukan dbModel.setup dulu");
  console.log("dbModel.setup()");
  console.log('---Student_Table---');
  console.log('Student.create(db, student)');
  console.log('Student.findAll(db, callback)');
  console.log('Student.update(db, student)');
  console.log('Student.delete(db, id_student)');
  console.log('Student.findById(db, id_student)');
  console.log('Student.where(db, student, callback)');
  console.log('Student.findOrCreate(db, student)');
  console.log('---Cohort_Table---');
  console.log('Cohort.create(db, cohort)');
  console.log('Cohort.findAll(db, callback)');
  console.log('Cohort.update(db, cohort)');
  console.log('Cohort.delete(db, id_cohort)');
  console.log('Cohort.findById(db, id_cohort)');
  console.log('Cohort.where(db, cohort, callback)');
  console.log('Cohort.findOrCreate(db, cohort)');
}