const express = require('express');
const router = express.Router();
//const Product = require('../models/products.model');
const productsControllers = require('../controllers/products.controller');


router.get('/products', productsControllers.getAll);

router.get('/products/random', productsControllers.getRandom);

router.get('/products/:id', productsControllers.getId);

router.post('/products', productsControllers.post);

router.put('/products/:id', productsControllers.put);

router.delete('/products/:id', productsControllers.delete);


//export
module.exports = router;
