var express = require('express');
var router = express.Router();
let userController = require ("../controllers/productsControllers")

/* GET home page. */
router.get("/", userController.products);


module.exports = router;
