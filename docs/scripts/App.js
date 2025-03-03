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
        this.initialize();
    }

    initialize() {
        this.pageManager.initialize();
        this.submissionHandler.initialize();
        this.render();
        this.setupEventListeners();
        this.pageManager.navigateTo(this.pageManager.getCurrentPageName());
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
        // Add your global event listeners here
    }
}

window.onload = () => {
    new App();
};