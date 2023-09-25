const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


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

// logging
app.use(morgan('dev'))

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about blog',
        body: 'more about blog'
    })

    blog.save()
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
      })
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
      })
})

app.get('/single-blog', (req, res) => {
    Blog.findById('6511d7dbbdc0ab19f45e5054')
      .then((result) => {
        res.send(result)
      })
      .catch((err) => {
        console.log(err)
      })
})

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

app.get('/', (req, res) => {
    //res.send('<p>home</p>')
    //res.sendFile('./views/index.html', { root: __dirname })
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res) => {
    //res.send('<p>about</p>')
    res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' })
})

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})