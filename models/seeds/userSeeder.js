const mongoose = require('mongoose')
const User = require('../User')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman',
    profile: 'https://cdn.marvel.com/content/1x/002irm_ons_crd_03.jpg'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday',
    profile: 'https://cdn.marvel.com/content/1x/003cap_ons_crd_03.jpg'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram',
    profile: 'https://cdn.marvel.com/content/1x/005smp_ons_crd_02.jpg'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!',
    profile: 'https://cdn.marvel.com/content/1x/011blw_ons_crd_04.jpg'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password',
    profile: 'https://cdn.marvel.com/content/1x/hawkeye_ons_crd_01.jpg'
  }
]


mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection
db.once('open', () => {
  console.log('MongoDB connected!')

  User.create(users)
    .then(() => {
      db.close()
    })
    .catch(error => console.log(error))
})
