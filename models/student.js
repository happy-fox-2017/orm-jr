"use strict"
import DBModel from './db_model.js';
class Student {
  constructor(options) {
    this.first_name = options.first_name;
    this.last_name = options.last_name;
    this.cohorts_id = options.cohorts_id;
    this.id = options.id;
  }

    static create(db,student) {
      db.serialize( function() {
        let queryCreate = `INSERT INTO students(first_name,last_name,cohorts_id) VALUES ('${student.first_name}','${student.last_name}', '${student.cohorts_id}')`;
        db.run(queryCreate, (err) => {
          if(!err) {
            console.log('Create data Students Berhasil');
          } else {
            console.log(err);
          }
        })
      })
    }

    static update(db,student) {
      let queryUpdate = `Update students SET first_name = '${student.first_name}', last_name='${student.last_name}',cohorts_id = '${student.cohorts_id}' WHERE id = ${student.id}`;
      db.run(queryUpdate, (err) => {
        if(!err) {
          console.log('Update Data Student Berhasil');
        } else {
          console.log(err);
        }
      })
    }

    static remove(db,id) {
      let queryRemove = `DELETE From students WHERE id = '${id}'`
      db.run(queryRemove, (err) => {
        if(!err) {
          console.log("Hapus Data Studnts Berhasil");
        } else {
          console.log(err);
        }
      })
    }

    static finById(db,id) {
      db.each(`SELECT * FROM students WHERE id = '${id}'` , (err,data) => {
        if(!err) {
          console.log(data);
        } else {
          console.log(err);
        }
      })
    }

    static findAll(db,callback) {
      let queryAll = 'SELECT * from students';
      db.all(queryAll,callback);
    }

    static where(db,condition,callback) {
      db.all(`SELECT * from students WHERE '${condition}'`,callback);
    }
    static findLimit(db, student, callback) {
     db.all(`SELECT * FROM students LIMIT ${student.limit} OFFSET ${student.offset}`, callback);
    }
}



  // Student.findAll(DBModel.connection, function(err, data) {
  //   if(!err) {
  //     for(var i = 0 ; i < data.length; i ++){
  //     console.log(data[i]);
  //     }
  //   } else {
  //     console.log('Error');
  //   }
  // });

  // Student.where(DBModel.connection, "first_name = 'Windi'", function(err,data){
  //   if(!err) {
  //     for(var i = 0 ; i < data.length ; i ++) {
  //       console.log(data[i]);
  //     }
  //   } else {
  //       console.log('error');
  //     }
  //
  //   });

  // Student.findAll(DBModel.connection, {limit: 2, offset ; 1}, function(err,data){
  //   if(!err) {
  //     for(var i = 0 ; i < data,length ; i ++) {
  //       console.log(data[i]);
  //     }
  //   } else {
  //     console.log(err);
  //   }
  // })
  //

  // Student.findOrCreate(DBModel.connection, new Student("Windiana","Krismanuyar", 1))



export default Student
