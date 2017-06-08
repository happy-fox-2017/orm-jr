"use strict"

// import Student from "./student.js";
const Student = require('./student.js');

class Cohort {
  constructor(data) {
    this.name = data.name;
  }
  static create(db, cohorts) {
    db.serialize(function() {
      let query = `INSERT INTO cohorts (name) VALUES ('${cohorts.name}')`
      db.run(query, (err) => {
        if (!err) console.log('Inserted')
        else return err
      })
    })
  }

  static findAll(db) {
    db.serialize(function() {
      let query = 'SELECT * FROM cohorts';
      db.all(query, (err, rows) => {
        if (!err) console.log(rows);
        else return err;
      });
    });
  }

  static update(db, cohorts, id) {
    db.serialize(function() {
      let query = `UPDATE cohorts SET name = '${cohorts.name}' WHERE id = ${id}`;
      db.run(query, (err) => {
        if(!err) console.log('updated')
        else return err
      })
    })
  }

  static deletes(db, id) {
    db.serialize(function() {
      let query = `DELETE FROM cohorts WHERE id = ${id}`
      db.run(query, (err) => {
        if (err) return err
      })
    })
  }

  static findById(db, id) {
    db.serialize(function() {
      let query = `SELECT * FROM cohorts WHERE id = ${id}`;
      db.all(query, (err, rows) => {
        if (err) return err;
        else {
          console.log(rows);
        }
      })
    })
  }

  static where(db, attribute) {
    db.serialize(function() {
      let query = `SELECT * FROM cohorts WHERE ${attribute}`;
      db.run(query, (err, rows) => {
        if (err) return err;
        else {
          console.log(rows);
        }
      })
    })
  }
}

// export default Cohort
module.exports = Cohort;
