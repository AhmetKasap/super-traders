require('express-async-errors')
const express = require('express')
const app = express()
require('dotenv').config()


//! body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//!postgresql connection
const {connectDB} = require('./src/config/db.connection')
connectDB()

//! postgresql assosactions
const {assosaction} = require('./src/config/associations')
assosaction()

//! Rate Limit
const limit = require('./src/middlewares/lib/rateLimit')
//app.use('/api/v1',limit)

//! routes
const routes = require('./src/routes/index.routes')
app.use('/api/v1', routes)

app.use((req,res, next) => {
    res.send('not found url')
    next()
})

const errorHandler = require('./src/middlewares/errorHandler')
app.use(errorHandler)


app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is Running ${process.env.PORT || 5001}`)
})