"use strict"

var Student = require('./student.js');

class Cohort {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
  }

  static create(conn, data) {
    conn.serialize(function() {
      let query = `insert into cohorts(name) values ('${data.name}')`;
      conn.run(query, function(err) {
        if (!err) console.log('New data created!');
        else console.log(err);
      });
    });
  }

  static update(conn, data) {
    conn.serialize(function() {
      let query = `update cohorts set name = '${data.name}' where id = ${data.id}`;
      conn.run(query, function(err) {
        if (!err) console.log(`Data ${data.id} has been updated!`);
        else console.log(err);
      });
    })
  }

  static delete(conn, id) {
    conn.serialize(function() {
      let query = `delete from cohorts where id = ${id}`;
      conn.run(query, function(err) {
        if (!err) console.log(`Data ${id} has been deleted!`);
        else console.log(err);
      });
    })
  }

  static findById(conn, id) {
    conn.serialize(function() {
      let query = `select * from cohorts where id = ${id}`;
      conn.all(query, function(err, rows) {
        if (!err) console.log(rows);
        else console.log(err);
      })
    })
  }

  static findAll(conn, callback, condition = {limit: 10, offset: 0}) {
    conn.serialize(function() {
      let query = `select * from cohorts`;
      conn.all(query, function(err, rows) {
        if (!err) callback(null, rows);
        else callback(err, null);
      })
    })
  }

  static where(conn, attribute, callback) {
    conn.serialize(function() {
      let query = `select * from cohorts where ${attribute}`;
      conn.all(query, function(err, rows) {
        if (!err) return callback(null, rows);
        else return callback(err, null);
      })
    })
  }
}

module.exports = Cohort;
