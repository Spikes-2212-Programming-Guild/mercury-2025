export class QuestionManager {
    constructor() {
        this.questions = [];
    }

    createQuestion(question) {
        const QuestionClass = question.type;
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