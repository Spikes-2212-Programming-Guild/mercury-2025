const Question = require('./Question');

class MultipleChoiceQuestion extends Question {
    constructor(id, title, choices) {
        super(id, title);
        this.choices = choices;
    }

    generateHTML() {
        let html = "\n\t<label for="+this.id+"> "+this.title+"</label>\n";
        html += "<select id="+this.id+" class='question' >";
        html += "<option value=''>Choose an Option</option>\n";
        for (let choice of this.choices) {
            html += "<option value='" + choice + "'>" + choice + "</option>\n";
        }
        html += "</select>";
        return html;
    }
}

module.exports = MultipleChoiceQuestion;