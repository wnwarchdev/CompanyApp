//const express = require('express');
//const router = express.Router();
const Product = require('../models/products.model');


exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments(); //counting number of documents
    const rand = Math.floor(Math.random() * count);
    const dep = await Product.findOne().skip(rand); //skip - certain numbers of documents(rand - this number) is skipping
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const dep = await Product.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name: name, client: client });
    await newProduct.save(); //save - add to collection
    res.json({ message: 'OK' });
  } 
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { name, client } = req.body;
  try {
    const dep = await(Product.findById(req.params.id));
    if(dep) {
      await Product.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
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
};
