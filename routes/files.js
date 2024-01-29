const express = require('express')
const router = express.Router()

const {
    getAllFiles,
    getFile,
    createFile,
    deleteFile,
    editFile
} = require('../controlers/fileControlers')

router.get('/', getAllFiles)

router.get('/:id', getFile)

router.post('/', createFile)

// Update File
router.patch('/:id', editFile)

router.delete('/:id', deleteFile)

module.exports = router