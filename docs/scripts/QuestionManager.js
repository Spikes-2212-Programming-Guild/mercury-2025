import {COLORS, config, getFromLocalStorage, removeFromLocalStorage, RESET_TYPES, setToLocalStorage} from "./Config.js";

export class QuestionManager {
    constructor() {
        this.questions = [];
    }

    createQuestion(question, pageName) {
        const QuestionClass = question.type;
        const questionObject = new QuestionClass();
        question.pageName = pageName;
        Object.assign(questionObject, question);
        this.questions.push(questionObject);
        return questionObject;
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
            pageManager.navigateTo(config[0].name);
        } else {
            pageManager.navigateTo(pageManager.currentPageName);
        }
    }

    clearAllAnswers(ignoreResetTypes = false) {
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