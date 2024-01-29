const mongoose = require('mongoose')
const File = require('../modeles/fileModel')

const getAllFiles = async (req, res) => {
  try {
    const files = await File.find({}).sort({ createdAt: -1 });
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFile = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid file ID' });
    }

    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createFile = async (req, res) => {
  const { chapter_id, title, file_url, description } = req.body;

  if (!chapter_id || !title || !file_url) {
    return res.status(400).json({ error: 'Chapter ID, Title, and File URL are required' });
  }

  try {
    const file = await File.create({
      chapter_id,
      title,
      file_url,
      description,
    });
    res.status(201).json(file);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteFile = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid file ID' });
    }

    const file = await File.findOneAndDelete({ _id: id });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const editFile = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid file ID' });
    }

    const file = await File.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllFiles,
  getFile,
  createFile,
  deleteFile,
  editFile,
};
