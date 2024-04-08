const mongoose = require("mongoose");
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/jmk')

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  customers: {
    type: Array,
    default: []
  }
})

userSchema.plugin(plm)

const user = mongoose.model('user', userSchema)

module.exports = user
