'use strict'

const CREATE_STUDENT_SQL = 'INSERT INTO students VALUES (?, ?, ?, ?)';
const UPDATE_STUDENT_SQL = 'UPDATE students SET first_name = ?, last_name = ?, cohort_id = ? WHERE id = ?';
const DELETE_STUDENT_SQL = 'DELETE FROM students WHERE id = ?';
const SELECT_STUDENT_BY_ID_SQL = 'SELECT * FROM students where id = ?';
const FIND_ALL_STUDENT_SQL = 'SELECT * FROM students';

class Student {
  constructor(id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this._cohort = null;
  }

  set cohort(cohort) {
    this._cohort = cohort;
  }

  get cohort() {
    return this._cohort;
  }

  static create(dbConnection, student) {
    return new Promise((resolve, reject) => {
      const cohortId = student.cohort ? student.cohort.id : null;
      dbConnection.run(CREATE_STUDENT_SQL,
      [student.id, student.firstName, student.lastName, cohortId], (err) => {
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
      const cohortId = student.cohort ? student.cohort.id : null;
      dbConnection.run(UPDATE_STUDENT_SQL,
      [student.firstName, student.lastName, cohortId, student.id], function afterUpdate(err) {
        if (!err) {
          resolve(this.changes);
        } else {
          reject(err);
        }
      });
    });
  }

  static delete(dbConnection, id) {
    return new Promise((resolve, reject) => {
      dbConnection.run(DELETE_STUDENT_SQL,
      [id], function afterDelete(err) {
        if (!err) {
          resolve(this.changes);
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

  static findAll(dbConnection, options) {
    return new Promise((resolve, reject) => {
      let findAllQuery = FIND_ALL_STUDENT_SQL;
      if (options) {
        findAllQuery = `${FIND_ALL_STUDENT_SQL} LIMIT ${options.limit}, ${options.offset}`;
      }
      dbConnection.all(findAllQuery,
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

  static findOrCreate(dbConnection, student) {
    return new Promise((resolve, reject) => {
      Student.findById(dbConnection, student.id)
      .then((foundStudent) => {
        Student.update(dbConnection, student)
        .then((updateResult) => {
          resolve(updateResult);
        })
        .catch((updateErr) => {
          reject(updateErr);
        });
      }).catch((err) => {
        console.log(err);
        Student.create(dbConnection, student)
        .then(() => {
          resolve();
        })
        .catch((createErr) => {
          reject(createErr);
        });
      });
    });
  }

}

export default Student;
