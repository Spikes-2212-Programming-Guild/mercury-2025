import {setToLocalStorage} from "../scripts/utils/data-manager.js";
import {COLORS, RESET_TYPES} from "../config/constants.js";

export class Question {

    constructor(id, title, defaultValue, resetType = RESET_TYPES.CLEAR) {
        this.id = id;
        this.title = title;
        this.defaultValue = defaultValue;
        this.resetType = resetType;
        this._value = defaultValue;
        this.element = null;
    }

    set value(newValue) {
        this._value = newValue;
        if (this.element) this.element.value = newValue;
        this.saveValueAndUpdateUI(newValue);
    }

    set outlineColor(color) {
        if (this.element) this.element.style.outlineColor = color;
    }

    get value() {
        return this._value;
    }

    get boundingRect() {
        return this.element?.getBoundingClientRect();
    }

    createBaseContainer() {
        const container = document.createElement('fieldset');
        container.id = this.id;
        container.classList.add('question');

        const label = document.createElement('label');
        label.textContent = this.title;
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
        return container;
    }

    isValid() {
        const value = this.value;
        return value !== null && value !== '' && value !== undefined;
    }

    clear() {
        this.value = this.defaultValue;
    }

    addListener() {
        this.element.addEventListener('input',
            () => this.saveValueAndUpdateUI(this.element.value));
    }

    saveValueAndUpdateUI(newValue) {
        setToLocalStorage(this.id, newValue);
        this.updateOutlineColor();
    }

    updateOutlineColor() {
        this.outlineColor = this.isValid() ? COLORS.VALID : COLORS.INVALID;
    }
}
