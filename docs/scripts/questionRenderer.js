export const questionRenderers = {
    'TextBox': renderTextBox,
    'Radio': renderRadio,
    'AutoCompleteRadio': renderAutoCompleteRadio,
    'ScoreBox': renderScoreBox,
    'CommentBox': renderCommentBox
};

function renderCommentBox(jsonQuestionData) {
    const textarea = document.createElement('textarea');
    textarea.id = jsonQuestionData.id;
    return textarea;
}

function renderScoreBox(jsonQuestionData) {
    const container = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'number';
    input.id = jsonQuestionData.id;
    input.min = jsonQuestionData.minValue || 0;
    input.max = jsonQuestionData.maxValue || 100; // TODO - replace with const

    const decButton = document.createElement('button');
    decButton.textContent = '-';
    decButton.addEventListener("click", () => input.stepDown(1));

    const incButton = document.createElement('button');
    incButton.textContent = "+";
    incButton.addEventListener("click", () => input.stepUp(1));

    container.appendChild(decButton);
    container.appendChild(input);
    container.appendChild(incButton);
    return container;
}

function renderAutoCompleteRadio(jsonQuestionData) {
    const input = document.createElement('input');
    input.type = 'number';
    input.id = jsonQuestionData.id;

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
    const radio = document.createElement('form');
    radio.id = jsonQuestionData.id;

    for (const c of jsonQuestionData.choices) {
        const choice = document.createElement('input');
        choice.type = 'radio';
        choice.id = radio.id + c;
        choice.name = radio.id;
        choice.value = c;
        radio.appendChild(choice);

        const label = document.createElement('label');
        label.textContent = c;
        label.htmlFor = choice.id;
        radio.appendChild(label);
    }
    return radio;
}

function renderTextBox(jsonQuestionData) {
    const textBox = document.createElement('input');
    textBox.type = 'text';
    textBox.id = jsonQuestionData.id;
    return textBox;
}