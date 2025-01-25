import { Question } from './Question';

export class MultipleChoiceQuestion extends Question {

    static type = 'choices'

    constructor(id, title, choices) {
        super(id, title);
        this.choices = choices;
    }

    getElement() {
        const docTitle = document.createElement('label');
        docTitle.innerHTML = this.title;
        // Create the select element
        const select = document.createElement('select');
        select.setAttribute('id', this.id);
        select.setAttribute('class', 'question');
        select.style.outline = '2px solid black';

        // Add the default "Choose" option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Choose';
        select.appendChild(defaultOption);

        // Add options from this.choices
        for (let choice of this.choices) {
            const option = document.createElement('option');
            option.value = choice;
            option.textContent = choice;
            select.appendChild(option);
        }
        docTitle.appendChild(select);
        return docTitle;
    }
}
