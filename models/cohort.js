"use strict"

import Student from "./student.js";

class Cohort {
  constructor(name,id){
    this.name = name;
    this.id = id;
  }
  
  static create(db,cohort){
    let add = `INSERT INTO cohort(name) VALUES('${cohort.name}')`;
    db.run(add,(err)=>{
      if (err) {
        console.log(err);
      }else {
        console.log('data success inserted');
      }
    })
  }
  
  static update(db,cohort){
    let update = `UPDATE cohort SET name = '${cohort.name}'
                  WHERE id = '${cohort.id}'`;
    db.run(update,(err) => {
      if (err) {
        console.log(err);
      }else {
        console.log('data cohort already updated');
      }
    })
  }
  
  static deleteData(db,id){
    let deleteData = `DELETE FROM cohorts WHERE id = '${id}'`;
    db.run(deleteData,(err) => {
      if (err) {
        console.log(err);
      }else {
        console.log('data cohort already deleted');
      }
    })
  }
  
  static findByID(db,id){
    let findByID = `SELECT * FROM cohorts WHERE id = '${id}'`;
    db.each(findByID,(err,row)=>{
      if (err) {
        console.log(err);
      }else {
        console.log(row);
      }
    })
  }
  
  static findAll(db,callback){
    let show = `SELECT cohorts.*, student.*
                FROM cohorts
                LEFT JOIN students ON cohorts.id = students.cohort_id`;
    db.all(show,(err,rows)=>{
      if (err) {
        callback(err,null)
      }else {
        callback(rows)
      }
    })
  }
  
  static where(db,value,callback){
    let show = `SELECT * FROM cohorts WHERE '${value}'`;
    db.all(show,(err,rows)=>{
      if (err) {
        callback(err,null)
      }else {
        callback(rows)
      }
    })
  }
  
  static help(){
    let help = `create(db,cohort)\n update(db,cohort)\n deleteData(db, id)\n findByID(db, id)\n findAll(db, callback)\n where(db,value,callback)`;
    console.log(help);
  }

}

export default Cohort
