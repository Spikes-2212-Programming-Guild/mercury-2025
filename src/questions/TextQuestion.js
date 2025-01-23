const Question = require('./Question');

class TextQuestion extends Question {
    constructor(id, title) {
        super(id, title);
    }

    generateHTML() {
        return '\n\t<label>' + this.title + '</label>' +
            '\n\t<input type="text" class="question" id="' + this.id + '" style="outline: 2px solid black"/>'
    }
}
module.exports = TextQuestion;