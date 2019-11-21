
const express = require('express');

const app = express();
// console.log(app);

const morgan = require('morgan');

app.use(morgan('dev'));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.get("/orders", (req, res, next) => {
//     res.json(["Orange","Apple","Watermellon"]);
// });
const orders = require('./data/orders');

app.post('/orders', (req, res, next) => {
    var id = req.body.id;
    var title = req.body.title;
    var description = req.body.description;

    res.send({id: id , title : title,description : description});
    orders.push({id: id , title : title,description : description});
})

const ordersRoutes = require('./routes/orders')

app.use('/orders', ordersRoutes);
//app.use('/orders/1', ordersRoutes)

// app.use('/orders/:id', (req, res) =>{
//     var key = req.params.id;
//     res.send({title : orders[key-1].title, description : orders[key-1].description});
// })


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({
        error: {
            message: error.message
        }
    })
});
module.exports = app;