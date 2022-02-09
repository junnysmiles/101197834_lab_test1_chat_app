const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const mongoose = require('mongoose')
const wsPORT = 8181
const dbPORT = 8080

const user = require('./models/User')
const msg = require('./models/Message')
const userRouter = require('./routes/UserRoutes')

// Create Server Socket
const io = require('socket.io')(http)

// Use public folder to access files in there
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect MongoDB Database
mongoose.connect('mongodb+srv://junnysmiles:junny1234@fullstack.xy5fk.mongodb.net/chat-it-up-app?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Mongodb connection successful!')
}).catch(err => {
    console.log('MongoDB Connection ERROR...')
})

app.use(userRouter)

users = []

io.on('connection', (socket) => {
    // Welcome Current User
    socket.emit('message', 'Welcome to Chat It Up!')

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat...')

    // Shows when user disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat!')
    })

    socket.on('newMessage', msg => {
        const message = new msg({ msg })
        message.save().then(() => {
            io.emit('message', message)
        })
    })
})

// Listen socket server
http.listen(wsPORT, () => {
    console.log(`Web Socket Server started at ${wsPORT}...`)
})

// Listen MongoDB server
app.listen(dbPORT, () => { console.log(`MongoDB Server started at ${dbPORT}...`) });