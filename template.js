// findAll temp
student.findAll(dbModel.connection)
student.create(dbModel.connection, {first_name: "Ells", last_name:"Schöne", cohorts_id:1})
student.update(dbModel.connection, {first_name: "Hello", last_name:"Schöne", cohorts_id:2}, 2)
student.deletes(dbModel.connection, 4)

cohorts.findAll(dbModel.connection)
cohorts.create(dbModel.connection, {name: "Gray"})
cohorts.update(dbModel.connection, {name: "Blue"}, 4)
cohorts.deletes(dbModel.connection, 2)