const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')

app.post('/signup.html', async (req, res) => {
    const {username, firstname, lastname, password} = req.body
    const user = new User({ username, firstname, lastname, password })

    const userExists = await User.findOne({ username })

    if (userExists) throw "User with this Username is already registered!"

    try {
        await user.save((err) => {
          if(err) {
            res.send(err)
          }else {
            res.send(user);
          }
        });
    } catch(err) {
        res.status(500).send(err);
    }

    res.json({
        message: "User" + username + "Created!"
    })
})

app.post('/', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username, password })

    if(!user) throw "Email & Password did not match..."

    const token = jwt.sign({id: user.id}, "asdfjkasdf")

    res.json({
        message: "User logged in successfully",
        token
    })
})

module.exports = app