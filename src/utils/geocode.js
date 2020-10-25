const request = require('request');
const chalk = require('chalk');

const geoCode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1IjoibmlraGlsc2F4ZW5hIiwiYSI6ImNrZzdzOTh3aDBhYnoycHFvbDkzMnVyNTYifQ.ESy6SmkoI0LQoDHQEKlyHQ&limit=1";
    
    //making call
    request({url, json:true}, (error, {body})=>{
        if(error)
        {
            callback('Unable to connect to location service');
        }
        else if(body.features.length === 0)
        {
            callback('Unable to fetch the Latitude and Longitude.');
        }
        else
        {
            const lon = body.features[0].center[0];
            const lat = body.features[0].center[1];
            const data = {
                "latitude":lat,
                "longitude":lon,
                "city":location
            }
            callback(null,data);
        }
    })
}

module.exports = geoCode;

