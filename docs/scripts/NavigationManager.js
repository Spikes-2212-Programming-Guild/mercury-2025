import {COLORS, config} from "./Config.js";

export class NavigationManager {

    createAbsoluteNavigation(pageManager) {
        const absoluteNavigationContainer = document.createElement('div')
        absoluteNavigationContainer.id = 'absolute_navigation_container'

        config.forEach(page => {
            const button = document.createElement('button');
            button.textContent = page.name;
            button.classList.add('absolute_navigation');
            button.addEventListener('click', () => pageManager.navigateTo(page.name));
            absoluteNavigationContainer.appendChild(button);
        });

        return absoluteNavigationContainer;
    }

    createRelativeNavigation(submitButton) {
        const relativeNavigationContainer = document.createElement('div');
        relativeNavigationContainer.id = 'relative_navigation_container';

        this.prevButton = this.createRelativeNavigationButton('Previous', 'prev');
        relativeNavigationContainer.appendChild(this.prevButton);

        relativeNavigationContainer.appendChild(submitButton);

        this.nextButton = this.createRelativeNavigationButton('Next', 'next');
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

    updateRelativeNavigation(pageManager) {
        const pageIndex = pageManager.currentPageIndex;
        const pageAmount = config.length;

        this.prevButton.style.disabeled = pageIndex > 0 ? 'true' : 'false';
        this.prevButton.style.color = pageIndex > 0 ? COLORS.ACTIVE : COLORS.INACTIVE;
        this.prevButton.onclick = pageIndex > 0 ? () => pageManager.navigateTo(config[pageIndex - 1].name) : null;

        this.nextButton.style.color = pageIndex + 1 < pageAmount ? COLORS.ACTIVE : COLORS.INACTIVE;
        this.nextButton.style.disabeled = pageIndex + 1 < pageAmount ? 'true' : 'false';
        this.nextButton.onclick = pageIndex + 1 < pageAmount ? () => pageManager.navigateTo(config[pageIndex + 1].name) : null;
    }
}