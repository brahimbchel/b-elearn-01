require('dotenv').config()
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()
const dbConnect = require("./config/dbConfig").mongoURI;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true,  
  }))

app.use(cookieParser())

const PORT = process.env.PORT || 5000

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/chapters', require('./routes/chapters'))
app.use('/api/users', require('./routes/users'))
app.use('/api/vidios', require('./routes/videos'))
app.use('/api/files', require('./routes/files'))
app.use('/auth', require('./routes/authRoute'))

// connect to db
mongoose.connect(dbConnect)
    .then(() => {
        app.listen(PORT, () => {
            console.log('connected to mongodb')
            console.log(`Listining on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
