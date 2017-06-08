"use strict"

import DBModel from "./models/db_model.js";
import Cohort from "./models/cohort.js";
import Student from "./models/student.js";

const repl = require('repl')
const replServer = repl.start('>> ')
let dbModel = new DBModel()










replServer.context.dbModel = dbModel
