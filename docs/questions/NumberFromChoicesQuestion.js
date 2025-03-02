import {Question} from "./Question.js";

export class NumberFromChoicesQuestion extends Question {
    constructor(id, title, defaultValue, resetType, pageName, choices) {
        super(id, title, defaultValue, resetType, pageName);
        this.choices = choices;
    }

    isValid() {
        return super.isValid() && this.choices.includes(parseInt(this.value));
    }

    createElement() {
        const container = super.createElement();
        container.classList.add('number_from_choices_question');

        // Create input field
        const input = document.createElement('input');
        input.type = 'number';
        input.setAttribute('list', this.id + '_input');

        // Create datalist
        const datalist = document.createElement('datalist');
        datalist.id = this.id + '_input';

        this.choices.forEach(choice => {
            const option = document.createElement('option');
            option.value = choice;
            option.textContent = choice;
            datalist.appendChild(option);
        });

        container.appendChild(input);
        container.appendChild(datalist);
        this.element = input;
        this.addListener();
        return container;
    }
}