const request = require('request')

const geocode = (address, callback) => {

    options = {
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGV2YXNoaXNoMTgwNiIsImEiOiJja2pvaDBqY2ExZm9kMzBtam92OHB1dWFhIn0.zc-ZXl6JlRjoRsz64dWqbA&limit=1',
        json: true
    }

    request( options, (error, {body}) => {
        if(error){
            callback('Error while connecting', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location, try another location', undefined)
        }
        else{
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback( undefined, data)
        }
    })
}

module.exports.geocode = geocode