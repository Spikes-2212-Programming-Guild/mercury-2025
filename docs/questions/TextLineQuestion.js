import {Question} from "./Question";

export class TextLineQuestion extends Question {

    isValid() {
        const value = this.value;
        return super.isValid() && value.length > 0 && value.length < 20;
    }

    createElement() {
        const container = super.createElement();
        container.classList.add('line_question');
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 20;
        container.appendChild(input);
        this.element = input;
        this.addListener();
        return container;
    }
}