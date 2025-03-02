export class TitleManager {
    constructor() {
        this.titles = {}
    }

    createTitle(title, pageName) {
        const titleElement = document.createElement('label');
        titleElement.textContent = title;
        titleElement.classList.add('question-title');
        this.titles[pageName].push(titleElement);
        return titleElement;
    }

    scrollToTitle(titleElement) {
        const rect = titleElement.getBoundingClientRect();
        const absoluteY = window.scrollY + rect.top - titleOffset;
        window.scrollTo({ top: absoluteY });
    }
}