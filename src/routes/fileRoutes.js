const express = require('express');
const { uploadFile, saveFileDetails, getAllFiles, getOneFile, getFileByName } = require('../controllers/fileController');
const router = express.Router();

router.post('/upload', uploadFile, saveFileDetails);
router.get('/files', getAllFiles);
router.get('/files/:id', getOneFile);
router.get('/files/name/:filename', getFileByName);

module.exports = router;
