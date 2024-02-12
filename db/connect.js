const mongoose = require('mongoose')

//Generate connectDB function to connect database first and then run the server (run server logic on app.js)
const connectDB = (url) => {
    return (
        //Data base connection configuration with mongoose. Pass connection config (url), success and error handling (optional).
        mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
    )
}

module.exports = connectDB