const request = require('request');
const chalk = require('chalk');

const weatherCode = (latitude, longitude, city, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2542d1f1a0168c38f9d94459822faa9a&query=" + latitude + "," + longitude;
    
    request({url, json:true}, (error, {body})=>{
        if(error)
        {
            callback('Unable to connect to Weather Service');
        }
        else if(body.error)
        {
            callback('Unable to fetch the Weather Reoprt! Check the co-ordinates once.');
        }
        else
        {
            const tempDegree = body.current.temperature;
            const precpitate = body.current.precip;
            const weatherDescription = body.current.weather_descriptions[0];
            const windSpeed = body.current.wind_speed;
            const visibility = body.current.visibility;
            const forecast = weatherDescription + ". It is currently " + tempDegree + " degrees out. There is a " + precpitate + "% chance of rain. Current Wind Speed is " + windSpeed + " with Visibility of " + visibility + " meters." ;
            const country = body.location.country;
            const name = body.location.name;
            const region = body.location.region;
            const location = name + ", " + region + ", " +country;
            callback(null, {
                Forecast: forecast,
                Location: location,
                Address: city});
        }
    })
}

module.exports = weatherCode;