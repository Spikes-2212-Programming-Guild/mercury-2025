import {config, getFromLocalStorage, setToLocalStorage} from "./Config.js";

export class PageManager {

    initialize() {
        this.currentPageName = this.getCurrentPageName();
        this.currentPageIndex = 0;
        this.pages = new Map();
    }

    createPage(pageName) {
        const pageContainer = document.createElement('fieldset');
        pageContainer.classList.add('page');
        pageContainer.id = pageName;
        this.pages.set(pageName, pageContainer);
        return pageContainer;
    }

    getCurrentPageName() {
        return getFromLocalStorage('currentPageName') || config[0].name;
    }

    updateCurrentPage(pageName) {
        this.currentPageName = Object.keys(this.pages).find(p => p.name === pageName);
        this.currentPageIndex = this.pages.keys().toArray().indexOf(this.currentPageName);
        setToLocalStorage('currentPageName', pageName);
    }

    navigateTo(pageName, scrollToTop = true) {
        this.updateCurrentPage(pageName);
        if (scrollToTop) window.scrollTo(0, 0);

        for (const page of this.pages.values()) {
            page.style.display = page.id === pageName ? 'block' : 'none';
        }
    }
}