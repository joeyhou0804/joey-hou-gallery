if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');

const methodOverride = require('method-override');
const path = require('path');

const stations = require('./routes/stations');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const {stationSchema} = require('./schemas');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/joeyhouhomepage';
const MongoStore = require('connect-mongo');
//mongodb://localhost:27017/joeyhouhomepage
//process.env.DB_URL

//===========================================

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database Connected!");
});

//===========================================

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize())

const store = new MongoStore({
    mongoUrl: dbUrl,
    secret: 'thisshouldbeabettersecret!',
    touchAfter: 24 * 60 * 60
});

store.on("error", function(e){
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'joeyhoucolumbia',
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(flash());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

//===========================================

app.use((req, res, next) => {
    res.locals.success = req.flash('Success!');
    res.locals.error = req.flash('Error!');
    next();
})

//===========================================

app.use('/', userRoutes)
app.use('/stations', stations)

app.get('/', (req, res) => {
    res.render('home')
});

//===========================================

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh no! Something went wrong!'
    res.status(statusCode).render('error', { err })
})

//===========================================


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}!`)
});

