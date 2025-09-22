import {Question} from "./Question.js";
import {RESET_TYPES} from "../config/constants.js";

export class CounterQuestion extends Question {

    constructor(id, title, defaultValue = 0, resetType = RESET_TYPES.CLEAR,
                minValue = 0, maxValue = 3600) {
        super(id, title, defaultValue, resetType);
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    isValid() {
        return super.isValid() && this.value <= this.maxValue && this.value >= this.minValue;
    }

    clear() {
        this.value = this.defaultValue;
    }

    set value(newValue) {
        this._value = parseInt(newValue, 10) || 0;
        if (this.element) this.element.textContent = this._value.toString();
        this.saveValueAndUpdateUI(this._value);
    }

    get value() {
        return this._value;
    }

    increment() {
        if (this.value < this.maxValue) this.value++;
    }

    decrement() {
        if (this.value > this.minValue) this.value--;
    }

    createContainer() {
        const container = super.createBaseContainer();
        container.classList.add('counter_question');

        const numberLabel = document.createElement('span');
        numberLabel.classList.add('counter_question_number');
        numberLabel.textContent = this._value.toString();
        this.element = numberLabel;

        const decrementButton = document.createElement('button');
        decrementButton.textContent = '-';
        decrementButton.addEventListener("click", () => this.decrement());

        const incrementButton = document.createElement('button');
        incrementButton.textContent = "+";
        incrementButton.addEventListener("click", () => this.increment());

        const buttonContainer = document.createElement('div');
        buttonContainer.appendChild(decrementButton);
        buttonContainer.appendChild(numberLabel);
        buttonContainer.appendChild(incrementButton);
        container.appendChild(buttonContainer);

        this.updateOutlineColor();
        return container;
    }
}
