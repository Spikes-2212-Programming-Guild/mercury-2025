import {TELEOP_START_TIME_MS} from "../config/constants.js";

export class GameRemindManager {
    initialize(questionManager, pageManager) {
        this.questionManager = questionManager;
        this.pageManager = pageManager;
        this.resetGame();
    }

    resetGame() {
        this.gameStarted = false;

        for (const questionObject of this.questionManager.questions) {
            if (questionObject.id === "left_starting_line") {
                questionObject.element.addEventListener("click", () => {
                    if (!this.gameStarted && questionObject.isValid() && this.pageManager.currentPageName === "Auto") {
                        setTimeout(() => this.pageManager.navigateTo(2), TELEOP_START_TIME_MS);
                    }
                })
                break;
            }
        }
    }
}
