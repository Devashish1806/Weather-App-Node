const request = require('request')
const { brotliCompressSync } = require('zlib')

const forecast = (latitude, longitude, callback) => {

    options = {
        url: 'http://api.weatherstack.com/current?access_key=f629368b93182040df49c0e692494391&query=' + latitude + ',' + longitude,
        json: true
    }

    request( options, (error, {body}) => {
        if(error){
            callback(error, undefined)
        }
        else if(body.error){
            callback('Unable to find coordinates', undefined)
        }
        else{
            const data = {
                weather: body.current.weather_descriptions[0],
                temperature: body.current.temperature
            }
            callback(undefined, data)
        }
    })
}

module.exports.forecast = forecast