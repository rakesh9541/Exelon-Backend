const File = require('../models/fileModel');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

exports.uploadFile = upload.single('file');

exports.saveFileDetails = async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  
  const { filename, mimetype, size, path: filepath } = req.file;
  const file = new File({
    filename,
    filepath,
    mimetype,
    size,
  });

  try {
    await file.save();
    res.status(201).send({ message: 'File uploaded and saved successfully', file });
  } catch (error) {
    res.status(500).send({ message: 'Error saving file details', error: error.message });
  }
};


exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching files', error: error.message });
  }
};


exports.getOneFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).send('File not found.');

    res.status(200).send(file);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching file', error: error.message });
  }
};


exports.getFileByName = async (req, res) => {
  const filename = req.params.filename;

  try {
    const file = await File.findOne({ filename: filename });
    if (!file) return res.status(404).send('File not found.');
    res.status(200).send(file);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching file', error: error.message });
  }
};
