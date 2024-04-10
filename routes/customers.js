const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/jmk')

const customerSchema = mongoose.Schema({
    nickname: String,
    name: String,
    address: String,
    gst: {
        type: String,
        required: true
    }
})

const customer = mongoose.model('customer', customerSchema)

module.exports = customer
