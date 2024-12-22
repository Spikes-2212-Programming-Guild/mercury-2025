const Question = require('./Question');
class TextQuestion extends Question {
    constructor(type, title, id) {
        super(type, title, id);
    }

    generateHTML() {
        return '<p>' + this.title + '<p>' +
            '\n<input type="text" id=' + this.id + '/>'
    }
}

module.exports = TextQuestion;