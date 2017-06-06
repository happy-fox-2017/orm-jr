"use strict"

import DBModel from "./db_model.js";

class Student {
  constructor(firstname,lastname,cohort_id,id){
    this.firstname = firstname;
    this.lastname = lastname;
    this.cohort_id = cohort_id;
    this.id = id;
  }
  
  static create(db,student){
    let create = `INSERT INTO students(firstname,lastname,cohort_id) VALUES('${students.firstname}','${students.lastname}','${students.cohort_id}')`;
    db.run(create,(err)=>{
      if (err) {
        console.log(err);
      }else {
        console.log('student data successfully created');
      }
    })
  }
  
  static update(db,students){
    let update = `UPDATE students SET firstname = '${students.firstname}', lastname = '${students.lastname}', cohort_id = '${students.cohort_id}'
                  WHERE id = '${students.id}'`;
    db.run(update,(err)=>{
      if (err) {
        console.log(err);
      }else {
        console.log('data student have been updated');
      }
    })
  }
  
  static deleteData(db,id){
    let deleteData = `DELETE FROM students WHERE id = '${id}'`;
    db.run(deleteData,(err) =>{
      if (err) {
        console.log(err);
      }else {
        console.log('data already deleted');
      }
    })
  }
  
  static findByID(db,id){
    let findByID = `SELECT * FROM students where id = '${id}'`;
    db.each(findByID,(err,row) =>{
      if (err) {
        console.log(err);
      }else {
        console.log(row);
      }
    })
  }
  
  static findAll(db, option = {limit:100,offset:0}, callback){
    let show = `SELECT students.*, cohorts.name
                FROM students 
                LEFT JOIN cohorts ON students.cohort_id = cohorts.id
                LIMIT ${option.limit} OFFSET ${option.offset}`;
    db.all(show, (err,rows) =>{
      if (err) {
        callback(err,null);
      }else {
        callback(null,rows);
      }
    })
  }
  
  static findOrCreate(db, students){
    let check = `SELECT * FROM students WHERE firstname = '${students.firstname}' AND lastname = '${students.lastname}' AND cohort_id = '${students.cohort_id}'`;
    let add  = `INSERT INTO students(firstname,lastname,cohort_id) VALUES('${students.firstname}','${students.lastname}','${students.cohort_id}')`;
    
    db.all(check,(err,data) => {
      if(!err && data.length > 0){
        console.log('data already exist!');
      }else {
        db.run(add,(err) => {
          if (err) {
            console.log(err);
          }else {
            console.log("data doesn't exist, and successfully created");
          }
        })
      }
    })
  }
  
  static where(db,value,callback){
    let arr = value.split(' = ');
    // console.log(arr);
    let show = `SELECT * FROM students WHERE ${arr[0]} = ${arr[1]}`;
    db.all(show,(err,rows) => {
      if (err) {
        callback(err,null)
      }else {
        callback(null,rows);
      }
    })
  }
  
  static help(){
    let help = `create(db,student)\n update(db,student)\n delete(db, id)\n findByID(db, id)\n findAll(db, callback)\n where(db,value,callback)`;
    console.log(help);
  }
  
}

export default Student
