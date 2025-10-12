import {getFromLocalStorage, removeFromLocalStorage, setToLocalStorage} from "./utils.js";
import {SCOREBOX_DEFAULT_VALUE, SCOREBOX_MAX_VALUE, SCOREBOX_MIN_VALUE} from "../config/constants.js";

// a map of question types to their respective renderers
export const questionRenderers = {
    'TextBox': renderTextBox,
    'Radio': renderRadio,
    'List': renderList,
    'AutoCompleteRadio': renderAutoCompleteRadio,
    'ScoreBox': renderScoreBox,
    'CommentBox': renderCommentBox,
};

/*
    Each method is responsible for rendering a specific question type.

    Responsibilities:
    - Create and append the question’s DOM element(s) into the given container.
    - Load any previously saved response from localStorage.
    - Add listeners to save changes back to localStorage.

    Behavior:
    - On the first call: renders the element with saved or default values.
    - On later calls: resets the element to its default state.
*/

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
    textarea.oninput = () => setToLocalStorage(jsonQuestionData.id, textarea.value);
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
        if (input.value < Number(input.min) || input.value > Number(input.max) || input.value === "") {
            input.classList.add('invalid');
            removeFromLocalStorage(jsonQuestionData.id);
        } else {
            input.classList.remove('invalid');
            setToLocalStorage(jsonQuestionData.id, input.value);
        }
    };
    input.oninput = saveValue;

    const decButton = document.createElement('button');
    decButton.textContent = '−';
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
    const id = jsonQuestionData.id;
    let input = document.getElementById(id);
    if (input) {
        // reset to default if already exists
        input.value = '';
        return;
    }

    input = document.createElement('input');
    input.type = 'number';
    input.id = id;
    input.value = getFromLocalStorage(id);

    const datalist = document.createElement('datalist');
    datalist.id = id + '-list';

    for (const c of jsonQuestionData.choices) {
        const option = document.createElement('option');
        option.value = c;
        datalist.appendChild(option);
    }
    // connect the datalist to the input
    input.setAttribute('list', datalist.id);

    // format to String to fix type and formating issues
    const allowedValues = new Set(jsonQuestionData.choices.map(c => String(c).trim()));
    input.oninput = () => {
        const value = input.value.trim();
        if (!allowedValues.has(value)) {
            input.classList.add("invalid");
            removeFromLocalStorage(id);
        } else {
            input.classList.remove("invalid");
            setToLocalStorage(id, value);
        }
    };

    questionContainer.appendChild(input);
    questionContainer.appendChild(datalist);
}

function renderRadio(jsonQuestionData, questionContainer) {
    const id = jsonQuestionData.id;
    let radioContainer = document.getElementById(id);

    if (radioContainer) {
        // reset to default if already exists
        radioContainer.querySelectorAll("input[type=radio]")
            .forEach(choice => choice.checked = false);
        radioContainer.classList.remove('invalid');
        return;
    }

    radioContainer = document.createElement('form');
    radioContainer.id = id;

    const savedValue = getFromLocalStorage(id);
    for (const c of jsonQuestionData.choices) {
        const choice = document.createElement('input');
        choice.type = 'radio';
        choice.id = id + '-' + c;
        choice.name = id;
        choice.value = c;
        if (savedValue === c) choice.checked = true;

        choice.onclick = () => {
            setToLocalStorage(id, c);
            radioContainer.classList.remove('invalid');
        };

        const label = document.createElement('label');
        label.textContent = c;
        label.htmlFor = choice.id;

        radioContainer.appendChild(choice);
        radioContainer.appendChild(label);
    }
    questionContainer.appendChild(radioContainer);
}

function renderList(jsonQuestionData, questionContainer) {
    const id = jsonQuestionData.id;
    let select = document.getElementById(id);
    if (select) {
        // reset to default if already exists
        select.value = '';
        select.classList.remove('invalid');
        return;
    }

    select = document.createElement('select');
    select.id = id;
    select.multiple = Boolean(jsonQuestionData.multiple);

    for (const c of jsonQuestionData.choices) {
        const option = document.createElement('option');
        option.id = id + '-' + c;
        option.textContent = c;
        option.value = c;
        select.appendChild(option);
    }

    const saved = getFromLocalStorage(id);
    if (select.multiple) {
        // select the previously saved options
        const savedOptions = new Set(saved ? saved.split(',') : []);
        for (const option of select.options) {
            option.selected = savedOptions.has(option.value);
        }

        select.onchange = () => {
            const selected =
                Array.from(select.selectedOptions, o => o.value);
            setToLocalStorage(id, selected.join(','));
            select.classList.remove('invalid');
        }
    } else {
        select.value = saved;
        select.onchange = () => {
            setToLocalStorage(id, select.value)
            select.classList.remove('invalid');
        };
    }

    questionContainer.appendChild(select);
}

function renderTextBox(jsonQuestionData, questionContainer) {
    let textBox = document.getElementById(jsonQuestionData.id);
    if (textBox) {
        // reset to default if already exists
        textBox.value = '';
        return;
    }

    textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.id = jsonQuestionData.id;
    textBox.value = getFromLocalStorage(jsonQuestionData.id) ?? '';
    textBox.oninput = () => {
        if (textBox.value === '') {
            textBox.classList.add('invalid');
        } else {
            textBox.classList.remove('invalid');
        }
        setToLocalStorage(jsonQuestionData.id, textBox.value)
    };
    questionContainer.appendChild(textBox);
}