"use strict"
const db = require('./models');

db.Student.getAllData()

db.Student.create({
    first_name: 'Andrew',
    last_name: 'Christian',
    gender: 'male',
    height: 151,
    birthday: '1994-03-31',
    email: 'andrew@gmail.com',
    phone: '081212341231'
  })
  .then(student => {
    console.log(student.toJSON());
  })
  .catch(error => {
    console.log(`can't seed that data because:`);
    console.log(error.errors[0].message)
  });