'use strict'

// import Student from './student';

const CREATE_COHORT_SQL = 'INSERT INTO cohorts VALUES (?, ?)';
const UPDATE_COHORT_SQL = 'UPDATE cohorts SET name = ? WHERE id = ?';
const DELETE_COHORT_SQL = 'DELETE FROM cohorts WHERE id = ?';
const SELECT_COHORT_BY_ID_SQL = 'SELECT * FROM cohorts where id = ?';
const FIND_ALL_COHORT_SQL = 'SELECT * FROM cohorts';

class Cohort {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static create(dbConnection, cohort) {
    return new Promise((resolve, reject) => {
      dbConnection.run(CREATE_COHORT_SQL,
      [cohort.id, cohort.name], (err) => {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  }

  static update(dbConnection, cohort) {
    return new Promise((resolve, reject) => {
      dbConnection.run(UPDATE_COHORT_SQL,
      [cohort.name, cohort.id], function afterUpdate(err) {
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
      dbConnection.run(DELETE_COHORT_SQL,
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
      dbConnection.all(SELECT_COHORT_BY_ID_SQL,
      [id], (err, rows) => {
        if (!err) {
          if (rows.length === 1) {
            resolve(rows[0]);
          } else if (rows.length > 1) {
            reject(new Error('Cohort id not unique'));
          } else {
            reject(new Error('Cohort not found'));
          }
        } else {
          reject(err);
        }
      });
    });
  }

  static findAll(dbConnection, options) {
    return new Promise((resolve, reject) => {
      let findAllQuery = FIND_ALL_COHORT_SQL;
      if (options) {
        findAllQuery = `${FIND_ALL_COHORT_SQL} LIMIT ${options.limit}, ${options.offset}`;
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
      dbConnection.all(`${FIND_ALL_COHORT_SQL} WHERE ${filter}`,
      (err, rows) => {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
      });
    });
  }

  static findOrCreate(dbConnection, cohort) {
    return new Promise((resolve, reject) => {
      Cohort.findById(dbConnection, cohort.id)
      .then((foundCohort) => {
        Cohort.update(dbConnection, cohort)
        .then((updateResult) => {
          resolve(updateResult);
        })
        .catch((updateErr) => {
          reject(updateErr);
        });
      }).catch((err) => {
        console.log(err);
        Cohort.create(dbConnection, cohort)
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

export default Cohort;
