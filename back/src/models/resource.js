const mongoose = require('mongoose')

const resourceSchema = new mongoose.Schema({
       fileId: {
        type: String,
    },filename:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    ranking:{
        type: Number,
        default: 0
    },
    previewId: {
        type: String
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    }
});

resourceSchema.index({filename:1, author:1},{unique: true})

const Resource = mongoose.model('Resource', resourceSchema)

module.exports = Resource