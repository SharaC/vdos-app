const mongoose = require('mongoose')
const mongoURI = process.env.mongoURI || 'mongodb://127.0.0.1:27017/vdos-db'
const connect = mongoose.connect(mongoURI, {
        useNewUrlParser:true,
        useUnifiedTopology: true
})



module.exports = connect

