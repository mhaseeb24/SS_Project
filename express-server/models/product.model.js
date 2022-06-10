const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

var productSchema = new mongoose.Schema({
    id: {
        type: String,
    },

    sender: {
        type: String
    },
    receiver: {
        type: String
    },

    hash: {
        type: String,
        unique: true
    },

    amount: {
        type: String
    } 
});

mongoose.model('product', productSchema);
