import {TitleManager} from "./managers/TitleManager.js";
import {NavigationManager} from "./managers/NavigationManager.js";
import {QuestionManager} from "./managers/QuestionManager.js";
import {PageManager} from "./managers/PageManager.js";
import {GameRemindManager} from "./utils/GameRemindManager.js";
import {SubmissionHandler} from "./managers/SubmissionHandler.js";
import {setUpEventListeners} from "./utils/event-listener-manager.js";
import {pageConfig} from "../config/questions.js";


/**
 * App: Central Controller
 * - Creates all managers
 * - Initializes their dependencies
 * - Renders HTML structure
 */
class App {
    constructor() {
        // Create Managers
        this.navigationManager = new NavigationManager();
        this.titleManager = new TitleManager();
        this.pageManager = new PageManager();
        this.questionManager = new QuestionManager();
        this.gameRemindManager = new GameRemindManager();
        this.submissionHandler = new SubmissionHandler();
        this.initialize();
    }

    /**
     * Initialize all managers and wire up dependencies
     */
    initialize() {
        this.pageManager.initialize(this.navigationManager, this.titleManager);
        this.submissionHandler.initialize(this.questionManager, this.pageManager, this.gameRemindManager);
        this.questionManager.initialize(this.gameRemindManager);
        this.render(); // Build DOM
        this.pageManager.navigateToCurrentPage();
        setUpEventListeners(this.pageManager);
        this.gameRemindManager.initialize(this.questionManager, this.pageManager);
    }

    /**
     * Render = build HTML dynamically based on config + managers
     */
    render() {
        const body = document.body;
        body.appendChild(this.pageManager.title);

        // Container for pages
        const pagesContainer = document.createElement('div');
        pagesContainer.id = 'pages_container';
        body.appendChild(pagesContainer);
        body.appendChild(this.titleManager.createTitleContainer());

        // Generate pages + questions from config
        pageConfig.forEach((page, pageIndex) => {
            const pageContainer = this.pageManager.createPage(page.name);
            pagesContainer.appendChild(pageContainer);

            page.questions.forEach(question => {
                if (typeof question === 'string') {
                    // Titles
                    pageContainer.appendChild(this.titleManager.createTitle(question, page.name));
                } else {
                    // Question objects
                    pageContainer.appendChild(this.questionManager.createQuestion(question, pageIndex));
                }
            });
        });

        const pageFooter = document.createElement('div');
        pageFooter.id = 'page_footer';
        pageFooter.appendChild(this.questionManager.createResetAllButton(this.pageManager));
        pageFooter.appendChild(this.submissionHandler.createResendButton());
        pagesContainer.appendChild(pageFooter);

        // Add navigation controls
        body.appendChild(this.navigationManager.createAbsoluteNavigation(this.pageManager));
        body.appendChild(this.navigationManager.createRelativeNavigation(
            this.submissionHandler.createSubmitButton(),
            this.pageManager
        ));
    }
}

// Start the app once everything is loaded
window.onload = () => {
    new App();
};
