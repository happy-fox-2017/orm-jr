"use strict"

class Student {
  constructor(data) {
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.cohorts_id = data.cohorts_id;
  }

  static create(db, student) {
    db.serialize(function() {
      let query = `INSERT INTO students (first_name, last_name, cohorts_id) VALUES ('${student.first_name}', '${student.last_name}', ${student.cohorts_id})`
      db.run(query, (err) => {
        if (!err) return err
      })
    })
  }

  static findAll(db) {
    db.serialize(function() {
      let query = 'SELECT * FROM students';
      db.all(query, (err, rows) => {
        if (!err) console.log(rows);
        else console.log(err);
      });
    });
  }

  static update(db, student, id) {
    db.serialize(function() {
      let query = `UPDATE students SET first_name = '${student.first_name}', last_name = '${student.last_name}', cohorts_id = ${student.cohorts_id} WHERE id = ${id}`;
      db.run(query, (err) => {
        if(err) return err
      })
    })
  }

  static deletes(db, id) {
    db.serialize(function() {
      let query = `DELETE FROM students WHERE id = ${id}`
      db.run(query, (err) => {
        if (err) return err
      })
    })
  }

  static findById(db, id) {
    db.serialize(function() {
      let query = `SELECT * FROM students WHERE id = ${id}`;
      db.all(query, (err, rows) => {
        if (err) console.log(err);
        else {
          console.log(rows);
        }
      })
    })
  }

  static where(conn, attribute) {
    db.serialize(function() {
      let query = `SELECT * FROM students WHERE ${attribute}`;
      db.run(query, (err, rows) => {
        if (err) console.log(err);
        else {
          console.log(rows);
        }
      })
    })
  }
}

// export default Student
module.exports = Student;