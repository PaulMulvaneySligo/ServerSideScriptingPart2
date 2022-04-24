const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')

const home = require('./routes/home')
const menu = require('./routes/menu')
const booking = require('./routes/booking')


const cookieParser = require('cookie-parser');
app.use(cookieParser("Test"));

session = require('express-session');

app.use(session(
    {secret: "Test", 
    cookie: { maxage: 6000},
    resave: false,
    saveUninitialized: false
}))

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

const {flashMiddleware} = require('./lib/middleware.js');
app.use(flashMiddleware);

app.use(express.urlencoded({ extended: true })) 

const connectionString = 'mongodb://127.0.0.1:27017/MenuDB'

mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})
  
const db = mongoose.connection;
  
db.on('error', console.error.bind(console, 'connection error:'));
  
db.once('open', () => {
  console.log("DB connected")  
});

app.use(express.static('public'));

app.use('/', home)

app.use('/menu', menu)

app.use('/booking', booking)


app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))