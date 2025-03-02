import {PageManager} from './PageManager.js';
import {QuestionManager} from './QuestionManager.js';
import {SubmissionHandler} from './SubmissionHandler.js';
import {TitleManager} from './TitleManager';
import {config} from "./Config";

class App {
    constructor() {
        this.pageManager = new PageManager();
        this.questionManager = new QuestionManager();
        this.submissionHandler = new SubmissionHandler();
        this.titleManager = new TitleManager();
        this.initialize();
    }

    initialize() {
        this.pageManager.initialize();
        this.questionManager.initialize();
        this.submissionHandler.initialize(this.questionManager);
        this.render();
        this.setupEventListeners();
    }

    render() {
        const body = document.body;
        config.forEach(page => {
            const pageContainer = this.pageManager.createPage(page.name);
            body.appendChild(pageContainer);

            page.questions.forEach(question => {
                if (typeof question === 'string') {
                    // titles
                    pageContainer.appendChild(this.titleManager.createTitle(question, page.name));

                } else {
                    // questions
                    const questionObject = this.questionManager.createQuestion(question);
                    pageContainer.appendChild(questionObject.createElement());

                    const savedValue = getFromLocalStorage(question.id);
                    if (savedValue) questionObject.value = savedValue;
                    else questionObject.clear();
                }
            });
        });
    }

    setupEventListeners() {
        // Add your global event listeners here
    }
}

window.onload = () => {
    new App();
};