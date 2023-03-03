const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const User = require('./models/User.js')

require('./config/mongoose')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))

app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// 登入頁面
app.get('/', (req, res) => {
  res.render('index')
})

// 登入
app.post('/', (req, res) => {
  const { email, password } = req.body
  const warnningMessage = true

  User.findOne({ email: email, password: password })
    .lean()
    .then(user => {
      if (user) {
        res.render('index', { user })
      } else {
        res.render('index', { warnningMessage })
      }
    })
    .catch((error) => console.log(error))
})

app.listen(PORT, () => {
  console.log(`Succeed in listening on http://localhost:${PORT}`)
})