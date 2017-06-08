"use strict"

class Student {
  constructor(first_name,last_name,cohort_id) {
    this.first_name = first_name
    this.last_name = last_name
    this.cohort_id = cohort_id
  }

  static create(db, student) {
    let query = `insert into students (first,last_name,cohort_id) values(${student.first_name},${student.last_name},${student.cohort_id})`
    db.run(query, err => {
      if (!err) {console.log(`student ${student.first_name} has been inserted`);}
      else {console.log(err);}
    })
    db.close()
  }

  static update(db, student) {
    let query = `update students set first_name=${student.first_name},last_name=${student.last_name},cohort_id=${student.cohort_id} where id=${student.id};`
    db.run(query, err => {
      if (!err) {console.log(`student with id ${student.id} has been updated`);}
      else {console.log(err);}
    })
    db.close()
  }

  static remove(db, id) {
    let query = `delete from students where id=${id}`
    db.run(query, err => {
      if (!err) {console.log(`student with id ${student.id} has been removed`);}
      else {console.log(err);}
    })
    db.close()
  }

  static findById(db,id) {
    let query = `select * from students where id=${id}`
    db.get(query, err,row => {
      if (!err) {console.log(`${row}`);}
      else {console.log(err);}
    })
    db.close()
  }

  static findAll(db, whereObj={limit:0,offset:0}) {
    let query = `select * from students limit ${+whereObj.limit},${+whereObj.offset}`
    db.all(query, (err, rows) => {
      if (!err) {console.log(rows);}
      else {console.log(err);}
    })
    db.close()
  }

  static findOrCreate(db,student) {

  }

  static where(db, whereStatement) {
    let query = `select * from students where ${whereStatement}`
    db.all(query, (err, rows) => {
      if (!err) {console.log(rows);}
      else {console.log(err);}
    })
    db.close()
  }


}

export default Student
