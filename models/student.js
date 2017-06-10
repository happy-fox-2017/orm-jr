"use strict"

const sqlite = require('sqlite3').verbose();

class Student {
  constructor (first_name, last_name, cohorts_id, id=1) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.cohorts_id = cohorts_id;
    this.id = id;
  }

  static create(db, student) {
    let id = false;
    let cekCohortID = `SELECT id FROM cohorts`;
    let query = `INSERT INTO students (first_name, last_name, cohorts_id) VALUES ('${student.first_name}', '${student.last_name}', ${student.cohorts_id})`;
    db.serialize(() => {
      db.all(cekCohortID, (err,idRows) => {
        if (!err) {
          for (let i=0; i<idRows.length; i++) {
            if (idRows[i].id === student.cohorts_id) {
              id = true;
              break;
            }
          }
          if (id === true) {
            db.run(query, (insert) => {
              if (!insert) console.log(`Data's inserted`);
              else console.log(insert);
            });
          }
          else {
            console.log(`Data can't be inserted, cohort ID not match`);
          }
        }
      });
    });
  }

  static update(db, student) {
    let query = `UPDATE students SET first_name = '${student.first_name}', last_name = '${student.last_name}', cohorts_id = '${student.cohorts_id}' WHERE id = ${student.id}`;
    db.serialize(() => {
      db.run(query, (err) => {
        (!err) ? console.log(`Student's updated.`) : console.log(err)
      });
    });
  }

  static delete(db, id) {
    let query = `DELETE FROM students WHERE id = ${id};`
    db.serialize(() => {
      db.run(query, (err) => {
        (!err) ? console.log(`Student's deleted.`) : console.log(err)
      });
    });
  }

  static findById(db, id) {
    let query = `SELECT * FROM students WHERE id = ${id};`
    db.serialize(() => {
      db.all(query, (err,rows) => {
        (!err) ? console.log(rows) : console.log(err)
      });
    });
  }

  static findAll(db, callback) {
    let query = `SELECT * FROM students;`
    db.serialize(() => {
      db.all(query, (err,rows) => {
        callback(rows,err);
      });
    });
  }

  static where(db, searchValue, callback) {
    let query = `SELECT * FROM students WHERE ${searchValue};`
    db.serialize(() => {
      db.all(query, (err,rows) => {
        callback(rows,err);
      });
    });
  }
}

module.exports = Student;