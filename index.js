"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

// const DBModel = require('./models/db_model.js');

const repl = require('repl');
let db = new DBModel("./db/student.db");
let argv = process.argv[2];

function help() {
  let show = `dbModel\ndbModel.setup()`
  console.log(show);
}

if (argv === 'playtime') {
  let command = repl.start('>> ');
  command.context.dbModel = db;
  command.context.Student = Student;
  command.context.StudentHelp = Student.help;
  command.context.Cohort = Cohort;
  command.context.help = help;

}

// let replServer = repl.start('>> ');
// replServer.context.dbModel = db;
