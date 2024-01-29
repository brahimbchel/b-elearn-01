const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fileSchema = new Schema({
  chapter_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  file_url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true })

module.exports = mongoose.model('File', fileSchema)