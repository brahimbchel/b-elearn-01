const mongoose = require('mongoose')

const Schema = mongoose.Schema

const videoSchema = new Schema({
    chapter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chapter',
        required: true,
    },
      title: {
        type: String,
        required: true,
    },
      video_url: {
        type: String,
        required: true,
    },
      duration: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
      },
}, { timestamps: true })

module.exports = mongoose.model('Video', videoSchema)