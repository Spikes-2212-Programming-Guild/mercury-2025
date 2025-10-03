import form from '../config/form.json' with {type: 'json'};
import {questionRenderers} from './questionRenderer.js';
import {getFromLocalStorage, removeFromLocalStorage, setToLocalStorage} from "./utils.js";

class App {

    initialize() {
        this.render();
        this.setUpSwipeListeners();
        this.displayPage(Number(getFromLocalStorage('currentPageIndex') || 0));
    }

    render() {
        this.renderTopNavigationBar()
        this.renderSidebar();
        this.renderAllPages();
        this.renderResetAllButton();
        this.renderResendButton();
        this.renderBottomNavigationBar()
    }

    clearAnswers() {
        for (const p of form.pages) {
            for (const q of p.questions) {
                removeFromLocalStorage(q.id);
                const renderer = questionRenderers[q.type];
                if (!renderer) throw new Error(`Unknown question type: ${q.type}`);
                renderer(q); // rerender the question (reset-ing the value)
            }
        }
    }

    displayPage(pageIndex) {
        const buttons = document.getElementById('top-navigation').children;
        const pages = document.getElementById('pages-container').children;

        for (let i = 0; i < form.pages.length; i++) {
            pages[i].hidden = pageIndex !== i;
            buttons[i].classList.toggle('active', pageIndex === i);
        }

        window.scrollTo(0, 0);
        setToLocalStorage('currentPageIndex', pageIndex);
    }

    renderAllPages() {
        const pagesContainer = document.createElement('div');
        pagesContainer.id = 'pages-container';

        for (const p of form.pages) {
            const page = this.renderPage(p);
            page.hidden = true;
            pagesContainer.appendChild(page);
        }
        document.body.appendChild(pagesContainer);
    }

    renderPage(pageData) {
        const page = document.createElement('div');
        const pageTitle = document.createElement('h1');
        pageTitle.textContent = pageData.title;
        pageTitle.classList.add('page-titles');
        page.appendChild(pageTitle);

        for (const q of pageData.questions) {
            page.appendChild(this.createQuestion(q));
        }

        return page;
    }

    createQuestion(questionData) {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add(questionData.type);

        const title = document.createElement('h1');
        title.textContent = questionData.title;
        questionContainer.appendChild(title);

        const renderer = questionRenderers[questionData.type];
        if (!renderer) throw new Error(`Unknown question type: ${questionData.type}`);

        renderer(questionData, questionContainer);
        return questionContainer;
    }

    renderSidebar() {
        const container = document.createElement("div");
        container.id = "sidebar";

        const up = document.createElement("label");
        up.textContent = '↑';
        up.id = "sidebar-scroll-up";
        up.onclick = () => console.log('up');

        const down = document.createElement("label");
        down.textContent = '↓';
        down.id = "sidebar-scroll-down";
        down.onclick = () => console.log('down');

        container.appendChild(up);
        container.appendChild(down);
        document.body.appendChild(container);
    }

    renderResetAllButton() {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset All';
        resetButton.id = 'reset-all-button';
        resetButton.onclick = () => {
            this.clearAnswers()
            this.displayPage(0);
        }
        document.body.appendChild(resetButton);
    }

    renderResendButton() {
        const resendButton = document.createElement('button');
        resendButton.textContent = 'Resend Form';
        resendButton.id = 'resend-button';
        resendButton.onclick = () => console.log('resend');
        document.body.appendChild(resendButton);
    }

    renderTopNavigationBar() {
        const topNavContainer = document.createElement('div')
        topNavContainer.id = 'top-navigation'

        form.pages.forEach((p, i) => {
            const button = document.createElement('button');
            button.textContent = p.title;
            button.onclick = () => this.displayPage(i);
            topNavContainer.appendChild(button);
        });

        document.body.appendChild(topNavContainer);
    }

    renderBottomNavigationBar() {
        const bottomNavContainer = document.createElement('div');
        bottomNavContainer.id = 'bottom-navigation';

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.id = 'next-button';
        nextButton.onclick = () => this.nextPage();

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.id = 'submit-button';
        submitButton.onclick = () => this.printAnswers();

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.id = 'previous-button';
        prevButton.onclick = () => this.previousPage();

        bottomNavContainer.appendChild(prevButton);
        bottomNavContainer.appendChild(submitButton);
        bottomNavContainer.appendChild(nextButton);
        document.body.appendChild(bottomNavContainer);
    }

    nextPage() {
        let cur = getFromLocalStorage('currentPageIndex');
        cur++;
        if (form.pages.length === cur) cur = 0;
        this.displayPage(cur);
    }

    previousPage() {
        let cur = getFromLocalStorage('currentPageIndex');
        cur--;
        if (cur < 0) cur = form.pages.length - 1;
        this.displayPage(cur);
    }

    printAnswers() {
        for (let i = 0; i < form.pages.length; i++) {
            const p = form.pages[i];
            for (const q of p.questions) {
                let value = getFromLocalStorage(q.id)
                const question = document.getElementById(q.id);

                console.log(q.id + " " + value);
                question.classList.remove("invalid")

                if (value === null || value === "" || value === undefined) {
                    this.displayPage(i);
                    question.classList.toggle("invalid")

                    question.scrollIntoView({block: 'center', inline: 'nearest'});
                    return;
                }
            }
        }
    }

    setUpSwipeListeners() {
        let startX = 0, startY = 0;
        const horizontalThreshold = 0.25; // 25% of screen width
        const verticalLimit = 0.20; // 20% of screen height

        document.addEventListener("touchstart", e => {
            const t = e.touches[0];
            startX = t.clientX;
            startY = t.clientY;
        });

        document.addEventListener("touchend", e => {
            const t = e.changedTouches[0];
            const endX = t.clientX;
            const endY = t.clientY;

            const diffX = endX - startX;
            const diffY = endY - startY;

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            if (Math.abs(diffY) > screenHeight * verticalLimit) return;

            if (diffX > screenWidth * horizontalThreshold) {
                this.previousPage();
            } else if (diffX < -screenWidth * horizontalThreshold) {
                this.nextPage();
            }
        });
    }
}

window.onload = () => {
    const app = new App();
    app.initialize();
};
