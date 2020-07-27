const express = require('express');
const router = express.Router();
const Product = require('../models/products.model');


//get 
router.get('/products', async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


//get /random
router.get('/products/random', async (req, res) => {

  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Product.findOne().skip(rand);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

//get /:id
router.get('/products/:id', async (req, res) => {

  try {
    const dep = await Product.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});


//post
router.post('/products', async (req, res) => {

  try {

    const { name } = req.body;
    const newProduct = new Product({ name: name });
    await newProduct.save();
    res.json({ message: 'OK' });

  } catch(err) {
    res.status(500).json({ message: err });
  }

});

//put
router.put('/products/:id', async (req, res) => {
  const { name } = req.body;

  try {
    const dep = await(Product.findById(req.params.id));
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
router.delete('/products/:id', async (req, res) => {

  try {
    const dep = await(Product.findById(req.params.id));
    if(dep) {
      await Product.deleteOne({ _id: req.params.id });
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
