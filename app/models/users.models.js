const { request } = require("express");

const mongoose = require('mongoose')

const register = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true

    },
    house_number: {
        type: String,
        required: true

    },
    street_address: {
        type: String,
        required: true

    },
    city: {
        type: String,
        required: true

    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Users', register)