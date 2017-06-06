"use strict"
const sqlite3 = require('sqlite3').verbose();

class DBModel {
  constructor(db) {
    this.connection = new sqlite3.Database(db)
  }
  setup() {
    let tableStudents = 'CREATE Table IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT,first_name VARCHAR(50),last_name VARCHAR(50),cohorts_id INTEGER)';
    let tableCohorts = 'CREATE Table IF NOT EXISTS cohorts(id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(50))';
    var db = new sqlite3.Database('./db/student.db');
    db.serialize( function() {
      db.run(tableStudents, (err) => {
        if(!err) {
          console.log("Tabel Students Berhasil Di buat");
        } else {
          console.log(err);
        }
      })

      db.run(tableCohorts, (err) => {
        if(!err) {
          console.log("Tabel Cohort Berhasil Di buat");
        } else {
          console.log(err);
        }
      })
    })
  }


}

export default DBModel
