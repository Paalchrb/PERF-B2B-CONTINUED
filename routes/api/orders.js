const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { formatShopCartItems, createOrder } = require('../../config/utils');
//MongoDB models
const Order = require('../../models/Order');
const Company = require('../../models/Company');
const util = require('util');



// @route   POST api/orders
// @desc    Create order
// @access  Private
router.post(
  '/',
  [
    [
      check('shopCartItems', 'Shopping cart can not be empty')
        .exists(),
    ],
    auth,
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array() });
    }

    //Format inputdata to usefull format
    const { shopCartItems } = req.body;
    const formatedShopCartData = formatShopCartItems(shopCartItems);
    
    try {
      let orderIds = []
      for (let order of formatedShopCartData) {
        const orderId = await createOrder(order, req.user.id, req.user.companyId);
        orderIds.push(orderId);
      }
      
      return res
        .status(201)
        .json(orderIds); 
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server error');
    } 
  }
);


// @route    GET api/orders/me
// @desc     Get orders by companyId
// @access   Private
router.get(
  '/me', 
  auth, 
  async (req, res) => {
    try {
      const salesOrders = await Order.find({ 'seller.companyId': req.user.companyId });
      const procurementOrders = await Order.find({ 'buyer.companyId': req.user.companyId });

      if (salesOrders || procurementOrders) {
        return res
          .status(200)
          .send({ salesOrders, procurementOrders });
      } else {
        return res
          .status(400)
          .json({ 
            errors: [{ msg: 'Ingen ordre' }] 
        });
      };
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


// @route    GET api/orders/:orderId
// @desc     Get specific order by orderId
// @access   Private
router.get(
  '/:orderId', 
  auth, 
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);

      if (!order) {
        return res
          .status(400)
          .json({ msg: 'No orders found' });
      } 

      return res
        .status(200)
        .json(order);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);


// @route   GET api/orders/procurement/recent
// @desc    Get recent procurement orders
// @access  Private
router.get(
  '/procurement/recent',
  auth,
  async (req, res) => {
    try {
      const company = await Company.findById(req.user.companyId);
      const orderIds = company.recentOrders;

      const recentOrders = await Order.find( { '_id': { $in: orderIds } } );

      return res
        .status(200)
        .json(recentOrders);
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .send('Server Error');
    }
  }
);

module.exports = router;