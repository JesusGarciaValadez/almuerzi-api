const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Orders = mongoose.model('Order', new Schema({
  meal_id: { type: Schema.Types.ObjectID, red: 'Meal' },
  user_id: String,
}))

module.exports = Orders
