const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

require('./congif/mongoose')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))

app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`Succeed in listening on http://localhost:${PORT}`)
})