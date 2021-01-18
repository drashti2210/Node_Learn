const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=f646d6d332a56c010508309861d7c107&query=20.95056,72.92306'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })

})
request.on('error', (error) => {
    console.log(`An error${error}`)
})
request.end()