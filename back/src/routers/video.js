const express= require('express')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const Video = require('../models/video')
require('../db/mongoose')


router.get('/videos', (req, res) => {
    Video.find({}).then((videos) => {
        res.send(videos)
    }).catch((e) => {
        res.status(500).send(e)
    })
    
})

router.get('/videos/:id', (req, res) => {
    const _id = req.params.id
    Video.findById(_id).then((video) => {
        if(!video){
            return res.status(404).send()
        }
        res.send(video)
    }).catch((e) => {
        res.status(500).send(e)
    })
    
})


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|PNG)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/video/preview', upload.single('preview'), async(req, res) => {
    const video = new Video(JSON.parse(req.body.video))
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.preview = buffer
    video.preview = req.preview
    await video.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/videos/:id/preview', async(req, res) => {
    try {
        const video = await Video.findById(req.params.id)

        if (!video || !video.preview) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(video.preview)
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router