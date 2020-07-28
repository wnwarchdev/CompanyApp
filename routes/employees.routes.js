const express = require('express');
const router = express.Router();
const Employee = require('../models/employees.model');


//get 
router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find().populate('department'));
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


//get /random
router.get('/employees/random', async (req, res) => {

  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().populate('department').skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

//get /:id
router.get('/employees/:id', async (req, res) => {

  try {
    const dep = await Employee.findById(req.params.id).populate('department');
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});


//post
router.post('/employees', async (req, res) => {

  try {

    const { name } = req.body;
    const newEmployee = new Employee({ name: name });
    await newEmployee.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

//put
router.put('/employees/:id', async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await(Employee.findById(req.params.id));
    if(dep) {
      dep.name = name;
      await dep.save();
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

//delete
router.delete('/employees/:id', async (req, res) => {

  try {
    const dep = await(Employee.findById(req.params.id));
    if(dep) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});


//export
module.exports = router;
