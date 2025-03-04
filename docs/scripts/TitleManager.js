import {titleOffset} from "./Config.js";

export class TitleManager {
    constructor() {
        this.titles = {};
        this.upButton = null;
        this.downButton = null;
        this.previousTitle = null;
    }

    createTitle(title, pageName) {
        const titleElement = document.createElement('label');
        titleElement.textContent = title;
        titleElement.classList.add('question_title');

        if (!this.titles[pageName]) this.titles[pageName] = [];
        this.titles[pageName].push(titleElement);

        return titleElement;
    }

    createTitleNavigation() {
        const container = document.createElement('div');
        container.id = 'title_navigation_container';

        this.upButton = this.createNavButton('▲', 'title_navigation_up');
        this.downButton = this.createNavButton('▼', 'title_navigation_down');

        container.append(this.downButton, this.upButton);
        return container;
    }

    createNavButton(text, id) {
        const button = document.createElement('button');
        button.textContent = text;
        button.id = id;
        return button;
    }

    updateTitleNavigationButtons(currentPageName) {
        this.upButton.onclick = () => this.navigateToClosestTitle(currentPageName, "up");
        this.downButton.onclick = () => this.navigateToClosestTitle(currentPageName, "down");
    }

    navigateToClosestTitle(currentPageName, direction) {
        const titles = this.titles[currentPageName];
        if (!titles || titles.length === 0) return;

        const viewportTop = window.scrollY;
        let bestMatchIndex = -1;
        let bestMatchDistance = Infinity;

        let allTitlesBelow = false;

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

        if (viewportTop < titleOffset * 0.5) {
            allTitlesBelow = true;
        }

        if (direction === "down") {
            if (allTitlesBelow) {
                bestMatchIndex = -2; // Handles case where all titles are below
            }

            if (bestMatchIndex >= titles.length - 2) bestMatchIndex = titles.length - 3;
            this.scrollToTitle(titles[bestMatchIndex + 2]);

        } else {
            if (bestMatchIndex < 0) bestMatchIndex = 0;
            this.scrollToTitle(titles[bestMatchIndex]);
        }
    }

    scrollToTitle(titleElement) {
        const rect = titleElement.getBoundingClientRect();
        const absoluteY = window.scrollY + rect.top - titleOffset;
        this.previousTitle = titleElement;
        window.scrollTo({top: absoluteY});
    }
}
