'use strict';

import express from 'express';
const Book = require('../models/book');
const City = require('../models/city');
const router = express.Router();

/**
 * @api {get} /books/:city Finds all books (titles and authors) based on a city name
 * @apiName getBooksByCity
 * @apiGroup MongoDB
 *
 * @apiDescription Used whenever a user want to get all books that mentions a given city name
 * @apiParam {String} The city's name
 *
 * @apiSuccess {Array} An array of books containing title and author
 * @apiSuccess (Success 200) OK
 */
router.get('/books/:city', (req, res) => {
  let city = req.params.city;
  let query = Book.find({
    'cities.name': city,
  }, { _id: 0, title: 1, author: 1 }).exec();

  query.then(data => {
    if (!data) {
      res.status(204).end();
    } else if (data.length == 0) {
      res.status(400).ngJSON({ message: 'The city was invalid or missing.' });
    } else {
      res.status(200).ngJSON({ books: data });
    }
  }).catch(reason => {
    console.error(reason);
  });
});

/**
 * @api {get} /title/:book Finds all books (titles and authors) based on a book name
 * @apiName getBooksByTitle
 * @apiGroup MongoDB
 *
 * @apiDescription Used whenever a user wants to find all the cities mentioned by a book
 * @apiParam {String} The books title
 *
 * @apiSuccess {Array} An array of cities containing the latitude and longitude
 * @apiSuccess (Success 200) OK
 */
router.get('/titles/:book', (req, res) => {
const book = req.params.book;
  let returnedCities = [];
  let returnedCodes = [];
  const query = Book.find({
    title: book
  }, { _id: 0, cities: 1}).exec();
  query.then(result => {
    if(result[0] === undefined){
      return res.status(400).ngJSON({message: 'The title was invalid or missing.'});
    } else {
      res.status(200).ngJSON({ cities: result[0].cities });
    }
  }).catch(reason =>{
    console.error(reason);
  });
});

/**
 * @api {get} /author/:author Finds all books and cities based on an author name
 * @apiName getBooksAndCities
 * @apiGroup MongoDB
 *
 * @apiDescription Used whenever a user wants to find all the books and cities mentiones by an auhtor
 * @apiParam {String} The authors name
 *
 * @apiSuccess {Array} An array of book titles and city names and coordinates
 * @apiSuccess (Success 200) OK
 */
router.get('/authors/:author', (req, res) => {
  const author = req.params.author;
  if (author === 'undefined') {
    return res.status(400).ngJSON({ message: 'The author name was missing.' });
  }
  let cities = [];
  let countryCodes = [];
  let titles = [];
  let citiesWithLoc = [];
  const query = Book.find({ author: author }, { _id: 0, title: 1, cities: 1 }).exec();
  query.then(data => {
    if (data.length == 0) {
      return res.status(404).ngJSON({ message: 'No books found by this author.' });
    }
    data.forEach(book => {
      book.cities.forEach(city => {
        cities = cities.concat(city.name);
        countryCodes = countryCodes.concat(city.countrycode);
      });
      titles = titles.concat(book.title);
    });
    const query1 = City.find({ name: { $in: cities }, countrycode: { $in: countryCodes } }, {
      _id: 0,
      name: 1,
      loc: 1,
      countrycode: 1
    }).exec();
    query1.then(data => {
      citiesWithLoc.push(data);
      res.status(200).ngJSON({ titles: titles, cities: citiesWithLoc });
    }).catch(reason => {
      console.error(reason);
    });
  });
});

/**
 * @api {get} /geolocate/:coords/:maxDistance Finds boooks and cities in proximity to the coordinates
 * @apiName getBooksCloseTo
 * @apiGroup MongoDB
 *
 * @apiDescription Used whenever a user wants to find all the books and cities within a distance of the coords
 * @apiParam {Array}Array of the coordinates(lat,long)
 * @apiParam {Number} The max distance to search away from the coords (in meters)
 *
 * @apiSuccess {Array} An array of book titles and city names and coordinates
 * @apiSuccess (Success 200) OK
 */
router.get('/geolocate/:coords/:maxDistance', (req, res) => {
  const coords = req.params.coords.split(',');
  const maxDistance = req.params.maxDistance;

  let cities = [];
  City.find({
    loc: { $near: [coords[1], coords[0]], $maxDistance: maxDistance / 111.2 },
  }, { _id: 0, name: 1 }, (err, result) => {
    if (result === undefined) {
      return res.status(400).ngJSON({ message: 'The coordinates were invalid or missing.' });
    }

    result.forEach(city => {
      cities = cities.concat(city.name);
    });
    Book.find({
      'cities.name': { $in: cities },
    }, { _id: 0, title: 1, author: 1 }, (err, books) => {
      if (err) {
        console.error(err);
      }else if(books.length == 0) {
        return res.status(404).ngJSON({ message: 'No cities mentioned in books close to here.' });
      }else {
        res.status(200).ngJSON({ books: books });
      }

    });

  });
});

export default router;
