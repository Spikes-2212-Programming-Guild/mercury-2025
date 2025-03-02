import {Question} from "./Question";

class TextboxQuestion extends Question {

    isValid() {
        return this.value.length < 250;
    }

    clear() {
        this.value = this.defaultValue || '';
    }

    createElement() {
        const container = super.createElement();
        container.classList.add('textbox_question');
        const textarea = document.createElement('textarea');
        textarea.maxLength = 250;
        container.appendChild(textarea);
        this.element = textarea;
        this.addListener();
        return container;
    }
}