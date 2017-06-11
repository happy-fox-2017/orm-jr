import DBModel from '../models/db_model';
import Student from '../models/student';
import chai from 'chai';

const should = chai.should();

const db = new DBModel('./db/test.db');

/**
 * contoh testing function  dengan promise
 * comment apabila tidak digunakan
 */
describe('DBModel Create All Table', function () {
  it('should create all tables', function (done) {
    db.setup()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
});

describe('Student', function () {

  const student = new Student(1, 'Yusuf', 'Arifien', 20);

  describe('#create()', function () {
    before(function (done) {
      db.clearStudentsTable().then(() => done());
    });

    it('should save without error', function (done) {
      Student.create(db.connection, student)
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#update()', function () {
    before(function (done) {
      db.clearStudentsTable().then(() => {
        Student.create(db.connection, student)
        .then(() => {
          done();
        });
      });
    });

    it('should change only 1 row', function (done) {
      Student.update(db.connection, new Student(1, 'aaa', 'bbb'))
      .then((result) => {
        if (!result.err) {
          result.changes.should.equal(1);
          done();
        } else {
          done(result.err);
        }
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#delete()', function () {
    before(function (done) {
      db.clearStudentsTable().then(() => {
        Student.create(db.connection, student)
        .then(() => {
          done();
        });
      });
    });

    it('should delete only 1 row', function (done) {
      Student.delete(db.connection, 1)
      .then((result) => {
        if (!result.err) {
          result.changes.should.equal(1);
          done();
        } else {
          done(result.err);
        }
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#findById()', function () {
    before(function (done) {
      db.clearStudentsTable()
      .then(Student.create(db.connection, student))
      .then(() => done());
    });

    it('should find a student by given id', function  (done) {
      const studentId = 1;
      Student.findById(db.connection, studentId)
      .then((foundStudent) => {
        foundStudent.id.should.equal(studentId);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#findAll()', function () {
    before(function (done) {
      db.clearStudentsTable()
      .then(Student.create(db.connection, student))
      .then(() => done());
    });

    it('should find all students', function  (done) {
      Student.findAll(db.connection)
      .then((foundStudents) => {
        foundStudents.should.have.lengthOf(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#where()', function () {
    before(function (done) {
      db.clearStudentsTable()
      .then(Student.create(db.connection, student))
      .then(() => done());
    });

    it('should find all students with given filter', function  (done) {
      Student.where(db.connection, 'first_name = \'Yusuf\'')
      .then((foundStudents) => {
        foundStudents.should.have.lengthOf(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
