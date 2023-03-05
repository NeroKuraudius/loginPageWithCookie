const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const User = require('./models/User.js')

require('./config/mongoose')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.engine('hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')


// 登入頁面
app.get('/', (req, res) => {
  const user = req.cookies.userInfo

  if (!user) {
    return res.render('index')
  } else {
    return res.render('index', { user })
  }
})


// 登入
app.post('/', (req, res) => {
  const { email, password, keepLogin } = req.body
  const warnningMessage = true

  User.findOne({ email: email, password: password })
    .lean()
    .then(user => {
      if (user && keepLogin === 'on') {
        res.cookie('userInfo', user, { maxAge: 60000, httpOnly: true })
        return res.render('index', { user })
      } else if (user) {
        return res.render('index', { user })
      } else {
        return res.render('index', { warnningMessage })
      }
    })
    .catch((error) => console.log(error))
})

app.listen(PORT, () => {
  console.log(`Succeed in listening on http://localhost:${PORT}`)
})