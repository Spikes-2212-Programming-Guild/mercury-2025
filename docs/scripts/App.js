import {PageManager} from './PageManager.js';
import {QuestionManager} from './QuestionManager.js';
import {SubmissionHandler} from './SubmissionHandler.js';
import {TitleManager} from './TitleManager.js';
import {NavigationManager} from './NavigationManager.js';
import {setUpEventListeners} from './event-listener-manager.js';
import {pageConfig} from "../config/questions.js";
import {GameRemindManager} from "./GameRemindManager.js";

class App {
    constructor() {
        this.navigationManager = new NavigationManager();
        this.titleManager = new TitleManager();
        this.pageManager = new PageManager();
        this.questionManager = new QuestionManager();
        this.gameRemindManager = new GameRemindManager();
        this.submissionHandler = new SubmissionHandler();
        this.initialize();
    }

    initialize() {
        this.pageManager.initialize(this.navigationManager);
        this.submissionHandler.initialize(this.questionManager, this.pageManager, this.gameRemindManager);
        this.questionManager.initialize(this.gameRemindManager);
        this.render();
        this.pageManager.navigateToCurrentPage();
        setUpEventListeners(this.pageManager);
        this.gameRemindManager.initialize(this.questionManager, this.pageManager);
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

        pageConfig.forEach((page, pageIndex) => {
            const pageContainer = this.pageManager.createPage(page.name);
            pagesContainer.appendChild(pageContainer);
            page.questions.forEach(question => {
                if (typeof question === 'string') { // titles
                    pageContainer.appendChild(this.titleManager.createTitle(question, page.name));
                } else { // questions
                    pageContainer.appendChild(this.questionManager.createQuestion(question, pageIndex));
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