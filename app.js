const express = require('express')
const app = express()



//!postgresql connection
const dbConnection = require('./config/db.connection')
dbConnection()

app.get('/', (req,res) => {
    
})

app.listen(3000, () => {
    console.log("server is running...")
})