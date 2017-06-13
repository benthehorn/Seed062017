'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    asciiname: {
        type: String,
        required: true,
        unique: false
    },
    loc: {
        type: [Number],
        index: '2d'
    },
    countrycode: {
        type: String,
        required: true,
        unique: false
    }
});

CitySchema.index({loc: '2dsphere'});

const City = mongoose.model('City', CitySchema);

module.exports = City;

// to add a location loc: { type: "Point", coordinates: [ longitude, latitude ] },
