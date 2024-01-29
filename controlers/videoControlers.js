const mongoose = require('mongoose')
const Video = require('../modeles/videoModel')

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: -1 })
    res.status(200).json(videos)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getVideo = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid video ID' })
    }

    const video = await Video.findById(id)

    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }

    res.status(200).json(video)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createVideo = async (req, res) => {
  const { chapter_id, title, video_url, duration, description } = req.body

  if (!chapter_id || !title || !video_url || !duration) {
    return res.status(400).json({ error: 'All Field are required' })
  }

  try {
    const video = await Video.create({
        chapter_id,
        title,
        video_url,
        duration,
        description,
    })
    res.status(201).json(video)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteVideo = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid video ID' })
    }

    const video = await Video.findOneAndDelete({ _id: id })

    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }

    res.status(200).json(video)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const editVideo = async (req, res) => {
  const { id } = req.params

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid video ID' })
    }

    const video = await Video.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    )

    if (!video) {
      return res.status(404).json({ error: 'Video not found' })
    }

    res.status(200).json(video)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllVideos,
  getVideo,
  createVideo,
  deleteVideo,
  editVideo,
}

