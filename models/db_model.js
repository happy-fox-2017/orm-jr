"use strict"

const sqlite = require('sqlite3').verbose();

var CTSTUDENTS = `CREATE TABLE IF NOT NULL students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100) UNIQUE, last_name VARCHAR(100), cohort_id INTEGER, FOREIGN KEY(cohort_id) REFERENCES cohorts(id))`
var CTCOHORTS = `CREATE TABLE IF NOT NULL cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) UNIQUE)`;

class DBModel {
  constructor(file) {
    this.connection = new sqlite.Database(file);
  }

  setup() {
    let db = this.connection;
    db.serialize(() => {
      db.run(CTSTUDENTS, err => {
        err ? console.log(err) : console.log(`Table student's created`)
      });
      db.run(CTCOHORTS, err => {
        err ? console.log(err) : console.log(`Table cohorts's created`)
      });
    });
  }
}

module.exports = DBModel;
