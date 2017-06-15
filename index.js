"use strict"
var sqlite3 = require('sqlite3').verbose();
var repl = require('repl');

var DBModel = require('./models/db_model.js');
var Cohort = require('./models/cohort.js');
var Student = require('./models/student.js');

var argv = process.argv;

function help() {
  console.log('===========HELP MENU===========')
  console.log('SETUP')
  console.log('To set the database up (first time usage), use dbModel.setup() function\n')
  console.log('There are 2 tables available, cohorts and students.')
  console.log('To use the available function, always use Student or Cohort as prefix')
  console.log('1. Use <create> to create new data, e.g. Student.create(dbModel.connection, {firstname: "John", lastname: "Doe", cohort_id: 2})')
  console.log('2. Use <update> to update data, e.g. Student.update(dbModel.connection, {id: 1, firstname: "Johnny", lastname: "Do", cohort_id: 2})')
  console.log('3. Use <delete> to delete data, e.g. Student.delete(dbModel.connection, 1)')
  console.log('4. Use <findById> to find a certain data, e.g. Student.findById(dbModel.connection, 1)')
  console.log('5. Use <findAll> to show all data, e.g. Student.findAll(dbModel.connection, callback, [{limit: 10, offset: 0}]). Limit input is optional, this function works without its last parameter.')
  console.log('6. Use <where> to find data with certain attribute and value, e.g. Student.where(dbModel.connection, "firstname = \'John\'", callback)')
}

function callback(err, rows) {
  if(!err) {
    for(let i = 0; i < rows.length; i++) {
      console.log(rows[i]);
    }
  } else {
    console.log(err);
  }
}

if(argv[2] == 'playtime') {
  var replServer = repl.start({
    prompt: ">> ",
    input: process.stdin,
    output: process.stdout
  })
  var dbModel = new DBModel('./db/student.db')
  replServer.context.dbModel = dbModel;
  replServer.context.help = help;
  replServer.context.callback = callback;
  replServer.context.Student = Student;
  replServer.context.Cohort = Cohort;
}
