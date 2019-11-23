const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const chalk = require('chalk')


app = express()

//defining paths for express config
const PublicDirPath = path.join(__dirname, '../public')
const ViewsDirPath = path.join(__dirname, '../templates/views')
const ParitalDirPath = path.join(__dirname, '../templates/partials')

//set handlecar engine and views location
app.set('view engine', 'hbs');
app.set('views', ViewsDirPath)
hbs.registerPartials(ParitalDirPath)

//setting static directory to use
app.use(express.static(PublicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        body: 'Home page',
        name: 'Divakar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        body: 'about page',
        name: 'Divakar'
    })
})

app.get('/help', (req, res) => {
    res.render('about', {
        title: 'Help',
        body: 'Help page',
        name: 'Divakar'
    })
})

app.get('/weather', (req, res) => {
    const searchaddress = req.query.address
    if (!searchaddress) {
        return res.send({
            error: 'please enter the address'
        })
    }
    geocode(searchaddress, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, { data: forecastData } = {}) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecastData,
                location,
                address: searchaddress
            })

            // console.log(chalk.green.bold(location))
            // console.log(chalk.magenta.bold(forecastData))
        })
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        name: 'Divakar',
        title: '404 Page',
        error: 'Page not found'
    })

})

app.listen(3000, () => {
    console.log("Server stared at 3000 port")
})