const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const courseModel = mongoose.model('Course')

router.get('/add', (req,res) => {
    res.render("add-course",{})
})
router.post('/add',(req,res) => {
   courseModel.create(req.body).then((insertedData) => {
        if (insertedData) {
            console.log(req.body)
            res.redirect('/course/list')
        }
        else {
            let err = new Error("Data not inserted")
            err.status = 500
            throw err;
        }
    }).catch(err => {
        res.send(err.message)
    })
})
router.get('/list', (req,res) => {
    courseModel.find((err, docs) => {
        if(!err)
         {
          console.log(docs)
          res.render("list", {data: docs})
         }
        else
          res.send("error")   
    })
})

module.exports = router