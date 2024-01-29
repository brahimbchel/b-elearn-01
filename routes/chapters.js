const express = require('express')
const router = express.Router()

const {
    getAllChapters,
    getChapter,
    createChapter,
    deleteChapter,
    editChapter,
  } = require('../controlers/chapterControlers')

router.get('/', getAllChapters)

router.get('/:id', getChapter)

router.post('/', createChapter)

// Update Chapter
router.patch('/:id', editChapter)

router.delete('/:id', deleteChapter)

module.exports = router