import {config, getFromLocalStorage, setToLocalStorage} from "./Config.js";

export class PageManager {

    initialize() {
        this.currentPageName = this.getCurrentPageName();
        this.navigateTo(this.currentPageName);
        this.pages = {}
    }

    createPage(pageName) {
        const pageContainer = document.createElement('fieldset');
        pageContainer.classList.add('page');
        pageContainer.id = pageName;
        this.pages[pageName] = pageContainer;
        return pageContainer;
    }

    getCurrentPageName() {
        return getFromLocalStorage('currentPageName') || config[0].name;
    }

    updateCurrentPage(pageName) {
        this.currentPageName = Object.keys(this.pages).find(p => p.name === pageName);
        setToLocalStorage('currentPageName', this.currentPageName);
    }

    navigateTo(pageName, scrollToTop = true) {
        this.updateCurrentPage(pageName);
        if (scrollToTop) window.scrollTo(0, 0);
    }
}