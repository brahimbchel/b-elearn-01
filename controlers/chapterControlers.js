const mongoose = require('mongoose')
const Chapter = require('../modeles/chapterModel')

const getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({}).sort({ createdAt: -1 })
    res.status(200).json(chapters)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getChapter = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid chapter ID' })
    }

    const chapter = await Chapter.findById(id)

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' })
    }

    res.status(200).json(chapter)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createChapter = async (req, res) => {
  const { teacher_id, title, description, subscribers_id , editers_id , videos , files } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Title are required' })
  }

  try {
    const chapter = await Chapter.create({
      teacher_id,
      subscribers_id,
      editers_id,
      title,
      description,
      videos: [],
      files: [],
    })
    res.status(201).json(chapter)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteChapter = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid chapter ID' })
    }

    const chapter = await Chapter.findOneAndDelete({ _id: id })

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' })
    }

    res.status(200).json(chapter)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const editChapter = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid chapter ID' })
    }

    const chapter = await Chapter.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    )

    if (!chapter) {
      return res.status(404).json({ error: 'Chapter not found' })
    }

    res.status(200).json(chapter)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllChapters,
  getChapter,
  createChapter,
  deleteChapter,
  editChapter,
}

