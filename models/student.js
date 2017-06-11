"use strict"

const CREATE_STUDENT_SQL = 'INSERT INTO students VALUES (?, ?, ?, ?, ?)';
const UPDATE_STUDENT_SQL = 'UPDATE students SET first_name = ?, last_name = ? WHERE id = ?';
const DELETE_STUDENT_SQL = 'DELETE FROM students WHERE id = ?';
const SELECT_STUDENT_BY_ID_SQL = 'SELECT * FROM students where id = ?';
const FIND_ALL_STUDENT_SQL = 'SELECT * FROM students';

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

  static update(dbConnection, student) {
    return new Promise((resolve, reject) => {
      dbConnection.run(UPDATE_STUDENT_SQL,
      [student.firstName, student.lastName, student.id], function afterUpdate(err) {
        if (!err) {
          resolve({ changes: this.changes, err: null });
        } else {
          reject({ changes: null, err });
        }
      });
    });
  }

  static delete(dbConnection, id) {
    return new Promise((resolve, reject) => {
      dbConnection.run(DELETE_STUDENT_SQL,
      [id], function afterDelete(err) {
        if (!err) {
          resolve({ changes: this.changes, err: null });
        } else {
          reject({ changes: null, err });
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

  static findAll(dbConnection) {
    return new Promise((resolve, reject) => {
      dbConnection.all(FIND_ALL_STUDENT_SQL,
      (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });
  }

  static where(dbConnection, filter) {
    return new Promise((resolve, reject) => {
      dbConnection.all(`${FIND_ALL_STUDENT_SQL} WHERE ${filter}`,
      (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });
  }

}

export default Student;
