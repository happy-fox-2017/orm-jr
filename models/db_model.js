"use strict"
var sqlite3 = require('sqlite3').verbose();

class DBModel {
  constructor(filename) {
    this.connection = new sqlite3.Database(filename)
  }

  setup() {
    let db = this.connection;
    db.serialize(function() {
      let query = `CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(30) UNIQUE, lastname VARCHAR(30), cohort_id INTEGER, FOREIGN KEY(cohort_id) REFERENCES cohorts(id));`
      db.run(query, (err) => {
        if(err) console.log(err);
        else console.log('Create table student success');
      })
      query = `CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(30) UNIQUE);`
      db.run(query, (err) => {
        if(err) console.log(err);
        else console.log('Create table cohort success');
      })
    })
  }
}

module.exports = DBModel;