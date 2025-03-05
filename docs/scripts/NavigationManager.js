import {COLORS, config} from "./Config.js";

export class NavigationManager {

    createAbsoluteNavigation(pageManager) {
        const absoluteNavigationContainer = document.createElement('div')
        absoluteNavigationContainer.id = 'absolute_navigation_container'

        config.forEach((page, index) => {
            const button = document.createElement('button');
            button.textContent = page.name;
            button.classList.add('absolute_navigation');
            button.addEventListener('click', () => pageManager.navigateTo(index));
            absoluteNavigationContainer.appendChild(button);
        });

        return absoluteNavigationContainer;
    }

    createRelativeNavigation(submitButton, pageManager) {
        const relativeNavigationContainer = document.createElement('div');
        relativeNavigationContainer.id = 'relative_navigation_container';

        this.prevButton = this.createRelativeNavigationButton('Previous', 'prev');
        this.prevButton.onclick = () => {
            pageManager.navigateByDirection(-1);
            this.updateRelativeNavigation(pageManager);
        };

        relativeNavigationContainer.appendChild(this.prevButton);
        relativeNavigationContainer.appendChild(submitButton);

        this.nextButton = this.createRelativeNavigationButton('Next', 'next');
        this.nextButton.onclick = () => {
            pageManager.navigateByDirection(1);
            this.updateRelativeNavigation(pageManager);
        };
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

        this.prevButton.style.disabeled = pageIndex > 1 ? 'true' : 'false';
        this.prevButton.style.color = pageIndex > 1 ? COLORS.ACTIVE : COLORS.INACTIVE;

        this.nextButton.style.color = pageIndex + 1 < pageAmount ? COLORS.ACTIVE : COLORS.INACTIVE;
        this.nextButton.style.disabeled = pageIndex + 1 < pageAmount ? 'true' : 'false';
    }
}