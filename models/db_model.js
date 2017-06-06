"use strict"

const sqlite = require('sqlite3').verbose();

// CREATE TABLE
let CREATE_TABLE_STUDENTS = `CREATE TABLE students(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(100), lastname VARCHAR(100), cohort_id INTEGER NOT NULL, FOREIGN KEY(cohort_id) REFERENCES cohorts(id))`;
let CREATE_TABLE_COHORTS = `CREATE TABLE cohorts(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100))`;

class DBModel {
  constructor(file){
    this.connection = new sqlite.Database(file);
  }
  
  setup(){
    let db = this.connection;
    
    let createStudent = () =>{
      db.run(CREATE_TABLE_STUDENTS,(err) =>{
        if (err) {
          console.log(err);
        }else {
          console.log('create table students');
        }
      });
    }
    
    let createCohort = () => {
      db.run(CREATE_TABLE_COHORTS,(err) =>{
        if (err) {
          console.log(err);
        }else {
          console.log('create table cohorts');
        }
      })
    }
    
    createStudent();
    createCohort();
    
  }
}

export default DBModel
