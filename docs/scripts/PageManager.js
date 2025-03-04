import {config} from "./Config.js";
import {getFromLocalStorage, setToLocalStorage} from "./DataManager.js";

export class PageManager {

    constructor(navigationManager, titleManager) {
        this.navigationManager = navigationManager;
        this.titleManager = titleManager;
    }

    initialize() {
        this.currentPageName = getFromLocalStorage('currentPageName') || config[0].name;
        this.currentPageIndex = 0;
        this.pages = new Map();
        this.title = this.createTitle();
    }

    createPage(pageName) {
        const pageContainer = document.createElement('fieldset');
        pageContainer.classList.add('page');
        pageContainer.id = pageName;
        this.pages.set(pageName, pageContainer);
        return pageContainer;
    }

    createTitle() {
        const title = document.createElement('h1');
        title.id = 'title';
        return title;
    }

    updateCurrentPage(pageName) {
        this.currentPageName = [...this.pages.keys()].find(p => p === pageName);
        this.currentPageIndex = [...this.pages.keys()].indexOf(this.currentPageName);
        setToLocalStorage('currentPageName', pageName);
        this.navigationManager.updateRelativeNavigation(this);
        this.titleManager.updateTitleNavigationButtons(pageName);
        this.title.textContent = pageName;
    }

    navigateToFirstPage() {
        this.navigateTo(this.pages[0]);
    }

    navigateToCurrentPage() {
        this.navigateTo(this.currentPageName);
    }

    navigateTo(pageName, scrollToTop = true) {
        this.updateCurrentPage(pageName);
        if (scrollToTop) window.scrollTo(0, 0);

        for (const page of this.pages.values()) {
            page.style.display = page.id === pageName ? 'block' : 'none';
        }
    }
}