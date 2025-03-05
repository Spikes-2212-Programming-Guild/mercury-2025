import {PageManager} from './PageManager.js';
import {QuestionManager} from './QuestionManager.js';
import {SubmissionHandler} from './SubmissionHandler.js';
import {TitleManager} from './TitleManager.js';
import {NavigationManager} from './NavigationManager.js';
import {setUpEventListeners} from './EventListenerManager.js';
import {config} from "./Config.js";
import {getFromLocalStorage} from "./DataManager.js";

class App {
    constructor() {
        this.navigationManager = new NavigationManager();
        this.titleManager = new TitleManager();
        this.pageManager = new PageManager();
        this.questionManager = new QuestionManager();
        this.submissionHandler = new SubmissionHandler(this.questionManager, this.pageManager);
        this.initialize();
    }

    initialize() {
        this.pageManager.initialize();
        this.submissionHandler.initialize();
        this.render();
        this.pageManager.navigateToCurrentPage();
        setUpEventListeners(this.pageManager);
    }

    render() {
        const body = document.body;
        body.appendChild(this.pageManager.title);
        body.appendChild(this.questionManager.createResetAllButton(this.pageManager));
        body.appendChild(this.submissionHandler.createResendButton());
        body.appendChild(this.titleManager.createTitleNavigation(this.pageManager));

        const pagesContainer = document.createElement('div');
        pagesContainer.id = 'pages_container';
        body.appendChild(pagesContainer);

        config.forEach((page, index) => {
            const pageContainer = this.pageManager.createPage(page.name);

            pagesContainer.appendChild(pageContainer);
            page.questions.forEach(question => {
                if (typeof question === 'string') {
                    // titles
                    pageContainer.appendChild(this.titleManager.createTitle(question, page.name));
                } else {
                    // questions
                    const questionObject = this.questionManager.createQuestion(question, index);
                    pageContainer.appendChild(questionObject.createElement());

                    const savedValue = getFromLocalStorage(question.id);
                    if (savedValue) questionObject.value = savedValue;
                    else questionObject.clear();
                    questionObject.updateOutlineColor();
                }
            });
        });

        body.appendChild(this.navigationManager.createAbsoluteNavigation(this.pageManager));
        body.appendChild(this.navigationManager.createRelativeNavigation(
            this.submissionHandler.createSubmitButton(), this.pageManager));
    }
}

window.onload = () => {
    new App();
};