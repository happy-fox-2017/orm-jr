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

  static findAll(db, limit) {
    db.serialize(function() {
      let query = `SELECT * FROM students`;
      if (limit && limit.hasOwnProperty('limit')) {
        query = `SELECT * FROM students limit ${limit.limit};`
      }
      if (limit && limit.hasOwnProperty('limit') && limit.hasOwnProperty('offset')) {
        query = `SELECT * FROM students limit ${limit.limit},${limit.offset}`
      }
      console.log(query);
      db.all(query, (err, rows) => {
        if (!err) console.log(rows);
        return err
      });
    });
  }

  static update(db, student, id) {
    db.serialize(function() {
      let query = `UPDATE students SET first_name = '${student.first_name}', last_name = '${student.last_name}', cohorts_id = ${student.cohorts_id} WHERE id = ${id}`;
      db.run(query, (err) => {
        if (err) return err
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
        if (err) return err
        else {
          console.log(rows);
        }
      })
    })
  }

  static where(db, attribute) {
    db.serialize(function() {
      let query = `SELECT * FROM students WHERE ${attribute}`;
      db.run(query, (err, rows) => {
        if (err) return err
        else {
          console.log(rows);
        }
      })
    })
  }

  static findOrCreate(db, student) {
    let query = `
      INSERT INTO students (firstname,lastname,cohort_id)
      SELECT '${student.firstname}','${student.lastname}',${student.cohort_id}
      FROM students
      WHERE id NOT IN (
        SELECT id
        FROM students
        WHERE
          cohort_id = ${student.cohort_id} AND
          firstname = '${student.firstname}' AND
          lastname = '${student.lastname}'
      )`;
    db.serialize(() => {
      db.run(query, (err) => {
        return err
      });
    });
  }
}

// export default Student
module.exports = Student;