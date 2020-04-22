const mongoose = require('mongoose')

const schema = {
        courseName : {
            type: String,
            required : [true,'Required field']
        },
        courseId: {
            type: String,
            unique: true
        },
        courseDuration: {
            type: String
        },
        courseFee: {
            type: String
        }
}

let courseSchema = mongoose.Schema(schema,{collection:'Course', timestamps: true})
let courseModel = mongoose.model("Course", courseSchema)









