"use strict"

const DBModel = require("./models/db_model.js");
const Student = require("./models/student.js");
const Cohort = require("./models/cohort.js");
const repl = require('repl');

const help = () => {
  console.log(`
  INSTRUCTION \n
  To modify Student or Cohort table use: 
  create(database, object) 
  update(database, object) 
  delete(database, id) 
  findById(database, id) 
  findAll(database, callback) 
  where(database, searchValue, callback) \n`);
};

let indexPlaytime = process.argv[2];
if (indexPlaytime === 'playtime') {
  let replServer = repl.start({
    prompt: `play>`,
    input: process.stdin,
    output: process.stdout
  });

  var dbModel = new DBModel('db/student.db');
  replServer.context.dbModel = dbModel;
  replServer.context.help = help;
  replServer.context.Student = Student;
  replServer.context.Cohort = Cohort;
}