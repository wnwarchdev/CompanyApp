const express = require('express');
const router = express.Router();
//const Employee = require('../models/employees.model');
const EmployeesController = require('../controllers/employees.controller');


router.get('/employees', EmployeesController.getAll);

router.get('/employees/random', EmployeesController.getRandom);

router.get('/employees/:id', EmployeesController.getId);

router.post('/employees', EmployeesController.post);

router.put('/employees/:id', EmployeesController.put);

router.delete('/employees/:id', EmployeesController.delete);


//export
module.exports = router;
