import {PageManager} from './PageManager.js';
import {QuestionManager} from './QuestionManager.js';
import {SubmissionHandler} from './SubmissionHandler.js';
import {TitleManager} from './TitleManager.js';
import {NavigationManager} from './NavigationManager.js';
import {config, getFromLocalStorage} from "./Config.js";

class App {
    constructor() {
        this.navigationManager = new NavigationManager();
        this.titleManager = new TitleManager();
        this.pageManager = new PageManager(this.navigationManager, this.titleManager);
        this.questionManager = new QuestionManager();
        this.submissionHandler = new SubmissionHandler(this.questionManager, this.pageManager);
        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;
        this.initialize();
    }

    initialize() {
        this.pageManager.initialize();
        this.submissionHandler.initialize();
        this.render();
        this.pageManager.navigateTo(this.pageManager.getCurrentPageName());
        this.setupEventListeners();
    }

    render() {
        const body = document.body;
        body.appendChild(this.pageManager.title);
        body.appendChild(this.questionManager.createResetAllButton(this.pageManager));
        body.appendChild(this.submissionHandler.createResendButton());
        body.appendChild(this.titleManager.createTitleNavigation());

        const pagesContainer = document.createElement('div');
        pagesContainer.id = 'pages_container';
        body.appendChild(pagesContainer);

        config.forEach(page => {
            const pageContainer = this.pageManager.createPage(page.name);

            pagesContainer.appendChild(pageContainer);
            page.questions.forEach(question => {
                if (typeof question === 'string') {
                    // titles
                    pageContainer.appendChild(this.titleManager.createTitle(question, page.name));
                } else {
                    // questions
                    const questionObject = this.questionManager.createQuestion(question, page.name);
                    pageContainer.appendChild(questionObject.createElement());

                    const savedValue = getFromLocalStorage(question.id);
                    if (savedValue) questionObject.value = savedValue;
                    else questionObject.clear();
                    questionObject.updateOutlineColor();
                }
            });

        });

        body.appendChild(this.navigationManager.createAbsoluteNavigation(this.pageManager));
        body.appendChild(this.navigationManager.createRelativeNavigation(this.submissionHandler.createSubmitButton()));
    }

    setupEventListeners() {
        this.disableIOSZoom();
        this.setUpSwipeListeners(this.navigationManager);
    }

    setUpSwipeListeners(navigationManager) {
        document.addEventListener("touchstart", function (event) {
            this.startX = event.touches[0].clientX;
            this.startY = event.touches[0].clientY;
        });
        document.addEventListener("touchend", function (event) {
            this.endX = event.changedTouches[0].clientX;
            this.endY = event.changedTouches[0].clientY;

            let diffX = this.endX - this.startX;
            let distanceY = Math.abs(this.endY - this.startY);
            if (distanceY > 300) return;

            if (diffX > 200) navigationManager.prevButton.click();
            else if (diffX < -200) navigationManager.nextButton.click();
        });
    }

    disableIOSZoom() {
        document.addEventListener('gesturestart', function (e) {
            e.preventDefault();
        });
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            let now = Date.now();
            // Allow normal clicks on buttons
            if (event.target.tagName === 'BUTTON' || event.target.closest('[role="button"]')) {
                return;
            }
            // Block double-tap zoom for everything else
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

window.onload = () => {
    new App();
};