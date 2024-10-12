const express = require('express')
const app = express()
require('dotenv').config()


//! body-parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//!postgresql connection
const {connectDB} = require('./src/config/db.connection')
connectDB()

//! routes
const routes = require('./src/routes/index.routes')
app.use('/api/v1', routes)



app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is Running ${process.env.PORT || 5001}`)
})