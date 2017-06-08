"use strict"

const sqlite = require('sqlite3')


class DBModel {
  constructor () {
    this.connection = new sqlite.Database("../db/student.db")
  }

  createTableStudent() {
    let query = `create table if not exists students (id integer PRIMARY key AUTOINCREMENT, first_name not null VARCHAR(100),last_name VARCHAR(100);)`
    db.run(query, err => {
      if (!err) {console.log(`Table student created`);}
      else {console.log(err);}
    })
  }

  createTableCohort() {
    let query = `create table if not exists cohorts (id integer PRIMARY KEY AUTOINCREMENT, name not null VARCHAR(100))`
    db.run(query, err => {
      if (!err) {console.log(`Table cohort created`);}
      else {console.log(err);}
    })
  }

  setup() {
    db.serialize(function () {
      createTableStudent()
      createTableStudent()
    })
    db.close()
  }


}

export default DBModel
