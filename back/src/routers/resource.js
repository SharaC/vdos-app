const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Resource = require('../models/resource')
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const crypto = require('crypto')
const mongoURI = process.env.mongoURI || 'mongodb://127.0.0.1:27017/vdos-db'
const connect = require('../db/mongoose')

connect.then(() => {
    console.log('Connected to database!');
  }, (err) => console.log(err));

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err)
                }
                
                const filename = buf.toString('hex')
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                }
                resolve(fileInfo)
            })
        })
    }
})

let gfs
mongoose.connection.once('open', () => {
gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "uploads"
    })
})

const upload = multer({ storage })


    router.post('/resources/upload', upload.fields([{name:'video'},{name:'preview'}]), async (req, res, next) => {
            const newResource = new Resource({
                filename: req.body.title,
                author: req.body.author,
                fileId: req.files['video'][0].id,
                previewId : req.files['preview'][0].id
            })

            newResource.save()
                .then((resource) => {

                    res.redirect('back');
                })
                .catch(err => res.status(500).json(err))
        })


    router.get('/resources',(req, res, next) => {
            gfs.find().toArray((err, resources) => {
                if (!resources || resources.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No Resources available'
                    })
                }

                res.status(200).json({
                    success: true,
                    resources,
                })
            })
        })


    router.get('/resources/:fileId', (req, res, next) => {
        const fileId = new mongoose.mongo.ObjectId(req.params.fileId);
            gfs.find({ _id:fileId }).toArray((err, resources) => {
                if (!resources[0] || resources.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No resources available',
                    })
                }

                res.status(200).json({
                    success: true,
                    resource: resources[0],
                })
                //res.status(200).sendFile(__dirname + '/test.html')
            })
        })


    router.get('/download/:fileId', (req, res, next) => {        
        const fileId = new mongoose.mongo.ObjectId(req.params.fileId);
        gfs.find({ _id:fileId }).toArray((err, resources) => {
            if (!resources[0] || resources.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: 'No files available',
                })
            }
            res.setHeader('Content-disposition', `attachment; filename=${resources[0].filename}.mp4`);
            res.set('Content-Type', 'video/mp4');
            gfs.openDownloadStream(fileId).pipe(res)
                
        })

    })

    router.patch('/resources/:fileId', (req, res, next) => { 
        console.log(req.params.fileId)
        const query = {fileId: req.params.fileId}  
        Resource.findOneAndUpdate(query, {ranking: parseInt(req.query.ranking)}, {
            returnOriginal: false })
        .then(() => {
            res.status(200)
        })
        .catch(err => res.status(500).json(err))
    })

    
    router.get('/search/:searchTerm', async (req, res, next) => {
        const skip = parseInt(req.query.skip)
        const limit = parseInt(req.query.limit)
        const results = await Resource.find({ $or:[
            {'author':{$regex: req.params.searchTerm, $options:'i'}},
            {'filename':{$regex: req.params.searchTerm, $options:'i'}} ]}).skip(skip).limit(limit).exec();
        console.log(results)
                res.status(200).json({
                    success: true,
                    result: results,
                })
            }, (error, req, res, next) => {
            res.status(400).send({ error: error.message })
        })

    router.get('/recent', async (req, res, next) => {
        const skip = parseInt(req.query.skip)
        const limit = parseInt(req.query.limit)
        Resource.find({}, {}, { sort: { 'createdAt': -1 } }).skip(skip).limit(limit)
                .then((resource) => {
                    res.status(200).json({
                        success: true,
                        resource,
                    });
                })
                .catch(err => res.status(500).json(err));
        });

    module.exports = router