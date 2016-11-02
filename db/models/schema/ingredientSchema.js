const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  text: String,
  quantity: Number,
  measure: String,
  food: String,
  checked: {type: Boolean, default: false}
  weight: Number,
});

module.exports = IngredientSchema;