const Question = require('./Question');

class TextQuestion extends Question {
    constructor(id, title) {
        super(id, title);
    }

    generateHTML() {
        return '\n\t<p>' + this.title + '<p>' +
            '\n\t<input type="text" class="question" id="' + this.id + '"/>'
    }

    isValid(text) {
        return text.length > 0;
    }
}

module.exports = TextQuestion;