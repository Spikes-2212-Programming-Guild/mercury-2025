import {Question} from "./Question.js";
import {RESET_TYPES} from "../config/constants.js";

export class SingleNumberQuestion extends Question {

    constructor(id, title, defaultValue = 0, resetType = RESET_TYPES.CLEAR,
                minValue = 0, maxValue = 3600) {
        super(id, title, defaultValue, resetType);
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    createContainer() {
        const container = super.createBaseContainer();
        container.classList.add('number_question');
        const input = document.createElement('input');
        input.type = 'number';
        container.appendChild(input);
        this.element = input;
        this.addListener();
        return container;
    }
}