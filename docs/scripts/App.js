import form from '../config/form.json' with {type: 'json'};
import {questionRenderers} from './questionRenderer.js';
import {getFromLocalStorage, removeFromLocalStorage, setToLocalStorage} from "./utils.js";
import {
    AUTO_DURATION_MS,
    AUTO_PAGE_INDEX,
    SWIPE_HORIZONTAL_THRESHOLD,
    SWIPE_VERTICAL_THRESHOLD,
    TELEOP_PAGE_INDEX,
    TRIGGER_ID
} from "../config/constants.js";

class App {

    initialize() {
        this.render();
        this.setUpSwipeListeners();
        this.displayPage(Number(getFromLocalStorage('currentPageIndex') || 0));
        this.autoStartTeleop();
    }

    /*
        HTML structure:
        body:
            - top-navigation (div):
                - button for each page

            - page-container (div):
                - container for each page (div):
                    - page title (label)
                    - question containers (fieldset):
                        - questions (div)

            - clear-all-button
            - bottom-navigation (div):
                - previous button
                - submit button
                - next button
    */
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

        document.documentElement.setAttribute(
            'data-theme', form.pages[pageIndex].theme);

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
        pageTitle.classList.add('page-title');
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

    /*
        Automatically transitions to the teleop page once the autonomous phase ends.
        When the user answers the first autonomous question (TRIGGER_ID),
        a timer begins, and after AUTO_DURATION_MS, the page switches to teleop
        ensuring the scouter doesn't forget to move page after auto.
    */
    autoStartTeleop() {
        const triggerQuestion = document.getElementById(TRIGGER_ID);
        if (!triggerQuestion) return console.warn(`Element #${TRIGGER_ID} not found`);

        const handleClick = () => {
            if (getFromLocalStorage(triggerQuestion.id)) return;

            setTimeout(() => {
                if (Number(getFromLocalStorage('currentPageIndex')) === AUTO_PAGE_INDEX) {
                    this.displayPage(TELEOP_PAGE_INDEX);
                }
            }, AUTO_DURATION_MS)
        }
        // capture to make it the first event to be handled
        triggerQuestion.addEventListener('click', handleClick, {capture: true});
    }

    setUpSwipeListeners() {
        let startX = 0, startY = 0;

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

            if (Math.abs(diffY) > screenHeight * SWIPE_VERTICAL_THRESHOLD) return;

            if (diffX > screenWidth * SWIPE_HORIZONTAL_THRESHOLD) {
                this.previousPage();
            } else if (diffX < -screenWidth * SWIPE_HORIZONTAL_THRESHOLD) {
                this.nextPage();
            }
        });
    }
}

window.onload = () => {
    const app = new App();
    app.initialize();
};
