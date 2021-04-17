
function redact(secretWords, clearText) {
    const delimiters = /[, .]+/;

    secretWords = secretWords.split(delimiters);
    let substitute = 'XXXXXXXXX';

    for (let word of secretWords) {
        clearText = clearText.replace(new RegExp(word, 'g'), substitute);
    }
    return clearText;
}

module.exports.redact = redact;