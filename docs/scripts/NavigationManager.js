import {COLORS} from "./Config.js";

export class NavigationManager {

    constructor() {
        this.absoluteNavigationButtons = [];
    }

    createAbsoluteNavigation(pageManager) {
        const absoluteNavigationContainer = document.createElement('div')
        absoluteNavigationContainer.id = 'absolute_navigation_container'

        pageManager.pages.forEach((page, index) => {
            const button = document.createElement('button');
            button.textContent = page.id;
            button.classList.add('absolute_navigation');
            button.addEventListener('click', () => pageManager.navigateTo(index));
            absoluteNavigationContainer.appendChild(button);
            this.absoluteNavigationButtons.push(button);
        });

        return absoluteNavigationContainer;
    }

    setAbsoluteNavigationButtonBold(pageIndex, setBold) {
        this.absoluteNavigationButtons[pageIndex].style.fontWeight = setBold ? 'bold' : 'normal';
    }

    createRelativeNavigation(submitButton, pageManager) {
        const relativeNavigationContainer = document.createElement('div');
        relativeNavigationContainer.id = 'relative_navigation_container';

        this.prevButton = this.createRelativeNavigationButton('Previous', 'prev');
        this.prevButton.onclick = () => pageManager.navigateByDirection(-1);
        relativeNavigationContainer.appendChild(this.prevButton);

        relativeNavigationContainer.appendChild(submitButton);

        this.nextButton = this.createRelativeNavigationButton('Next', 'next');
        this.nextButton.onclick = () => pageManager.navigateByDirection(1);
        relativeNavigationContainer.appendChild(this.nextButton);

        return relativeNavigationContainer;
    }

    createRelativeNavigationButton(title, id) {
        const button = document.createElement('button');
        button.textContent = title;
        button.classList.add('relative_navigation');
        button.id = id + '_button'
        return button;
    }

    updateRelativeNavigation(pageIndex, pageAmount) {
        this.prevButton.style.color = pageIndex > 0 ? COLORS.ACTIVE : COLORS.INACTIVE;
        this.nextButton.style.color = pageIndex + 1 < pageAmount ? COLORS.ACTIVE : COLORS.INACTIVE;
    }
}