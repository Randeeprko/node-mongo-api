const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const courseModel = mongoose.model('Course')

router.get('/list', (req,res) => {
    courseModel.find((err, docs) => {
        if(!err)
         {
          console.log(docs)
          res.render("list", {content:"Hello",data: docs})
         }
        else
          res.send("error")   
    })
})

module.exports = router