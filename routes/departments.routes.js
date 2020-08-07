const express = require('express');
const router = express.Router();
//const Department = require('../models/department.model');
const DepartmentController = require('../controllers/departments.controller');


router.get('/departments', DepartmentController.getAll);

router.get('/departments/random', DepartmentController.getRandom);

router.get('/departments/:id', DepartmentController.getId);

router.post('/departments', DepartmentController.post);

router.put('/departments/:id', DepartmentController.put);

router.delete('/departments/:id', DepartmentController.delete);


//export
module.exports = router;
