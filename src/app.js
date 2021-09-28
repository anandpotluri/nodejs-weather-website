//Core Modules
const path = require('path');

//Dependency Modules
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express config
const staticDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialsDir = path.join(__dirname, "../templates/partials");

console.log(staticDir);

//assume the domain is app.com
//app.com
//app.com/help
//app.com/about

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set("views",viewsDir);
hbs.registerPartials(partialsDir);

//Setup static directory to serve.
app.use(express.static(staticDir));

app.get('', (req, res) => {
    res.render('index', {
        pageName:"Weather",
        author:"Anand"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageName:"About Me",
        author:"Anand"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        pageName:"Help for you",
        msgHeading: "Learn about nodejs",
        message:"Take a tutorial from Andrew Mead",
        author:"Anand"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        res.send({
            error:"you must provide address term"
        });
        return;
    }
    const location = req.query.address;
    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            res.send({
                error : error
            });
            return;
        }
    
        forecast(latitude,longitude,(error, forecastData) => {
            if(error) {
                res.send({
                    error : error
                });
                return;
            }
            res.send({
                location:location,
                forecast: forecastData
            });

        })
    });
});

app.get("/help/*", (req, res) => {
    res.render('error', {
        pageName:"Error Page",
        errorMsg: "Help article not found...",
        author:"Anand"
    });
});

app.get("*", (req, res) => {
    res.render('error', {
        pageName:"Error Page:404",
        errorMsg:"Page not found...",
        author:"Anand"
    });
});



//To startup the server on port 3000
app.listen(3000, () => {
    console.log("Server started up on port 3000");
})