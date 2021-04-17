
const express = require('express');
const path = require('path');
const multer = require('multer');
const redactor = require('./controllers/redactor');
const fileOps = require('./controllers/FileOperations');


const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fileOperations = new fileOps();

app.use("/public", express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render('index.ejs')
});

app.get("/download-file", function(req, res, next) {
    res.download(fileOperations.file);
});

app.get("/results", function(req, res) {
    let jsonOut = {
        'original': fileOperations.originalFileContents,
        'redacted': fileOperations.outFileContents
    }

    res.render('results.ejs', jsonOut);
});

app.post("/redact", upload.single('secretFile'), (req, res, next) => {
    const clearTextFile = req.file;
    const secretWords = req.body.sensitiveWords;

    if (!clearTextFile) {
        const error = new Error('Please upload a file to proceed.');
        error.httpStatusCode = 400;
        return next(error);
    }

    if (!secretWords) {
        const error = new Error('Secret words are required or there is nothing to redact.');
        error.httpStatusCode = 400
        return next(error);
    }

    const multerText = Buffer.from(clearTextFile.buffer).toString("utf-8");
    // Saving a copy of the original so it can be recalled in the final display.
    fileOperations.original = multerText;
    fileOperations.file = redactor.redact(secretWords, multerText);

    res.redirect('/results');
});


module.exports = app;