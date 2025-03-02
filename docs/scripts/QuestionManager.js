import {config, QUESTION_TYPES} from "./Config.js";

export class QuestionManager {
    constructor() {
        this.questions = [];
        this.questionTypes = new Map();
    }

    initialize() {
        this.registerAllQuestionTypes();
    }

    registerAllQuestionTypes(questionManager) {
        for (const [typeId, questionClass] of Object.entries(QUESTION_TYPES)) {
            questionManager.registerQuestionType(typeId, questionClass);
        }
    }

    registerQuestionType(typeId, questionClass) {
        if (typeof questionClass !== 'function') {
            throw new TypeError(`Invalid question class type for ${typeId}`);
        }
        this.questionTypes.set(typeId, questionClass);
    }

    createQuestion(question) {
        const QuestionClass = this.questionTypes.get(question.type);
        if (!QuestionClass) throw new Error(`Unknown question type: ${question.type}`);
        const questionObject = new QuestionClass(question);
        this.questions.push(questionObject);
        return questionObject;
    }

    clearAnswers(ignoreResetTypes = false) {
        for (const question of this.questions) {
            if (ignoreResetTypes) {
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