const express = require('express')
const app = express()
const userModel = require('../models/User')
const jwt = require('jsonwebtoken')

app.post('/index.html', async (req, res) => {

})

app.post('/signup.html', async (req, res) => {
    const user = new userModel(req.body)

    const userExists = await userModel.getUsername(user.username)

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
        message: "User" + user.username + "Created!"
    })
})

app.post('/', async (req, res) => {
    const user = new userModel(req.body)
    const users = await userModel.findOne({username, password})

    if(!user) throw "Email & Password did not match..."

    const token = jwt.sign({id: user.id}, "asdfjkasdf")

    res.json({
        message: "User logged in successfully",
        token
    })
})

module.exports = app