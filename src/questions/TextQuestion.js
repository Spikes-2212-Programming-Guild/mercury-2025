import { Question } from './Question';

export class TextQuestion extends Question {

    static type = 'text'

    constructor(id, title) {
        super(id, title);
    }

    getElement() {
        const docTitle = document.createElement('label');
        docTitle.innerHTML = this.title;
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'question');
        input.setAttribute('id', this.id);
        input.style.outline = '2px solid black';
        docTitle.appendChild(input);
        return docTitle;
    }
}
