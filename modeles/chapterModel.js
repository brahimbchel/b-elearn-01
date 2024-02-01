const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chapterSchema = new Schema({
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    subscribers_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    editers_id:  [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  }],
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
      },
      videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
      }],
      files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
      }],
}, { timestamps: true })

module.exports = mongoose.model('Chapter', chapterSchema)