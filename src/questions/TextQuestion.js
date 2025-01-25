const Question = require('./Question');

class TextQuestion extends Question {
    constructor(id, title) {
        super(id, title, "text");
    }

    render() {
        const input = document.createElement('input');
        input.setAttribute('type', this.type);
        input.setAttribute('class', 'question');
        input.setAttribute('id', this.id);
        input.style.outline = '2px solid black';
    }
}
module.exports = TextQuestion;