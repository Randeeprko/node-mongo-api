const mongoose = require('mongoose')
mongoose.Promise = global.Promise 
mongoose.connect("mongodb://localhost:27017/DummyDatabase",  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
(error) => {
    if(!error)
      console.log("Successfully Connected")
    else
      console.log("Error connecting to database.")  
} )

const Course = require('./course.model')