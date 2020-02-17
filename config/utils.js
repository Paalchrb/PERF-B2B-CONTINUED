const Order = require('../models/Order');
const User = require('../models/User');
const Company = require('../models/Company');

//Format shopCartItems to appropriate format to create order with order API
const formatShopCartItems = shopCartItems => {
  const shopCartObjects = [];
  shopCartItems.forEach(shopCartItem => {
    const {
      _id,
      productName,
      productPrice,
      productVat,
      companyId,
      sellerName,
      quantity
    } = shopCartItem;

    const orderLineTotal =  productPrice * +quantity;

    const existingIndex = shopCartObjects.findIndex(shopCartObject => shopCartObject.companyId === companyId);
    
    if (existingIndex !== -1) {
      shopCartObjects[existingIndex].products.push({
        productId: _id,
        productName,
        productPrice,
        productVat,
        quantity,
        orderLineTotal
      });
    } else {
      shopCartObjects.push({
        sellerName,
        companyId,
        products: [
          {
            productId: _id,
            productName,
            productPrice,
            productVat,
            quantity,
            orderLineTotal
          }
        ]
      });
    }
  });

  return shopCartObjects;
};

/**
 * Accept shopCartOrder array, user id and buyer company id as input.
 * Creates all orders and save to database, then return an array of order Ids
 * corresponding to the orders created
 **/
const createOrder = async (cartOrder, userId, buyerCompanyId) => {
  try {
    const contactPerson = await User.findById(userId);
    const buyer = await Company.findById(buyerCompanyId);
    const seller = await Company.findById(cartOrder.companyId);
    
    const order = new Order({   
      orderLines: [
        ...cartOrder.products
      ],
      buyer: {
        companyId: buyer._id,
        orgNum: buyer.orgNum,
        companyName: buyer.companyName,
        address: {
          street: buyer.address.street,
          zipCode: buyer.address.zipCode,
          city: buyer.address.city,
          country: buyer.address.country
        }
      },
      seller: { 
        companyId: seller._id,
        orgNum: seller.orgNum,
        companyName: seller.companyName,
        address: {
          street: seller.address.street,
          zipCode: seller.address.zipCode,
          city: seller.address.city,
          country: seller.address.country
        }
      },
      buyerContact: {
        firstName: contactPerson.userContact.firstName,
        lastName: contactPerson.userContact.lastName,
        userEmail: contactPerson.userContact.userEmail,
        userPhone: contactPerson.userContact.userPhone,
      }
    });

    seller.recentOrders.push(order._id);
    if (seller.recentOrders.length > 4) {
      seller.recentOrders = seller.recentOrders.slice(0, 5);
    }
  
    buyer.recentOrders.push(order._id);
    if (buyer.recentOrders.length > 4) {
      buyer.recentOrders = buyer.recentOrders.slice(0, 5);
    }
    
    //avoid duplicate products in recent products:
    if(!buyer.recentProducts.includes(cartOrder.products.productId)) {
      buyer.recentProducts.unshift(cartOrder.products.productId);
      if (buyer.recentProducts.length > 4) {
        buyer.recentProducts = buyer.recentProducts.slice(0, 5);
      }
    }

    await order.save();
    await seller.save();
    await buyer.save(); 

    return order._id
  } catch(error) {
    console.error(error);
  }
}

module.exports = {
  formatShopCartItems,
  createOrder
}