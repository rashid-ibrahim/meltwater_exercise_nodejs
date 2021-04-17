
fs = require('fs');

class FileOperations {
    constructor() {
        this.outFile = 'redacted.txt';
        this.filePath = './public/out_files'
        this.inFile = 'original.txt';
    }

    set original(inText) {
        fs.writeFile(this.#path_maker(this.inFile), inText, function (err) {
            if (err) return console.log(err);
            console.log('File written successfully!');
        });
    }

    get original() {
        return this.#path_maker(this.inFile);
    }

    set file(outText) {
        fs.writeFile(this.#path_maker(this.outFile), outText, function (err) {
            if (err) return console.log(err);
            console.log('File written successfully!');
        });
    }

    get file() {
        return this.#path_maker(this.outFile);
    }

    get outFileContents() {
        return FileOperations.#read_file(this.#path_maker(this.outFile));
    }

    get originalFileContents() {
        return FileOperations.#read_file(this.#path_maker(this.inFile));
    }

    static #read_file(file_location){
        return fs.readFileSync(file_location, 'utf8');
    }

    #path_maker(file) {
        return (this.filePath + '/' + file);
    }
}

module.exports = FileOperations;