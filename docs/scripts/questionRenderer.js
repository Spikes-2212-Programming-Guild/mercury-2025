import {getFromLocalStorage, removeFromLocalStorage, setToLocalStorage} from "./utils.js";
import {SCOREBOX_DEFAULT_VALUE, SCOREBOX_MAX_VALUE, SCOREBOX_MIN_VALUE} from "../config/constants.js";

export const questionRenderers = {
    'TextBox': renderTextBox,
    'Radio': renderRadio,
    'AutoCompleteRadio': renderAutoCompleteRadio,
    'ScoreBox': renderScoreBox,
    'CommentBox': renderCommentBox
};

function renderCommentBox(jsonQuestionData, questionContainer) {
    let textarea = document.getElementById(jsonQuestionData.id);
    if (textarea) {
        // reset to default if already exists
        textarea.value = '';
        return;
    }

    textarea = document.createElement('textarea');
    textarea.id = jsonQuestionData.id;
    textarea.value = getFromLocalStorage(jsonQuestionData.id) ?? '';
    textarea.oninput = () => {
        setToLocalStorage(jsonQuestionData.id, textarea.value);
    };
    questionContainer.appendChild(textarea);
}

function renderScoreBox(jsonQuestionData, questionContainer) {
    let input = document.getElementById(jsonQuestionData.id);
    if (input) {
        // reset to default if already exists
        input.value = input.defaultValue;
        setToLocalStorage(jsonQuestionData.id, input.defaultValue);
        return;
    }

    const container = document.createElement('div');
    input = document.createElement('input');
    input.type = 'number';
    input.id = jsonQuestionData.id;
    input.min = jsonQuestionData.minValue ?? SCOREBOX_MIN_VALUE;
    input.max = jsonQuestionData.maxValue ?? SCOREBOX_MAX_VALUE;
    input.defaultValue = jsonQuestionData.defaultValue ?? SCOREBOX_DEFAULT_VALUE;

    input.value = getFromLocalStorage(jsonQuestionData.id) ?? input.defaultValue;
    setToLocalStorage(jsonQuestionData.id, input.value);

    const saveValue = () => {
        // invalid
        if (input.value < Number(input.min) || input.value > Number(input.max) ||
            input.value === "") {
            input.classList.add('invalid');
            removeFromLocalStorage(jsonQuestionData.id);
        } else { // valid
            input.classList.remove('invalid');
            setToLocalStorage(jsonQuestionData.id, input.value);
        }
    };
    input.oninput = saveValue;

    const decButton = document.createElement('button');
    decButton.textContent = '-';
    decButton.onclick = () => {
        input.stepDown();
        saveValue();
    };

    const incButton = document.createElement('button');
    incButton.textContent = '+';
    incButton.onclick = () => {
        input.stepUp();
        saveValue();
    }

    container.appendChild(decButton);
    container.appendChild(input);
    container.appendChild(incButton);
    questionContainer.appendChild(container);
}

function renderAutoCompleteRadio(jsonQuestionData, questionContainer) {
    let input = document.getElementById(jsonQuestionData.id);
    if (input) {
        // reset to default if already exists
        input.value = '';
        return;
    }

    input = document.createElement('input');
    input.id = jsonQuestionData.id;
    input.value = getFromLocalStorage(jsonQuestionData.id);

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

    // format to String to fix type issues
    const allowedValues = jsonQuestionData.choices.map(c => String(c));
    input.oninput = () => {
        if (!allowedValues.includes(input.value)) {
            input.classList.add('invalid');
            removeFromLocalStorage(jsonQuestionData.id);
        } else {
            input.classList.remove('invalid');
            setToLocalStorage(jsonQuestionData.id, input.value);
        }
    };

    input.appendChild(datalist);
    questionContainer.appendChild(input);
}

function renderRadio(jsonQuestionData, questionContainer) {
    let radioContainer = document.getElementById(jsonQuestionData.id);
    if (radioContainer) {
        // reset to default if already exists
        const choices = document.getElementsByName(radioContainer.id);
        choices.forEach(choice => {
            choice.checked = false;
        })
        radioContainer.classList.remove('invalid');
        return;
    }

    radioContainer = document.createElement('form');
    radioContainer.id = jsonQuestionData.id;

    const savedValue = getFromLocalStorage(jsonQuestionData.id);
    for (const c of jsonQuestionData.choices) {
        const choice = document.createElement('input');
        choice.type = 'radio';
        choice.id = radioContainer.id + c;
        choice.name = radioContainer.id;
        choice.value = c;
        choice.onclick = () => {
            setToLocalStorage(jsonQuestionData.id, c);
            radioContainer.classList.remove('invalid');
        };
        if (savedValue === c) choice.checked = true;

        radioContainer.appendChild(choice);
        const label = document.createElement('label');
        label.textContent = c;
        label.htmlFor = choice.id;
        radioContainer.appendChild(label);
    }
    questionContainer.appendChild(radioContainer);
}

function renderTextBox(jsonQuestionData, questionContainer) {
    let textBox = document.getElementById(jsonQuestionData.id);
    if (textBox) {
        // reset to default if already exists
        textBox.value = getFromLocalStorage(jsonQuestionData.id);
        return;
    }

    textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.id = jsonQuestionData.id;
    textBox.value = getFromLocalStorage(jsonQuestionData.id);
    textBox.oninput = () => {
        let value = textBox.value;
        if (value === '') {
            textBox.classList.add('invalid');
        } else {
            textBox.classList.remove('invalid');
        }
        setToLocalStorage(jsonQuestionData.id, value)
    };
    questionContainer.appendChild(textBox);
}