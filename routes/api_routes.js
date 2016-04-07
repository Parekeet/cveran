var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersCtrl      = require('../controllers/users');
var menuController = require('../controllers/menu');
var ordersCtrl = require('../controllers/orders');
var profileController = require('../controllers/profile');

// Require token authentication.
var token = require('../config/token_auth');

// users resource paths:
router.post('/users',    usersCtrl.create);
router.get( '/users/me', token.authenticate, usersCtrl.me);
router.put( '/users/me', token.authenticate, usersCtrl.update);

router.post('/token', token.create);
router.post('/users/me/token', token.authenticate, token.refresh);

router.get('/menu', menuController.index);
router.get('/profile', profileController.index);

router.get('/orders', token.authenticate, ordersCtrl.index);
router.post('/orders', token.authenticate, ordersCtrl.create);

module.exports = router;
