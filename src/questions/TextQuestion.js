const Question = require('./Question');

class TextQuestion extends Question {
    constructor(id, title) {
        super(id, title);
    }

    generateHTML() {
        return '<p>' + this.title + '<p>,' +
            '\n<input type="text" id="' + this.id + '"/>'
    }
}

module.exports = TextQuestion;