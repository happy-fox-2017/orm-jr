"use strict"

import Student from "./student.js";

class Cohort {
  constructor(options) {
    this.id = options.id;
    this.name = options.name;
  }

    static create(db, cohort) {
      let queryCreate = `INSERT INTO cohorts (id, name) VALUES ('${cohort.id}', '${cohort.name}')`;
      db.serialize( function() {
        db.run(queryCreate, (err) => {
          if(!err) {
            console.log('Create Data Cohorts Berhasil');
          } else {
            console.log(err);
          }
        })
      })
    }

    static update(db,cohort) {
      let queryUpdate = `UPDATE cohorts SET name = '${cohort.name}' WHERE id = ${cohort.id}`;
      db.run(queryUpdate, (err) => {
        if(!err) {
          console.log('Update Data Cohort Berhasil');
        } else {
          console.log(err);
        }
      })
    }

    static remove(db,id) {
      let queryRemove = `DELETE FROM cohorts WHERE id = ${id};`;
      db.run(queryRemove, (err) => {
        if(!err) {
          console.log("Hapus Data Studnts Berhasil");
        } else {
          console.log(err);
        }
      })
    }

    static finById(db,id) {
      let queryId = `SELECT * FROM cohorts WHERE id = '${id}'`;
      db.each(queryId , (err,data) => {
        if(!err) {
          console.log(data);
        } else {
          console.log(err);
        }
      })
    }

    static findAll(db,callback) {
      let queryAll = 'SELECT * from cohorts';
      db.all(queryAll,callback);
    }

    static where(db,condition,callback) {
      db.all(`SELECT * from cohorts WHERE '${condition}'`,callback);
    }
}

export default Cohort
