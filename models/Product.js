const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter product quantity'],
    },
    category: {
      type: String,
      required: [true, 'Please specify product category'],
      enum: ['Fruit', 'Vegetable', 'Grain'], // restricts to these values
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String, // Cloudinary URL
      default: '',   // optional, can be empty initially
    },
  }, {timestamps : true}
);

module.exports = mongoose.model('Product', productSchema);