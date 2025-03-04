import {titleOffset} from "./Config.js";

export class TitleManager {
    constructor() {
        this.titles = {};
        this.upButton = null;
        this.downButton = null;
    }

    createTitle(title, pageName) {
        const titleElement = document.createElement("label");
        titleElement.textContent = title;
        titleElement.classList.add("question_title");

        if (!this.titles[pageName]) this.titles[pageName] = [];
        this.titles[pageName].push(titleElement);

        return titleElement;
    }

    createTitleNavigation(pageManager) {
        const container = document.createElement("div");
        container.id = "title_navigation_container";
        this.pageManager = pageManager;

        this.upButton = this.createNavButton("▲", "title_navigation_up");
        this.downButton = this.createNavButton("▼", "title_navigation_down");
        this.upButton.onclick = () => this.navigateToClosestTitle("up");
        this.downButton.onclick = () => this.navigateToClosestTitle("down");

        container.append(this.downButton, this.upButton);
        return container;
    }

    createNavButton(text, id) {
        const button = document.createElement("button");
        button.textContent = text;
        button.id = id;
        return button;
    }

    navigateToClosestTitle(direction) {
        const titles = this.titles[this.pageManager.currentPageName];
        if (!titles || titles.length === 0) return;

        const viewportTop = window.scrollY;

        let bestMatchIndex = -1;
        let bestMatchDistance = Infinity;

        titles.forEach((title, index) => {
            const rect = title.getBoundingClientRect();
            const titleTop = window.scrollY + rect.top - titleOffset;
            const titleBottom = titleTop + rect.height;

            if (titleBottom < viewportTop) {
                let distance = viewportTop - titleBottom;
                if (distance < bestMatchDistance) {
                    bestMatchDistance = distance;
                    bestMatchIndex = index;
                }
            }
        });

        if (direction === "down") {
            if (viewportTop < titleOffset * 0.5) { // if all titles are below
                bestMatchIndex = -2;
            }
            bestMatchIndex = Math.min(bestMatchIndex + 2, titles.length - 1); // Prevent index overflow
        } else {
            bestMatchIndex = Math.max(bestMatchIndex, 0);
        }

        this.scrollToTitle(titles[bestMatchIndex]);
    }

    scrollToTitle(titleElement) {
        if (!titleElement) return;
        const rect = titleElement.getBoundingClientRect();
        const absoluteY = window.scrollY + rect.top - titleOffset;
        window.scrollTo({top: absoluteY});
    }
}
