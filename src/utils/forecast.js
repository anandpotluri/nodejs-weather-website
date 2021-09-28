const request = require('request');

const forecast = (lat, lng, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=b45cbe528c4e7b606e0b29474718a695&query="+lat+","+lng;

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to Weather Service!",undefined);
        } else if(body.error) {
            const msg = body.error.info;
            callback(body.error.info, undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                forecast: body.current.weather_descriptions[0]
            });
        }
    });
}

module.exports = forecast;