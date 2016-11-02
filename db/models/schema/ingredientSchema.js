const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  text: String,
  quantity: Number,
  measure: String,
  food: String,
  weight: Number,
  checked: {type: Boolean, default: false}
});

module.exports = IngredientSchema;