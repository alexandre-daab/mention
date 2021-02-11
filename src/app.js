const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();
// Load models
const Mentions = require('./models/mention');


// Database
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});



// App
const app = express();

//criação de middleware para receber dados por urlEncoded
app.use(bodyparser.json());


// Load routes
const indexRoutes = require('./routes/route-index');
app.use('/', indexRoutes);

const mentionsRoutes = require('./routes/route-mention');
app.use('/mentions', mentionsRoutes);


module.exports = app;