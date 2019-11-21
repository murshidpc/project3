const express = require('express');
const router = express.Router();

const orders = require('./../data/orders');

// handle incoming request to /users
router.get('/', (req, res, next) => {
    var user = req.header('name');
    res.set('user',[user]);
    res.status(200).json({
       orders: orders,
       user : req.header('name')
    });
});



module.exports = router;