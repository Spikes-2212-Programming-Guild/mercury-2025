import {Question} from "./Question.js";

export class CounterQuestion extends Question {

    isValid() {
        const value = this.value;
        return super.isValid() && value <= 32767 && value >= 0;
    }

    clear() {
        this.value = this.defaultValue || 0;
    }

    set value(newValue) {
        this.element.textContent = String(newValue);
        this.saveValueAndUpdateUI(newValue);
    }

    get value() {
        return parseInt(this.element.textContent);
    }

    createElement() {
        const container = super.createElement();
        container.classList.add('counter_question');

        const numberLabel = document.createElement('label');
        numberLabel.classList.add('counter_question_number');
        numberLabel.type = 'number';
        this.element = numberLabel;

        const decrementButton = document.createElement('button');
        decrementButton.textContent = '-';
        decrementButton.onclick = () => {
            if (this.value <= 0 || this.value <= this.defaultValue) return;
            this.value = this.value - 1;
        };

        const incrementButton = document.createElement('button');
        incrementButton.textContent = "+";
        incrementButton.onclick = () => {
            this.value = this.value + 1;
        };

        const buttonContainer = document.createElement('div');
        buttonContainer.appendChild(decrementButton);
        buttonContainer.appendChild(numberLabel);
        buttonContainer.appendChild(incrementButton);
        container.appendChild(buttonContainer);
        return container;
    }
}
