if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');

const arts = require('./routes/arts');
const videos = require('./routes/videos');
const handbooks = require('./routes/handbooks');
const posters = require('./routes/posters');

const methodOverride = require('method-override');
const path = require('path');

const helmet = require('helmet');

//mongodb://localhost:27017/joeyhouhomepage
//process.env.DB_URL

//===========================================

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
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

app.use('/arts', arts)
app.use('/videos', videos)
app.use('/handbooks', handbooks)
app.use('/posters', posters)

app.use((req, res, next) => {
    res.locals.success = req.flash('Success!');
    res.locals.error = req.flash('Error!');
    next();
})

//===========================================

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

