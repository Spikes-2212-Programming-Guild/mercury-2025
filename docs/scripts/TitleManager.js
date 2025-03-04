import {titleOffset} from "./Config.js";

export class TitleManager {
    constructor() {
        this.titles = {};
        this.upButton = null;
        this.downButton = null;
        this.previousTitleIndex = 0;
    }

    createTitle(title, pageName) {
        const titleElement = document.createElement('label');
        titleElement.textContent = title;
        titleElement.classList.add('question_title');
        if (!this.titles[pageName]) {  // Ensure the array exists
            this.titles[pageName] = [];
        }
        this.titles[pageName].push(titleElement);
        return titleElement;
    }

    createTitleNavigation() {
        const titleNavigationContainer = document.createElement('div');
        titleNavigationContainer.id = 'title_navigation_container';

        this.upButton = this.createNavButton('▲', 'title_navigation_up');
        this.downButton = this.createNavButton('▼', 'title_navigation_down');

        titleNavigationContainer.appendChild(this.downButton);
        titleNavigationContainer.appendChild(this.upButton);

        return titleNavigationContainer;
    }

    createNavButton(text, id) {
        const button = document.createElement('button');
        button.textContent = text;
        button.id = id;
        return button;
    }

    updateTitleNavigationButtons(currentPageName) {
        this.upButton.onclick = () => this.navigateTitles(currentPageName, -1);
        this.downButton.onclick = () => this.navigateTitles(currentPageName, 1);
    }

    navigateTitles(currentPageName, direction) {
        const titles = this.titles[currentPageName];
        if (!titles || titles.length === 0) return;

        let closestIndex = this.getClosestTitleIndex(currentPageName);

        // If not at an exact title, move to the closest title first
        if (this.previousTitleIndex !== closestIndex || (closestIndex === 0 && direction < 0) ||
            (closestIndex === this.titles.length - 1  && direction > 0)) {
            this.scrollToTitle(titles[closestIndex]);
            this.previousTitleIndex = closestIndex;
            return;
        }

        let targetIndex = closestIndex + direction;
        targetIndex = Math.max(0, Math.min(targetIndex, titles.length - 1));

        if (targetIndex !== this.previousTitleIndex) {
            this.scrollToTitle(titles[targetIndex]);
            this.previousTitleIndex = targetIndex;
        }
    }

    getClosestTitleIndex(currentPage) {
        const titles = this.titles[currentPage];
        if (!titles || titles.length === 0) return -1;

        const currentScrollY = window.scrollY + titleOffset;
        let closestIndex = -1;
        let minDistance = Infinity;

        titles.forEach((title, index) => {
            const rect = title.getBoundingClientRect();
            const elementY = window.scrollY + rect.top - titleOffset;
            const distance = Math.abs(elementY - currentScrollY);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    scrollToTitle(titleElement) {
        const rect = titleElement.getBoundingClientRect();
        const absoluteY = window.scrollY + rect.top - titleOffset;
        window.scrollTo({top: absoluteY});
    }
}