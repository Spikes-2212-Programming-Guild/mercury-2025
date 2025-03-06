import {getFromLocalStorage, removeFromLocalStorage, setToLocalStorage} from "./data-manager";
import {COLORS, RESET_TYPES} from "../config/constants";

export class QuestionManager {
    constructor() {
        this.questions = [];
    }

    initialize(gameRemindManager) {
        this.gameRemindManager = gameRemindManager;
    }

    createQuestion(question, pageIndex) {
        const QuestionClass = question.type;
        const questionObject = new QuestionClass();

        questionObject.defaultValue = questionObject.defaultValue || '';
        question.pageIndex = pageIndex;
        Object.assign(questionObject, question);
        this.questions.push(questionObject);

        const questionElement = questionObject.createElement();
        this.loadSavedQuestionValue(questionObject)

        return questionElement;
    }

    loadSavedQuestionValue(questionObject) {
        const savedValue = getFromLocalStorage(questionObject.id);
        if (savedValue) questionObject.value = savedValue;
        else questionObject.clear();
        questionObject.updateOutlineColor();
    }

    createResetAllButton(pageManager) {
        const resetAllButton = document.createElement("button");
        resetAllButton.id = "reset_all_button";
        resetAllButton.textContent = "Reset All";
        resetAllButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleResetAllButton(pageManager);
        });
        return resetAllButton;
    }

    handleResetAllButton(pageManager) {
        const userConfirmed = confirm("Are you sure you want to reset All?");
        if (userConfirmed) {
            this.clearAllAnswers(true);
            pageManager.navigateToFirstPage();
        } else {
            pageManager.navigateToCurrentPage();
        }
    }

    clearAllAnswers(ignoreResetTypes = false) {
        this.gameRemindManager.resetGame();
        for (const question of this.questions) {
            if (!ignoreResetTypes) {
                if (question.resetType === RESET_TYPES.KEEP) continue;
                if (question.resetType === RESET_TYPES.INCREASE) {
                    let value = getFromLocalStorage(question.id) || 0;
                    value = String(parseInt(value) + 1)
                    setToLocalStorage(question.id, value);
                    question.value = value;
                    continue;
                }
            }
            question.clear();
            question.outlineColor = COLORS.NEUTRAL;
            removeFromLocalStorage(question.id);
        }
    }
}