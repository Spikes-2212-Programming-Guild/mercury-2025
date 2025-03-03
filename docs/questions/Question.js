import {COLORS, setToLocalStorage} from "../scripts/Config.js";

export class Question {
    constructor(id, title, defaultValue, resetType, pageName) {
        this.id = id;
        this.title = title;
        this.pageName = pageName;
        this.element = null;
        this.resetType = resetType;
        this.defaultValue = defaultValue;
    }

    set value(newValue) {
        this.element.value = newValue;
        this.saveValueAndUpdateUI(newValue);
    }

    get value() {
        return this.element.value;
    }

    set outlineColor(color) {
        this.element.style.outlineColor = color;
    }

    get boundingRect() {
        return this.element.getBoundingClientRect();
    }

    createElement() {
        const container = document.createElement('fieldset');
        container.id = this.id;
        container.classList.add('question');
        const label = document.createElement('label');
        label.textContent = this.title;
        label.style.marginRight = '4%';
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
        this.element.addEventListener('input', () => this.saveValueAndUpdateUI(this.value));
    }

    saveValueAndUpdateUI(newValue) {
        setToLocalStorage(this.id, newValue);
        this.updateOutlineColor();
    }

    updateOutlineColor() {
        this.outlineColor = this.isValid() ? COLORS.VALID : COLORS.INVALID;
    }
}