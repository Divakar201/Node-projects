const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(address) + ".json?access_token=pk.eyJ1IjoiZGluZXNoODE4NjkwIiwiYSI6ImNrMzdrb21keDAwMmkzaHBjMXkwcnQwM2UifQ.8H3CmFVgKrzRZXbGXrEI8g&limit=1"
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect service", undefined)
        } else if (response.body.error) {
            callback("unable to find location" + response.body.error, undefined)
        } else if (response.body.features.length === 0) {
            callback("No address matches found", {})
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode