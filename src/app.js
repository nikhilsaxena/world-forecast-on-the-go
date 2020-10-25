const express = require('express');
const path = require('path');
const geocode = require('./utils/geocode');
const weathercode = require('./utils/weathercode');

const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;

//paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('views', viewsPath);
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get('', (req, res)=>{
    res.render('index', {
       title: 'World Weather',
       author: 'Nikhil Saxena'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Page',
        author: 'Nikhil Saxena'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        tollLine : "+1-6692341709",
        author: 'Nikhil Saxena'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.city)
    {
        return res.send({
            Error: 'You must provide a city name!'
        });
    }
    geocode(req.query.city, (error, {latitude, longitude, city} = {})=>{
        if(error)
        {
           return res.send({
               Error: error
           });
        }
       
        weathercode(latitude, longitude, city, (error, response)=>{
            if(error)
            {
                return res.send({
                    Error: error
                })
            }
            res.send(response)            
        });
        
    });   
});

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: 404, 
        author: 'Nikhil Saxena',
        errorMessage: 'Help Article Not Found!'
    });
});

app.get('*', (req, res)=>{
    res.render('error', {
        title: 404,
        author: 'Nikhil Saxena',
        errorMessage: 'Page Not Found!'
    });
});

app.listen(port, ()=>{
    console.log("Server is up at Port ", port);
});