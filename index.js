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
} 
// else {
//   help();
// }