const connection = require('./model')
const express = require('express')
const app = express()
const handlebars = require('handlebars')
const path = require('path')
const expressHandlebars = require('express-handlebars')
const bodyparser = require('body-parser')
const courseController = require('./controllers/courses')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

app.use(bodyparser.urlencoded({extended: true}))

app.set('views', path.join(__dirname + '/views/'))

app.engine("hbs", expressHandlebars({
    extname: "hbs",
    defaultLayout: "mainlayout",
    layoutsDir: __dirname + "/views/layouts",
    handlebars: allowInsecurePrototypeAccess(handlebars) 
}))

app.set("view engine", "hbs")

app.get('/', (req,res) => {
  //  res.send('<h1>Hello World</h1>')
      res.render("index", {})
})

app.use('/course', courseController)

app.listen(3000,() => {
    console.log('Server started on port 3000')
})
