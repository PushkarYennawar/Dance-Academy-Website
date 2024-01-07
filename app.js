const express = require('express');
const path = require('path');
const fs = require('fs');
const port = 80;
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1/contactDance');
//Define mongoose Schema
const contactSchema = mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    concern: String
});

const Contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS
app.get('/', (req, res) => {
    const params = { };
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
    const params = { };
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the DataBase");
    }).catch(() => {
        res.status(404).send("The item was not saved to the DataBase");
    })
})


//START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});