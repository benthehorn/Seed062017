var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect("public/index.html");
});

//Get Partials made as Views
/*router.get('/', function(req, res) {
  var name = req.params.view;
  console.log(name);
  res.redirect("public/app/" + name + '/');
});*/

module.exports = router;
