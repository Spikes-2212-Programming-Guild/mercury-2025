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
        this.renderAllPages();
        this.renderClearAllButton();
        this.renderBottomNavigationBar()
    }

    clearAnswers() {
        for (const p of form.pages) {
            for (const c of p.containers) {
                for (const q of c.questions) {
                    removeFromLocalStorage(q.id);
                    const renderer = questionRenderers[q.type];
                    if (!renderer) throw new Error(`Unknown question type: ${q.type}`);
                    renderer(q); // rerender the question (reset-ing the value)
                }
            }
        }
    }

    displayPage(pageIndex) {
        const buttons = document.getElementById('top-navigation').children;
        const pages = document.getElementById('page-container').children;

        for (let i = 0; i < form.pages.length; i++) {
            pages[i].hidden = pageIndex !== i;
            buttons[i].classList.toggle('active', pageIndex === i);
        }

        window.scrollTo(0, 0);
        setToLocalStorage('currentPageIndex', pageIndex);
    }

    renderAllPages() {
        const pagesContainer = document.createElement('div');
        pagesContainer.id = 'page-container';

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

        for (const container of pageData.containers) {
            page.appendChild(this.renderContainer(container));
        }

        return page;
    }

    renderContainer(containerData) {
        const container = document.createElement('fieldset');
        container.classList.add('question-container');

        const title = document.createElement('legend');
        title.textContent = containerData.title;
        title.classList.add('container-title');
        container.appendChild(title);

        if (title.textContent === "") {
            title.hidden = true;
            container.style.border = "none";
        }

        for (const q of containerData.questions) {
            container.appendChild(this.createQuestion(q));
        }
        return container;
    }

    createQuestion(questionData) {
        const questionContainer = document.createElement('div');
        questionContainer.classList.add(questionData.type, "question");

        const title = document.createElement('h1');
        title.textContent = questionData.title;
        questionContainer.appendChild(title);

        const renderer = questionRenderers[questionData.type];
        if (!renderer) throw new Error(`Unknown question type: ${questionData.type}`);

        renderer(questionData, questionContainer);
        return questionContainer;
    }

    renderClearAllButton() {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Clear All';
        resetButton.id = 'clear-all-button';
        resetButton.onclick = () => {
            if (!confirm("Confirm Clear")) return;
            this.clearAnswers()
            this.displayPage(0);
        }
        document.body.appendChild(resetButton);
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
        if (form.pages.length === cur) return;
        this.displayPage(cur);
    }

    previousPage() {
        let cur = getFromLocalStorage('currentPageIndex');
        cur--;
        if (cur < 0) return;
        this.displayPage(cur);
    }

    printAnswers() {
        for (let i = 0; i < form.pages.length; i++) {
            const p = form.pages[i];
            for (const c of p.containers) {
                for (const q of c.questions) {
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
