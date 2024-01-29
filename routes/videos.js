const express = require('express')
const router = express.Router()

const { 
    createVideo, 
    deleteVideo, 
    editVideo, 
    getAllVideos, 
    getVideo 
} = require("../controlers/videoControlers")

router.get('/', getAllVideos)

router.get('/:id', getVideo)

router.post('/', createVideo)

// Update Video
router.patch('/:id', editVideo)

router.delete('/:id', deleteVideo)

module.exports = router