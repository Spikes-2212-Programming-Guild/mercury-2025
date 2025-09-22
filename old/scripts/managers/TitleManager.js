import {TITLE_OFFSET} from "../../config/constants.js";

export class TitleManager {

    constructor() {
        this.titles = {};
    }

    createTitle(title, pageName) {
        const titleElement = document.createElement("label");
        titleElement.textContent = title;
        titleElement.id = title;
        titleElement.classList.add("question_title");

        if (this.titles[pageName] === undefined) this.titles[pageName] = [];
        this.titles[pageName].push(titleElement);

        return titleElement;
    }

    createTitleContainer() {
        this.container = document.createElement("div");
        this.container.id = "title_navigation_container";
        return this.container;
    }

    updateTileNavigation(pageName) {
        this.container.innerHTML = "";
        if (this.titles[pageName] === undefined) return;

        for (let i = 0; i < this.titles[pageName].length; i++) {
            let titleElement = this.titles[pageName][i];
            let button = this.createNavButton(
                i+1,
                () => this.scrollToTitle(titleElement)
            );
            this.container.append(button);
        }
    }

    createNavButton(text, onClick) {
        const button = document.createElement("button");
        button.textContent = text;
        button.className = "title_navigation";
        button.onclick = onClick;
        return button;
    }

    getTitleTop(titleElement) {
        return titleElement.getBoundingClientRect().top + window.scrollY - TITLE_OFFSET;
    }

    scrollToTitle(titleElement) {
        if (!titleElement) return;
        window.scrollTo({top: this.getTitleTop(titleElement)});
    }
}
