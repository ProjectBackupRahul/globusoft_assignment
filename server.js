require('./models/db');

const express = require('express');
const path = require('path');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan'); 
const deviceController = require('./controllers/deviceController');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const PORT = process.env.PORT || 9654;

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout',
handlebars: allowInsecurePrototypeAccess(Handlebars),
layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

app.listen(PORT, () => {
    console.log(`Server started at port : ${PORT}`);
});

app.use('/device', deviceController);