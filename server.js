'use strict';

//load environment config
require('dotenv').config();

const path = require('path')
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
 
let app = express()

//set server port
app.set('port', process.env.PORT || 9000)

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//set static folder
app.use(express.static(path.resolve(__dirname, './dist')))

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Listen on provided port, on all network interfaces.
app.listen(app.get('port'), () => {
    console.log('Listening on port %d', app.get('port'))
})