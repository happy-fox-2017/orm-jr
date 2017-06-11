'use strict'

import repl from 'repl';

import DBModel from './models/db_model';
import Cohort from './models/cohort';
import Student from './models/student';

const help = () => {
  console.log(`
    Student:
    1. Student.create(dbConnection, student)
    2. Student.update(dbConnection, student)
    3. Student.delete(dbConnection, id)
    4. Student.findById(dbConnection, id)
    5. Student.findAll(dbConnection, options)
    6. Student.where(dbConnection, filter)
    7. Student.where(dbConnection, filter)
    8. Student.findOrCreate(dbConnection, student)

    Cohort:
    1. Cohort.create(dbConnection, cohort)
    2. Cohort.update(dbConnection, cohort)
    3. Cohort.delete(dbConnection, id)
    4. Cohort.findById(dbConnection, id)
    5. Cohort.findAll(dbConnection, options)
    6. Cohort.where(dbConnection, filter)
    7. Cohort.where(dbConnection, filter)
    8. Cohort.findOrCreate(dbConnection, cohort)
    `);
};

const initializeContext = (context) => {
  context.dbModel = new DBModel('./db/student.db');
  context.Student = Student;
  context.Cohort = Cohort;
  context.help = help;
};

const r = repl.start({ prompt: '> ' });
initializeContext(r.context);
