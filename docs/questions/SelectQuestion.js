import {Question} from "./Question.js";
import {getFromLocalStorage} from "../scripts/data-manager.js";

export class SelectQuestion extends Question {
    constructor() {
        super();
        this.buttonMap = new Map();
        this._value = getFromLocalStorage(this.id) || this.defaultValue;
    }

    set value(newValue) {
        this._value = newValue;
        this.buttonMap.forEach(btn => btn.classList.remove('selected'));
        this.buttonMap.get(newValue)?.classList.add('selected');
        this.saveValueAndUpdateUI(newValue);
    }

    get value() {
        return this._value;
    }

    createElement() {
        const container = super.createElement();
        container.classList.add('select_question');
        const buttonContainer = document.createElement('div');

        this.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = button.value = choice;
            button.classList.add(`${this.id}_button`);

            this.buttonMap.set(choice, button);
            if (this._value === choice) button.classList.add('selected');

            button.addEventListener('click', () => (this.value = choice));
            buttonContainer.appendChild(button);
        });

        container.appendChild(buttonContainer);
        this.element = buttonContainer;
        return container;
    }
}