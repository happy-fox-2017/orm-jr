"use strict"

const CREATE_STUDENT_SQL = 'INSERT INTO students VALUES (?, ?, ?, ?, ?)';
const SELECT_STUDENT_BY_ID_SQL = 'SELECT * FROM students where id = ?';

class Student {
  constructor(id, firstName, lastName, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.cohort = null;
  }

  static create(dbConnection, student) {
    return new Promise((resolve, reject) => {
      dbConnection.run(CREATE_STUDENT_SQL,
      [student.id, student.firstName, student.lastName, student.age, student.cohort], (err) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  static findById(dbConnection, id) {
    return new Promise((resolve, reject) => {
      dbConnection.all(SELECT_STUDENT_BY_ID_SQL,
      [id], (err, rows) => {
        if (!err) {
          if (rows.length === 1) {
            resolve(rows[0]);
          } else if (rows.length > 1) {
            reject(new Error('Student id not unique'));
          } else {
            reject(new Error('Student not found'));
          }
        } else {
          reject(err);
        }
      });
    });
  }

}

export default Student;
