// Section 6
// Asynchronous Node.js

// Trying asynchronous code
console.log('Starting')
setTimeout(() => {
 console.log('2 Second Timer')
}, 2000)
console.log('Stopping')

const request = require('request')
const geocode = require('./geocode')
const forecast = require('./forecast')

// Fetching data from API
const url1 = 'http://api.weatherstack.com/current?access_key=f646d6d332a56c010508309861d7c107&query=20.946701,72.952034'
request({ url: url1 }, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.current)
})

// Sending Customized request
const url2 = 'http://api.weatherstack.com/current?access_key=f646d6d332a56c010508309861d7c107&query=20.946701,72.952034&units=f'
request({ url: url2, json: true }, (error, response) => {
    console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degres at ${response.body.location.name}`)
})

// Fetching longitude & latitude 
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Navsari.json?access_token=pk.eyJ1IjoiZHJhc2h0aTIyMTAiLCJhIjoiY2tqeTRhcnR1MG8xcTJ1bnc5Z3d6emYwdSJ9.mIS4Egcgq8hyZWiAy9Xqww&limit=1'
request({ url: geocodeURL, json: true }, (error, response) => {
    const latitude = response.body.features[0].center[0]
    const longitude = response.body.features[0].center[1]
    console.log(latitude, longitude)
})

// // ERROR handling in fetching data
request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services!')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')
    } else {
        const latitude = response.body.features[0].center[0]
        const longitude = response.body.features[0].center[1]
        console.log(latitude, longitude)
    }
})

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to location services!')
    } else if (response.body.features.length === 0) {
        console.log('Unable to find location. Try another search.')
    } else {
        const latitude = response.body.features[0].center[0]
        const longitude = response.body.features[0].center[1]
        console.log(latitude, longitude)
    }
})

// // Abstract Callbacks
geocode('Navsari', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})

forecast(20.95056, 72.92306, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})

// Take input from command line

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(location)
            console.log(forecastData)
        })
    })
}

