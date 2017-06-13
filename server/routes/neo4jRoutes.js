'use strict';

import express from 'express';
import * as neo4jController from '../dbFacade/neo4jSession';
const router = express.Router();

/**
 * @api {get} /books/:city Finds all books (book object) based on a city name
 * @apiName getBooksByCity
 * @apiGroup Neo4J
 *
 * @apiDescription Used whenever a user want to get all books that mentions a given city name
 * @apiParam {String} The city's name
 *
 * @apiSuccess {Array} An array of books containing title and author
 * @apiSuccess (Success 200) OK
 */
router.get('/books/:city', (req, res) => {
    const city = req.params.city;
    neo4jController.getBookByCityName(city).then(data => {
        if (!data) {
            res.status(204).end();
        } else if (data.length == 0) {
            res.status(404).ngJSON({message: 'There is no books mentioned by '+ city});
        } else {
            res.status(200).ngJSON({books: data});
        }
    }).catch(reason => {
        console.error(reason);
    });
});

/**
 * @api {get} /books/:book Finds all cities mentioned in a book (city object) based on a book title
 * @apiName getCitiesByTitle
 * @apiGroup Neo4J
 *
 * @apiDescription Used whenever a user wants to find all the cities mentioned by a book
 * @apiParam {String} The books title
 *
 * @apiSuccess {Array} An array of cities containing the latitude and longitude
 * @apiSuccess (Success 200) OK
 */

router.get('/cities/:book', (req, res) => {
    const bookTitle = req.params.book;
    neo4jController.getCitiesByBookTitle(bookTitle).then(data => {
        if (!data) {
            res.status(204).end();
        } else if (data.length == 0) {
            res.status(404).ngJSON({message: 'The book was invalid or missing.'});
        } else {
            res.status(200).ngJSON({cities: data});
        }
    }).catch(reason => {
        console.error(reason);
    });
});

/**
 * @api {get} /author/:author Finds all books and cities mentioned in them based on an author name
 * @apiName getBooksAndCities
 * @apiGroup Neo4j
 *
 * @apiDescription Used whenever a user wants to find all the books and cities mentioned by an author
 * @apiParam {String} The authors name
 *
 * @apiSuccess {Array} An array of book titles and city names and coordinates
 * @apiSuccess (Success 200) OK
 */

router.get('/author/:author', (req, res) => {
    const author = req.params.author;
    neo4jController.getBooksAndCitiesByAuthor(author).then(data => {
        if (!data) {
            res.status(204).end();
        } else if (data.length == 0) {
            res.status(404).ngJSON({message: 'The author was invalid or missing.'});
        } else {
            res.status(200).ngJSON({booksAndCities: data});
        }
    }).catch(reason => {
        console.error(reason);
    });
});

/**
 * @api {get} /geolocate/:coords/:maxDistance Finds all books and cities in vicinity of coordinates and max Distance
 * @apiName getBooksAndCities
 * @apiGroup Neo4j
 *
 * @apiDescription Used whenever a user wants to find all the books and cities mentioned by an author
 * @apiParam {String} The authors name
 *
 * @apiSuccess {Array} An array of book titles and city names and coordinates
 * @apiSuccess (Success 200) OK
 */

router.get('/geolocate/:coords/:maxDistance', (req, res) => {
    const coords = req.params.coords.split(',').map(Number);
    let maxDistance = req.params.maxDistance;
    maxDistance = parseInt(maxDistance);
    neo4jController.getBooksAndCitiesByCoordinates(coords, maxDistance ).then(data => {
        if (!data) {
            res.status(204).end();
        } else if (data.length == 0) {
            res.status(404).ngJSON({message: 'The coordinates or maxDistance was invalid or missing.'});
        } else {
            res.status(200).ngJSON({booksAndCities: data});
        }
    }).catch(reason => {
        console.error(reason);
    });
});
export default router;
