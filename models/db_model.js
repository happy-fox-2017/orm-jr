'use strict'

const sqlite3 = require('sqlite3').verbose();

const CREATE_STUDENT_TABLE_DDL = `
  CREATE TABLE IF NOT EXISTS students
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL UNIQUE,
      last_name TEXT,
      age INTEGER,
      cohort_id INTEGER,
      FOREIGN KEY (cohort_id) REFERENCES cohorts(id)
    )`;

const CREATE_COHORT_TABLE_DDL = `
  CREATE TABLE IF NOT EXISTS cohorts
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    )`;

class DBModel {

  constructor(dbFileName) {
    this.db = new sqlite3.Database(dbFileName);
  }

  createCohortsTable() {
    return new Promise((resolve, reject) => {
      this.db.run(CREATE_COHORT_TABLE_DDL, (err) => {
        if (!err) {
          resolve('Create table cohorts success');
        } else {
          reject(err);
        }
      });
    });
  }

  createStudentsTable() {
    return new Promise((resolve, reject) => {
      this.db.run(CREATE_STUDENT_TABLE_DDL, (err) => {
        if (!err) {
          resolve('Create table students success');
        } else {
          reject(err);
        }
      });
    });
  }

  createAllTable() {
    return new Promise((resolve, reject) => {
      this.createCohortsTable()
      .then((result) => {
        console.log(result);
        return this.createStudentsTable();
      })
      .then((result) => {
        console.log(result);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
    });
  }
}

export default DBModel
