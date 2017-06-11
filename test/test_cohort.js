import DBModel from '../models/db_model';
import Cohort from '../models/cohort';
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

describe('Cohort', function () {

  const cohort = new Cohort(1, 'Happy Fox');

  describe('#create()', function () {
    before(function (done) {
      db.clearCohortsTable().then(() => done());
    });

    it('should save without error', function (done) {
      Cohort.create(db.connection, cohort)
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
      db.clearCohortsTable().then(() => {
        Cohort.create(db.connection, cohort)
        .then(() => {
          done();
        });
      });
    });

    it('should change only 1 row', function (done) {
      Cohort.update(db.connection, new Cohort(1, 'ABC'))
      .then((result) => {
        result.should.equal(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#delete()', function () {
    before(function (done) {
      db.clearCohortsTable().then(() => {
        Cohort.create(db.connection, cohort)
        .then(() => {
          done();
        });
      });
    });

    it('should delete only 1 row', function (done) {
      Cohort.delete(db.connection, 1)
      .then((result) => {
        result.should.equal(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#findById()', function () {
    before(function (done) {
      db.clearCohortsTable()
      .then(Cohort.create(db.connection, cohort))
      .then(() => done());
    });

    it('should find a cohort by given id', function  (done) {
      const cohortId = 1;
      Cohort.findById(db.connection, cohortId)
      .then((foundCohort) => {
        foundCohort.id.should.equal(cohortId);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#findAll()', function () {
    before(function (done) {
      db.clearCohortsTable()
      .then(Cohort.create(db.connection, cohort))
      .then(() => done());
    });

    it('should find all cohorts', function  (done) {
      Cohort.findAll(db.connection)
      .then((foundCohorts) => {
        foundCohorts.should.have.lengthOf(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#where()', function () {
    before(function (done) {
      db.clearCohortsTable()
      .then(Cohort.create(db.connection, cohort))
      .then(() => done());
    });

    it('should find all cohorts with given filter', function  (done) {
      Cohort.where(db.connection, 'name = \'Happy Fox\'')
      .then((foundCohorts) => {
        foundCohorts.should.have.lengthOf(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });

  describe('#findOrCreate()', function () {
    before(function (done) {
      db.clearCohortsTable()
      .then(Cohort.create(db.connection, new Cohort(1, 'ABC')))
      .then(() => done());
    });

    it('should change 1 row', function (done) {
      Cohort.findOrCreate(db.connection, cohort)
      .then((result) => {
        result.should.equal(1);
        done();
      })
      .catch((err) => {
        done(err);
      });
    });
  });
});
