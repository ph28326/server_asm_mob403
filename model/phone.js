const mongoose = require('mongoose');
const PhoneSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    brand:{
        type: String,
        require: true 
    },
    price:{
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
})

const Phone = new mongoose.model('phones ', PhoneSchema);
module.exports = Phone;