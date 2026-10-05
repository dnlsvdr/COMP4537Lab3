const fs = require('fs');

class FileManager {
    appendText(filename, text, callback){
        fs.appendFile(filename, `${text}\n`, callback);
    }

    readFile(filename, callback){
        fs.readFile(filename, 'utf8', callback);
    }
}

module.exports = FileManager;