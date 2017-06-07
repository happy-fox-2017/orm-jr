import assert from 'assert';

import DBModel from '../models/db_model';
import Student from '../models/student';

const db = new DBModel('./db/test.db');

/**
 * contoh testing function dengan promise
 * comment apabila tidak digunakan
 */
describe('DBModel Create All Table', function() {
  it('should create all tables', function(done) {
    db.setup()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
});

describe('Student', function() {

  const student = new Student(1, 'Yusuf', 'Arifien', 20);

  describe('#create()', function() {
    before(function (done) {
      db.clearStudentsTable().then(() => done());
    });

    it('should save without error', function(done) {
      Student.create(db.connection, student)
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#findById()', function() {
    before(function (done) {
      db.clearStudentsTable()
      .then(Student.create(db.connection, student))
      .then(() => done());
    });

    it('should find a student by given id', function (done) {
      const studentId = 1;
      Student.findById(db.connection, studentId)
      .then((foundStudent) => {
        assert.equal(studentId, foundStudent.id);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
