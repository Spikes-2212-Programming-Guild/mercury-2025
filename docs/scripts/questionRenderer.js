import {getFromLocalStorage, setToLocalStorage} from "./utils.js";

export const questionRenderers = {
    'TextBox': renderTextBox,
    'Radio': renderRadio,
    'AutoCompleteRadio': renderAutoCompleteRadio,
    'ScoreBox': renderScoreBox,
    'CommentBox': renderCommentBox
};

function renderCommentBox(jsonQuestionData) {
    let textarea = document.getElementById(jsonQuestionData.id);
    if (textarea) {
        textarea.value = getFromLocalStorage(jsonQuestionData.id);
        return null;
    }

    if (!textarea) {
        textarea = document.createElement('textarea');
        textarea.id = jsonQuestionData.id;

        textarea.addEventListener("input", e => {
            setToLocalStorage(jsonQuestionData.id, textarea.value);
        });
    }

    textarea.value = getFromLocalStorage(jsonQuestionData.id);
    return textarea;
}

function renderScoreBox(jsonQuestionData) {
    let input = document.getElementById(jsonQuestionData.id);
    if (input) {
        input.value = getFromLocalStorage(jsonQuestionData.id);
        return null;
    }

    const container = document.createElement('div');
    input = document.createElement('input');
    input.type = 'number';
    input.id = jsonQuestionData.id;
    input.min = jsonQuestionData.minValue || 0;
    input.max = jsonQuestionData.maxValue || 100; // TODO - replace with const
    const saveValue = () => setToLocalStorage(jsonQuestionData.id, input.value);
    input.addEventListener("input", saveValue);

    const decButton = document.createElement('button');
    decButton.textContent = '-';
    decButton.addEventListener("click", () => input.stepDown(1));
    decButton.addEventListener("click", saveValue);

    const incButton = document.createElement('button');
    incButton.textContent = "+";
    incButton.addEventListener("click", () => input.stepUp(1));
    incButton.addEventListener("click", saveValue);

    container.appendChild(decButton);
    container.appendChild(input);
    container.appendChild(incButton);

    input.value = getFromLocalStorage(jsonQuestionData.id);
    return container;
}

function renderAutoCompleteRadio(jsonQuestionData) {
    let input = document.getElementById(jsonQuestionData.id);
    if (input) {
        input.value = getFromLocalStorage(jsonQuestionData.id);
        return null;
    }

    input = document.createElement('input');
    input.type = 'number';
    input.id = jsonQuestionData.id;
    input.value = getFromLocalStorage(jsonQuestionData.id);
    input.addEventListener("input",
        () => setToLocalStorage(jsonQuestionData.id, input.value));

    const name = jsonQuestionData.id + '-input';
    input.setAttribute('list', name);

    const datalist = document.createElement('datalist');
    datalist.id = name;

    for (const c of jsonQuestionData.choices) {
        const option = document.createElement('option');
        option.value = c;
        option.textContent = c;
        datalist.appendChild(option);
    }

    input.appendChild(datalist);
    return input;
}

function renderRadio(jsonQuestionData) {
    let radio = document.getElementById(jsonQuestionData.id);
    if (radio) {
        const inputs = radio.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => {
            input.checked = input.value === getFromLocalStorage(jsonQuestionData.id);
        });
        return null;
    }

    radio = document.createElement('form');
    radio.id = jsonQuestionData.id;
    const savedValue = getFromLocalStorage(jsonQuestionData.id);

    for (const c of jsonQuestionData.choices) {
        const choice = document.createElement('input');
        choice.type = 'radio';
        choice.id = radio.id + c;
        choice.name = radio.id;
        choice.value = c;
        if (savedValue === c) choice.checked = true;
        radio.appendChild(choice);

        const label = document.createElement('label');
        label.textContent = c;
        label.htmlFor = choice.id;
        radio.appendChild(label);
    }

    radio.addEventListener("change",
        () => setToLocalStorage(jsonQuestionData.id,
            radio.querySelector("input:checked")?.value)
    );

    return radio;
}

function renderTextBox(jsonQuestionData) {
    let textBox = document.getElementById(jsonQuestionData.id);
    if (textBox) {
        textBox.value = getFromLocalStorage(jsonQuestionData.id);
        return null;
    }

    textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.id = jsonQuestionData.id;

    textBox.value = getFromLocalStorage(jsonQuestionData.id);
    textBox.addEventListener("input",
        () => setToLocalStorage(jsonQuestionData.id, textBox.value));

    return textBox;
}