import {getFromLocalStorage, setToLocalStorage} from "./DataManager.js";
import {COLORS} from "./Config.js";

export class PageManager {

    initialize() {
        this.currentPageIndex = getFromLocalStorage('currentPageIndex') || 0;
        this.currentPageName = '';
        this.pages = [];
        this.title = this.createTitle();
    }

    createPage(pageName) {
        const pageContainer = document.createElement('fieldset');
        pageContainer.classList.add('page');
        pageContainer.id = pageName;
        this.pages.push(pageContainer);
        return pageContainer;
    }

    createTitle() {
        const title = document.createElement('h1');
        title.id = 'title';
        return title;
    }

    updateCurrentPage(pageIndex) {
        this.currentPageIndex = pageIndex
        this.currentPageName = this.pages[pageIndex].id;
        setToLocalStorage('currentPageIndex', pageIndex);
        this.title.textContent = this.currentPageName;
    }

    navigateToFirstPage() {
        this.navigateTo(0);
    }

    navigateToCurrentPage() {
        this.navigateTo(parseInt(this.currentPageIndex));
    }

    navigateByDirection(direction) {
        let newIndex = parseInt(this.currentPageIndex) + direction;
        if (newIndex > 0 && newIndex < this.pages.length) {
            this.navigateTo(newIndex);
        }
    }

    navigateTo(pageIndex, scrollToTop = true) {
        this.updateCurrentPage(pageIndex);
        if (scrollToTop) window.scrollTo(0, 0);

        this.pages.forEach((page, index) => {
            page.style.display = index === pageIndex ? 'block' : 'none';
        });
    }
}