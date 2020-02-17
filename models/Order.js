const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  orderNumber: {
    type: String,
  },
  orderLines: [
    {
      productId: {
        type: String,
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      productPrice: {
        type: Number,
        required: true
      },
      productVat: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      orderLineTotal: {
        type: Number
      }
    }
  ],
  buyer: {
    companyId: {
      type: String,
      required: true
    },
    orgNum: {
      type: String,
      required: true
    },
    companyName: {
      type: String,
      required: true
    },
    address: {
      street: {
        type: String,
        required: true
      },
      zipCode: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    }
  },
  seller: {
    companyId: {
      type: String,
      required: true,
      unique: true
    },
    orgNum: {
      type: String,
      required: true,
      unique: true
    },
    companyName: {
      type: String,
      required: true
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      }
    }
  },
  buyerContact: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true,
      unique: true
    },
    userPhone: {
      type: String,
      required: true
    }
  }
});

module.exports = Order = mongoose.model('Order', OrderSchema);