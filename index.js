'use strict'

import repl from 'repl';

import DBModel from './models/db_model';
import Cohort from './models/cohort';
import Student from './models/student';

const help = () => {
  console.log(`
    1. Student.create(connection, <new Student()>)
    2. help()
    `);
};

const initializeContext = (context) => {
  context.dbModel = new DBModel('./db/student.db');
  context.Student = Student;
  context.help = help;
};

const r = repl.start({ prompt: '> ' });
initializeContext(r.context);
