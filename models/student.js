"use strict"

class Student {
  constructor(first_name,last_name,cohort_id,where_id=null) {
    this.first_name = first_name
    this.last_name = last_name
    this.cohort_id = cohort_id
    this.where_id = where_id
  }

  static create(db, student) {
    let query = `insert into students (first_name,last_name,cohort_id) values('${student.first_name}','${student.last_name}',${student.cohort_id})`
    db.run(query, err => {
      if (!err) {console.log(`student ${student.first_name} has been inserted`);}
      else {console.log(err);}
    })
  }

  static update(db, student) {
    let query = `update students set first_name='${student.first_name}',last_name='${student.last_name}',cohort_id=${student.cohort_id} where id=${student.where_id};`
    db.run(query, err => {
      if (!err) {console.log(`student with id ${student.where_id} has been updated`);}
      else {console.log(err);}
    })
  }

  static remove(db, id) {
    let query = `delete from students where id=${id}`
    db.run(query, err => {
      if (!err) {console.log(`student with id ${id} has been removed`);}
      else {console.log(err);}
    })
  }

  static findById(db,id) {
    let query = `select * from students where id=${id}`
    db.get(query, (err,row) => {
      if (!err) {console.log(`${JSON.stringify(row)}`);}
      else {console.log(err);}
    })
  }

  static findAll(db, whereObj=null) {
    if (whereObj !== null) {
      var query = `select * from students limit ${+whereObj.limit},${+whereObj.offset}`
    } else {
      var query = `select * from students`
    }
    db.all(query, (err, rows) => {
      if (!err) {console.log(rows);}
      else {console.log(err);}
    })
  }

  static findOrCreate(db,student) {
    let query = `select * from students where first_name='${student.first_name}' or last_name='${student.last_name}'`
    db.all(query, (err,students) => {
      if (!err) {
        if (students.length === 0) {
          console.log(`student ${student.first_name} not found , creating ...`);
          Student.create(db,student)
        }
      }
      else {console.log(err);}
    })

  }

  static where(db, whereStatement) {
    let query = `select * from students where ${whereStatement}`
    db.all(query, (err, rows) => {
      if (!err) {console.log(rows);}
      else {console.log(err);}
    })
  }


}

export default Student
