const Question = require('./Question');

class MultipleChoiceQuestion extends Question {
    constructor(id, title, choices) {
        super(id, title);
        this.choices = choices;
    }

    generateHTML() {
        let html = "\n\t<label for="+this.id+"> "+this.title+"</label>\n";
        html += "\t<select id="+this.id+" class='question' style='outline: 2px solid black'>";
        html += "\t<option value=''>Choose</option>\n";
        for (let choice of this.choices) {
            html += "\t<option value='" + choice + "'>" + choice + "</option>\n";
        }
        html += "\t</select>";
        return html;
    }
}

module.exports = MultipleChoiceQuestion;