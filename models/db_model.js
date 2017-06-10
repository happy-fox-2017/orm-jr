"use strict"

const sqlite = require('sqlite3').verbose()
// var db = new sqlite.Database("../db/student.db")

class DBModel {
  constructor () {
    this.connection = new sqlite.Database("./db/student.db")
  }

  createTableStudent() {
    let query = `create table if not exists students (id integer PRIMARY key AUTOINCREMENT, first_name VARCHAR(100),last_name VARCHAR(100),cohort_id INTEGER)`
    this.connection.run(query, err => {
      if (!err) {console.log(`Table student created`);}
      else {console.log(err);}
    })
  }

  createTableCohort() {
    let query = `create table if not exists cohorts (id integer PRIMARY KEY AUTOINCREMENT, name VARCHAR(100))`
    this.connection.run(query, err => {
      if (!err) {console.log(`Table cohort created`);}
      else {console.log(err);}
    })
  }

  setup() {
    let dbModel = this
    this.connection.serialize(function () {
      dbModel.createTableStudent()
      dbModel.createTableCohort()
    })
    // this.connection.close()
  }
}



export default DBModel
