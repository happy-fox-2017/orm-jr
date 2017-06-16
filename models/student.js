"use strict"
var sqlite3 = require('sqlite3').verbose();

class Student {
  constructor(data) {
    this.id = data.id;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.cohort_id = data.cohort_id;
  }

  static create(conn, data) {
    conn.serialize(function() {
      let query = `insert or ignore into students(firstname, lastname, cohort_id) values ('${data.firstname}', '${data.lastname}', ${data.cohort_id})`;
      conn.run(query, function(err) {
        if (!err) console.log('New data created!');
        else console.log(err);
      });
    });
  }

  static update(conn, data) {
    conn.serialize(function() {
      let query = `update students set firstname = '${data.firstname}', lastname = '${data.lastname}', cohort_id = ${data.cohort_id} where id = ${data.id}`;
      conn.run(query, function(err) {
        if (!err) console.log(`Data ${data.id} has been updated!`);
        else console.log(err);
      });
    })
  }

  static delete(conn, id) {
    conn.serialize(function() {
      let query = `delete from students where id = ${id}`;
      conn.run(query, function(err) {
        if (!err) console.log(`Data ${id} has been deleted!`);
        else console.log(err);
      });
    })
  }

  static findById(conn, id) {
    conn.serialize(function() {
      let query = `select * from students where id = ${id}`;
      conn.all(query, function(err, rows) {
        if (!err) console.log(rows);
        else console.log(err);
      })
    })
  }

  static findAll(conn,  callback, condition = {limit: 10, offset: 0}) {
    conn.serialize(function() {
      let query = `select * from students limit ${condition.limit} offset ${condition.offset}`;
      conn.all(query, function(err, rows) {
        if (!err) callback(null, rows);
        else callback(err, null);
      })
    })
  }

  static where(conn, attribute, callback) {
    conn.serialize(function() {
      let query = `select * from students where ${attribute}`;
      conn.all(query, function(err, rows) {
        if (!err) return callback(null, rows);
        else return callback(err, null);
      })
    })
  }
}

module.exports = Student;