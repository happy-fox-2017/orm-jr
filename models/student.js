'use strict';
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define('Student', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    // birthday: DataTypes.DATE,
    height:{
     type: DataTypes.INTEGER,
     validate: {
       min:{
         args: 151,
         msg: "Height min 150"
       }
     }
   },
   birthdate: DataTypes.DATE,
   email:{
     type: DataTypes.STRING,
     allowNull: false,
     unique: true,
     validate: {
       isEmail: {
         args: true,
         msg: "Email format incorrect"
       },
       isUniqued: function (value, next) {
         Student.findAll({
           where: {
             email: value
           }
         }).then(function (data) {
           if(data.length > 0) {
             return next('that email exists');
           }
           return next();
         })
       }
     }
   },
   phone: {
     type: DataTypes.STRING,
     validate: {
       isAlphanumeric: {
         args: false,
           msg: "Phone not allow alphanumeric"
       },
       isNumeric: {
         args: true,
         msg: "Phone not allow letters"
       },
       len:{
         args:[10,13],
         msg: "Phone length must be 10-13"
       }
     }
   },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      getAllData: function() {
        Student.findAll()
        .then(students => {
          students.forEach(student => {
            console.log('\n');
            console.log(student.id + '.')
            console.log(student.first_name)
            console.log(student.last_name)
            console.log(student.getFullName())
            console.log(student.getAge());
            console.log('\n');
          })
        })
      }
    },
    instanceMethods : {
      getFullName: function() {
        return `${this.first_name} ${this.last_name}`
      },
      getAge: function() {
        let date = new Date() - this.birthdate
        return Math.floor(date / 3.154e+10)
      }
    }
  });
  return Student;
};