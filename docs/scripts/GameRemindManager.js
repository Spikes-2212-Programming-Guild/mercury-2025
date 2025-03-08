import {TELEOP_START_TIME_MS} from "../config/constants.js";

export class GameRemindManager {
    initialize(questionManager, pageManager) {
        this.questionManager = questionManager;
        this.pageManager = pageManager;
        this.resetGame();
    }

    checkIfStarted() {
        if (this.gameStarted) return;

        for (const questionObject of this.questionManager.questions) {
            if (questionObject.id === "left_starting_line" && questionObject.isValid()) {
                this.gameStarted = true;
                clearInterval(this.checkInterval); // Stop checking
                if (this.pageManager.currentPageName === "Auto") {
                    this.notifyUserAfterDelay(); // Schedule notification
                }
                break;
            }
        }
    }

    resetGame() {
        this.gameStarted = false;
        this.checkInterval = setInterval(() => this.checkIfStarted(), 100);
    }

    notifyUserAfterDelay() {
        setTimeout(() => {
            this.showNotification("Teleop Started!");
        }, TELEOP_START_TIME_MS);
    }

    showNotification(message) {
        let notification = document.createElement("div");
        notification.classList.add("notification");
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => notification.remove(), 500); // Remove after fade-out
        }, 1500);
    }
}
