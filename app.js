const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


// express app
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://aliSha:toptop6565OP@atlascluster.a6c0vq8.mongodb.net/';
mongoose.connect(dbURI)
  .then((res) => app.listen(3000))
  .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static file
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
// logging
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('new request made:')
    console.log('host: ', req.hostname)
    console.log('path: ', req.path)
    console.log('method: ', req.method)
    next()
})

app.use((req, res, next) => {
    console.log('new request made:')
    next()
})

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

// blog routes
app.use('/blogs/', blogRoutes)

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})