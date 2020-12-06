const { request } = require("express");

const mongoose = require('mongoose')

const markers = new mongoose.Schema({
    type: {
        type: String
    },

    properties: {
        message: String,
        iconSize: [],
    },
    geometry: {
        type2: String,
        coordinates: []
        ,
    },

})
module.exports = mongoose.model('mapMarkers', markers)