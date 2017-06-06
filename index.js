"use strict"
const repl = require('repl');

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

function help() {
  console.log("\n--------------------------------------------------------------------------------------------------------------------");
  console.log("================================================= Help Menu ==========================================================");
  console.log("----------------------------------------------------------------------------------------------------------------------");
  console.log("Student.create(dbModel.connection, new Student(id, firstname, lastname, cohort_id))    Adding new student record");
  console.log("Student.update(dbModel.connection, new Student(id, firstname, lastname, cohort_id))    Update student record by ID");
  console.log("Student.delete(dbModel.connection, id)                                                 Delete student record by ID");
  console.log("Student.findById(dbModel.connection, id)                                               Showing student record by ID");
  console.log("Cohort.create(dbModel.connection, new Cohort (id, name))                               Adding new cohort record");
  console.log("Cohort.update(dbModel.connection, new Cohort (id, name))                               Update cohort record by ID");
  console.log("Cohort.delete(dbModel.connection, id)                                                  Delete cohort record by ID");
  console.log("Cohort.findById(dbModel.connection, id)                                                Showing cohort record by ID");
  return "-----------------------------------------------------------------------------------------------------------------------------";
}


var replServer = repl.start(">");

replServer.context.DBModel = new DBModel('./db/student.db')
replServer.context.Student = Student
replServer.context.Cohort = Cohort;
replServer.context.help = help;
