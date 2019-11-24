const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/595c7fea695fdad47bf4b236e583792d/' + encodeURI(latitude) + ',' + encodeURI(longitude) + '?units=si'
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect service", undefined)
        } else if (response.body.error) {
            callback("unable to find location because " + response.body.error, undefined)
        } else {
            callback(undefined, {
                data: response.body.daily.summary + "Its is currently " + response.body.currently.temperature +
                    " degrees out. Theres is a " + response.body.currently.precipProbability + "% chance of precipitation." +
                    "Temperature can go as maximum as " +
                    response.body.daily.data[0].temperatureHigh + " degrees. As minimum as " + response.body.daily.data[0].temperatureLow + " degrees"
            })
        }

    })
}
module.exports = forecast