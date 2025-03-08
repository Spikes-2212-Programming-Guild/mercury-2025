import {Question} from "./Question.js";

export class SingleNumberQuestion extends Question {

    isValid() {
        return super.isValid() && this.value >= 1 && this.value <= 100; // need to be fixed (add a min and max)
    }

    clear() {
        this.value = this.defaultValue || 0;
    }

    createElement() {
        const container = super.createElement();
        container.classList.add('number_question');
        const input = document.createElement('input');
        input.type = 'number';
        container.appendChild(input);
        this.element = input;
        this.addListener();
        return container;
    }
}