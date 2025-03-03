import {config} from "./Config.js";

export class NavigationManager {
    constructor(pageManager) {
        this.pageManager = pageManager;
    }

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
        relativeNavigationContainer.appendChild(this.createRelativeNavigationButton('Previous', 'prev'));
        relativeNavigationContainer.appendChild(submitButton);
        relativeNavigationContainer.appendChild(this.createRelativeNavigationButton('Next', 'next'));
        return relativeNavigationContainer;
    }

    createRelativeNavigationButton(title, id) {
        const button = document.createElement('button');
        button.textContent = title;
        button.classList.add('relative_navigation');
        button.id = id + '_button'
        return button;
    }

    updateRelativeNavigation() {
        // prevButton.style.disabeled = pageIndex > 0 ? 'true' : 'false';
        // prevButton.style.color = pageIndex > 0 ? COLORS.ACTIVE : COLORS.INACTIVE;
        // prevButton.onclick = pageIndex > 0 ? () => displayPage(pageMaps[pageIndex - 1].name) : null;
        //
        // nextButton.style.color = pageIndex + 1 < pageAmount ? COLORS.ACTIVE : COLORS.INACTIVE;
        // nextButton.style.disabeled = pageIndex + 1 < pageAmount ? 'true' : 'false';
        // nextButton.onclick = pageIndex + 1 < pageAmount ? () => displayPage(pageMaps[pageIndex + 1].name) : null;
    }
}