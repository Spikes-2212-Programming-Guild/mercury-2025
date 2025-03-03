import {titleOffset} from "./Config.js";

export class TitleManager {
    constructor() {
        this.titles = {}
    }

    createTitle(title, pageName) {
        const titleElement = document.createElement('label');
        titleElement.textContent = title;
        titleElement.classList.add('question-title');
        if (this.titles[pageName]) {
            this.titles[pageName].push(titleElement);
        } else {
            this.titles[pageName] = [title];
        }
        return titleElement;
    }

    scrollToTitle(titleElement) {
        const rect = titleElement.getBoundingClientRect();
        const absoluteY = window.scrollY + rect.top - titleOffset;
        window.scrollTo({ top: absoluteY });
    }
}