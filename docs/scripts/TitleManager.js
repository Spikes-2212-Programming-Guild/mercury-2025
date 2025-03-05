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

        this.upButton = this.createNavButton("▲", "title_navigation_up",
            () => this.navigateToClosestTitle("up"));
        this.downButton = this.createNavButton("▼", "title_navigation_down",
            () => this.navigateToClosestTitle("down"));

        container.append(this.downButton, this.upButton);
        return container;
    }

    createNavButton(text, id, onClick) {
        const button = document.createElement("button");
        button.textContent = text;
        button.id = id;
        button.onclick = onClick;
        return button;
    }

    navigateToClosestTitle(direction) {
        const titles = this.titles[this.pageManager.currentPageName];
        if (!titles || titles.length === 0) return;

        const viewportTop = window.scrollY;
        let closestTitleIndex = this.getClosestTitleIndex(viewportTop);

        closestTitleIndex = this.adjustIndexForDirection(closestTitleIndex, direction, viewportTop, titles);

        this.scrollToTitle(titles[closestTitleIndex]);
    }

    getClosestTitleIndex(viewportTop) {
        const titles = this.titles[this.pageManager.currentPageName];
        let closestIndex = -1;
        let closestDistance = Infinity;

        titles.forEach((title, index) => {
            const titleBottom = this.getTitleTop(title) + title.offsetHeight;
            if (titleBottom < viewportTop) {
                const distance = viewportTop - titleBottom;
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            }
        });

        return closestIndex;
    }

    adjustIndexForDirection(index, direction, viewportTop, titles) {
        if (direction === "down") {
            index = Math.min(index + 1, titles.length - 1);
            const titleTop = this.getTitleTop(titles[index]);
            if (Math.abs(titleTop - viewportTop) < 5 && index < titles.length - 1) index++;
        } else {
            index = Math.max(index, 0);
        }

        return index;
    }

    getTitleTop(titleElement) {
        return titleElement.getBoundingClientRect().top + window.scrollY - titleOffset;
    }

    scrollToTitle(titleElement) {
        if (!titleElement) return;
        window.scrollTo({top: this.getTitleTop(titleElement)});
    }
}
