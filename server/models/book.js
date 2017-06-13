'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  filename: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false
  },
  release_date: {
    type: String,
    required: false
  },
  cities: {
    type: [{
      type: mongoose.Schema.Types.Object,
      ref: 'City'
    }],
    required: false
  },
  language: {
    type: String,
    required: false
  }
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
