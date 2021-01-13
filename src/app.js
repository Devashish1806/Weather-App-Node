const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()                       //  express is a function with no arguments/parameters
const port = process.env.PORT

// define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewTemplates = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// set handlebars engine and view location
app.set('view engine', 'hbs')               //  to set handlebars (view engine for express)
app.set('views', viewTemplates)             // incase you want to customize default viewing templates

hbs.registerPartials(partialPath)

// setup static directories to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Devashish Mali'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me', 
        name: 'Devashish Mali'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Devashish Mali',
        message: 'Welcome to help page'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'You must provide a address term'
        })
    }

    geocode.geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            res.send({
                error
            })
        }
        else{
            forecast.forecast(latitude, longitude, (error, {weather, temperature} = {}) => {
                if(error){
                    res.send({
                        error
                    })
                }
                else{
                    res.send({
                        address,
                        location,
                        weather,
                        temperature
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// for wide range of url
app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        name: 'Devashish Mali',
        title: 404
    })
})

// for any wild url
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        name: 'Devashish Mali',
        title: 404
    })
})

app.listen(port, () => {
    console.log('Server start listen to port ' + port)
})