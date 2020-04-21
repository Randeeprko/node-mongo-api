const mongoose = require('mongoose'); 
mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/MultiplexDB', {useNewUrlParser: true, useUnifiedTopology: true}, 
                  (error) => {if(!error)  console.log("success")}); 

mongoose.set('useCreateIndex',true);
const schema = {
    "movieId": {
        required: [true, 'Required field'],
        type: Number,
        unique:true
    },
    "movieName": {
        required: [true, 'Required field'],
        type: String
    },
    "language": {
        required: [true, 'Required field'],
        match: [/^[A-Za-z]{3,8}$/,'Please enter only alphabets'],
        type: String
    },
    "showDetails": {
        type: [
            {
                "showId": {
                    required: [true, 'Required field'],
                    type: Number
                },
                "movieId": {
                    required: [true, 'Required field'],
                    type: Number
                },
                "fare": {
                    required: [true, 'Required field'],
                    type: Number
                },
                "availableSeats": {
                    required: [true, 'Required field'],
                    type: Number
                },
                "showDate": {
                    required: [true, 'Required field'],
                    type: Date,
                    validate: [(showDate) => new Date(showDate) >= new Date(), 'Date should be greater than today']
                }
            }
        ],
        default: []
    },
    "bookings": {
        type: [
            {
                "bookingId": {
                    required: [true, 'Required field'],
                    type: Number
                },
                "customerName": {
                    type: String,
                    default: "New User"
                },
                "bookingCost": {
                    required: [true, 'Required field'],
                    type: Number
                },
                "showId": {
                    required: [true, 'Required field'],
                    type: Number
                },
                "noOfTickets": {
                    type: Number,
                    min: [1, 'Minimum 1 ticket'],
                },
                "bookedAt": {
                    type: Date,
                    default: new Date().toLocaleDateString()
                }
            }
        ],
        default: []
    }
}

let movieSchema = mongoose.Schema(schema , { collection: 'Movie' , timestamps: true }); //Line 1

let movieModel = mongoose.model("Movie", schema)

var movie = {}

//movie.addMovie = function(movieObj){
  //  return movieModel.create(movieObj).then((insertedData) => {
    //    if(insertedData)
      //     return insertedData
       // let err = new Error("Data not inserted")
       // err.status = 500
       // throw err   
    //})
//}

//let obj = {
  //  movieId: 2001,
   // movieName: "Avengers",
   // language: "English"
//}

//movie.addMovie(obj)
//.then((data) => {
  //  console.log(data)
//})
//.catch((err) => {
 //   console.log(err.message)
//})

var movie = {}
movie.multipleInsert = function (movieObj) {
    return movieModel.insertMany(movieObj).then((insertedData) => {
        if (insertedData) {
            return insertedData
        }
        else {
            let err = new Error("Data not inserted")
            err.status = 500
            throw err;
        }
    })
}
let obj = [{
    movieId: 2002,
    movieName: "Justice League",
    language: "English"
}, {
    movieId: 2003,
    movieName: "Swordfish",
    language: "English"
}]
movie.multipleInsert(obj).then((data) => {
    console.log(data)
}).catch((err) => {
    console.log(err.message)
})
 
movie.find = () => {
    return movieModel.find().then((movieData) => {
        if (movieData) { return movieData }
        else {
            let err = new Error("No record found")
            err.status = 404
            throw err;
        }
    })
}
movie.find().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err.message);
})
 
//Find movies based on id
movie.getMovie = (movieId) => {
    return movieModel.findOne({ movieId: movieId }).then((movieDetails) => {
        if (movieDetails) { return movieDetails }
        else {
            let err = new Error("No record found")
            err.status = 404
            throw err;
        }
    })
}
movie.getMovie(2002).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err.message);
})


//Find movies based on id and return specific values
movie.getMovie = (movieId) => {
    return movieModel.findOne({ movieId: movieId }, { _id: 0, movieName: 1, language: 1 }).then((movieDetails) => {
        if (movieDetails) { return movieDetails }
        else {
            let err = new Error("No record found")
            err.status = 404
            throw err;
        }
    })
}
movie.getMovie(2002).then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err.message);
})

//Update details
movie.addShows = (showObj)=>{
    return movieModel.updateOne({movieId:2002},{$push:{showDetails:showObj}},{runValidators:true})
    .then((updatedData) =>{
        if(updatedData){
            return updatedData
        }
        else{
            let err = new Error("Data not updated")
            err.status = 500
            throw err;
        }
    })
}
let showObj = {
    showId:102,
    fare:180,
    availableSeats:20,
    showDate:'2019-02-16',
}
movie.addShows(showObj).then(data =>{
    console.log(data)
}).catch(err=>{
    console.log(err.message)
})

//Delete details based on movie name
movie.removeShow = (movie) => {
    return movieModel.deleteOne({ movieName: movie })
        .then((deletedData) => {
            if (deletedData) {
                return deletedData
            }
            else {
                let err = new Error("Could not delete data")
                err.status = 500
                throw err;
            }
        })
}
movie.removeShow('Justice League').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err.message)
})

