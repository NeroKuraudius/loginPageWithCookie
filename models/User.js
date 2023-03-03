const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  profile:{
    type:String
  }
})

module.exports = mongoose.model('User', userSchema)