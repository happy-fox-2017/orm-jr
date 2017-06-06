import assert from 'assert';

import DBModel from '../models/db_model';
import Student from '../models/student';

const db = new DBModel("./db/test.db")

/**
 * contoh testing function dengan promise
 * comment apabila tidak digunakan
 */
describe('DBModel Create All Table', function() {
  it('should create all table', function(done) {
    db.createAllTable()
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
  });
});
