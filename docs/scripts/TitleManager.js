import {titleOffset} from "./Config.js";

export class TitleManager {
    constructor() {
        this.titles = {};
        this.upButton = null;
        this.downButton = null;
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

        const upButton = document.createElement('button');
        upButton.textContent = '▲';
        upButton.id = 'title_navigation_up';
        this.upButton = upButton;

        const downButton = document.createElement('button');
        downButton.textContent = '▼';
        downButton.id = 'title_navigation_down';
        this.downButton = downButton;

        titleNavigationContainer.appendChild(downButton);
        titleNavigationContainer.appendChild(upButton);
        return titleNavigationContainer;
    }

    updateTitleNavigationButtons(currentPageName) {
        this.upButton.onclick = () => {
            let closestIndex = this.getClosestTitleIndex(currentPageName);
            if (closestIndex !== -1 && closestIndex > 0) {
                this.scrollToTitle(this.titles[currentPageName][closestIndex - 1]);
            }
        };

        this.downButton.onclick = () => {
            let closestIndex = this.getClosestTitleIndex(currentPageName);
            if (closestIndex !== -1 && closestIndex < this.titles[currentPageName].length - 1) {
                this.scrollToTitle(this.titles[currentPageName][closestIndex + 1]);
            }
        };
    }

    getClosestTitleIndex(currentPage) {
        if (!this.titles[currentPage] || this.titles[currentPage].length === 0) {
            return -1; // Prevent errors
        }

        const currentScrollY = window.scrollY + titleOffset;
        let closestIndex = -1;
        let minDistance = Infinity;

        for (let i = 0; i < this.titles[currentPage].length; i++) {
            const rect = this.titles[currentPage][i].getBoundingClientRect();
            const elementY = window.scrollY + rect.top - titleOffset;

            const distance = Math.abs(elementY - currentScrollY);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }
        return closestIndex;
    }

    scrollToTitle(titleElement) {
        const rect = titleElement.getBoundingClientRect();
        const absoluteY = window.scrollY + rect.top - titleOffset;
        window.scrollTo({top: absoluteY});
    }
}