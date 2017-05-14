"use strict"
let sqlite3 = require('sqlite3').verbose();

class DBModel {
  constructor(file) {
    this.connection = new sqlite3.Database(file)
  }

  createTable() {
    let db = this.connection
    db.serialize(function() {
    let query = 'CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(50), last_name VARCHAR(50), cohorts_id INTEGER)'
      db.run(query, (err) => {
        if(err) console.log(err)
        else console.log('Table created');
        query = 'CREATE TABLE IF NOT EXISTS cohorts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50))'
        db.run(query, (err) => {
          if(err) console.log(err);
          else console.log('Table created');
        })
      })
    })
  }
}

// var db = new DBModel('../db/student.db')

// export default DBModel
module.exports = DBModel;
