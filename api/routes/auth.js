const router = require('express').Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
const { isAuthenticated } = require('../auth')

const signToken = (_id) => {
  return jwt.sign({ _id }, 'mi-secreto', {
    expiresIn: 60 * 60 * 24 * 365,
  })
}

router.get('/me', isAuthenticated, (req, res) => {
  return res.send(req.user)
})

router.post('/register', (req, res) => {
  const {email, password} = req.body

  crypto.randomBytes (16, (err, rawSalt) => {
    if (err) {
      return res.send ('Error generating random string.')
    }

    const salt = rawSalt.toString ('base64')
    crypto.pbkdf2 (password, salt, 10000, 64, 'sha1', (err, key) => {
      if (err) {
        return res.send ('Error generating encrypted key.')
      }

      const encryptedPassword = key.toString ('base64')

      Users.findOne ({email}).exec ()
        .then (user => {
          if (user) {
            return res.send ('The User does already exists.')
          }

          Users.create ({
            email,
            password: encryptedPassword,
            salt
          })
            .then (() => res.send ('User created successfully.'))
        })
    })
  })
})


router.post('/login', (req, res) => {
  const { email, password } = req.body

  Users.findOne({ email }).exec()
    .then(user => {
      if (!user) {
        return res.send ('Error generating encrypted key.')
      }

      crypto.pbkdf2 (password, user.salt, 10000, 64, 'sha1', (err, key) => {
        if (err) {
          return res.send('')
        }

        const encryptedPassword = key.toString('base64')

        if (user.password === encryptedPassword) {
          const token = signToken(user._id)
          return res.send({ token })
        }

        return res.send('User or password are incorrect.')
      })
    })
})

module.exports = router
