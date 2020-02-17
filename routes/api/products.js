const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// MongoDB models
const Product = require('../../models/Product');
const Company = require('../../models/Company');



// @route   POST api/products
// @desc    Add new product
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('productName', 'Product name is required')
        .not()
        .isEmpty(),
      check('productPrice', 'Price is required')
        .not()
        .isEmpty(),
      check('productVat', 'Vat class is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    const companyId = req.user.companyId;

    const {
      productName,
      productDescription,
      productImage,
      productPrice,
      productVat,
      productSubhead,
      productInfoUpload,
      productExternalUrl,
    } = req.body;

    const productNetPrice = +productPrice * (1 + +productVat);

    try {
      const product = new Product({
        productName,
        productDescription,
        productImage,
        productPrice,
        productVat,
        productNetPrice,
        productSubhead,
        productInfoUpload,
        productExternalUrl,
        companyId
      });

      await product.save();

      return res
        .status(201)
        .json(product);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


// @route   GET api/products/
// @desc    Get all products
// @access  Public
router.get(
  '/',
  async (req, res) => {
    try {
      const products = await Product.find();

      if (products.length === 0) {
        return res
          .status(404)
          .json({ 
            errors: [{ msg: 'Ingen produkter funnet...' }] 
          });
      }

      return res
        .status(200)
        .json(products);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);



// @route   GET api/products/favorites
// @desc    Get favourite products
// @access  Private
router.get(
  '/favorites',
  auth,
  async (req, res) => {
    try {
      const company = await Company.findById(req.user.companyId);
      const favIds = company.favoriteProducts;
      
      const favProducts = await Product.find( { _id : { $in : favIds } } );

      if (favProducts.length === 0) {
        return res
          .status(404)
          .json({ 
            errors: [{ msg: 'Ingen produkter funnet...' }] 
          });
      }
      
      return res
        .status(200)
        .json(favProducts)
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);
  
  

// @route   GET api/products/recent
// @desc    Get recently bought products
// @access  Private
router.get(
  '/recent',
  auth,
  async (req, res) => {
    try {
      const company = await Company.findById(req.user.companyId);
      const recentIds = company.recentProducts;
      
      const recProducts = await Product.find( { _id : { $in : recentIds } } );

      if (recProducts.length === 0) {
        return res
          .status(404)
          .json({ 
            errors: [{ msg: 'Ingen produkter funnet...' }] 
          });
      }
      
      return res
        .status(200)
        .json(recProducts)
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);

// @route   GET api/products/me
// @desc    Get current company's products
// @access  Private
router.get(
  '/me',
  auth,
  async (req, res) => {
    try {
      const myProducts = await Product.find({ 'companyId': req.user.companyId });

      if (myProducts.length === 0) {
        return res
          .status(404)
          .json({ 
            errors: [{ msg: 'Du har ikke lagt til noen produkter...' }]
          });
      }
      return res
        .status(200)
        .json(myProducts);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


  // @route   GET api/products/:productId
  // @desc    Get product by id
  // @access  Public
  router.get(
    '/:productId',
    async (req, res) => {
      try {
        const product = await Product.findById(req.params.productId);
        
        if(!product) {
          return res
            .status(404)
            .json({ 
              errors: [{ msg: 'Produkt ikke funnet' }] 
            });
        }
  
        return res
          .status(200)
          .json(product);
      } catch (error) {
        console.error(error.message);
        return res
          .status(500)
          .send('Server Error');
    }
  }
);
    
module.exports = router;