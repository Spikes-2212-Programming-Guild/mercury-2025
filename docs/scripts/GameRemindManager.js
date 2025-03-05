export class GameRemindManager {
    initialize(questionManager, pageManager) {
        this.questionManager = questionManager;
        this.pageManager = pageManager;
        this.resetGame();
    }

    checkIfStarted() {
        if (this.gameStarted) return;

        if (this.pageManager.currentPageName === "Teleop") {
            clearInterval(this.checkInterval); // Stop checking
            return;
        }

        for (const questionObject of this.questionManager.questions) {
            if (questionObject.id === "left_starting_line" && questionObject.isValid()) {
                this.gameStarted = true;
                clearInterval(this.checkInterval); // Stop checking
                this.notifyUserAfterDelay(); // Schedule notification
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
        }, 1000 * 15);
    }

    showNotification(message) {
        let notification = document.createElement("div");
        notification.textContent = message;
        notification.style.position = "fixed";
        notification.style.bottom = "82.5%";
        notification.style.left = "50%";
        notification.style.transform = "translateX(-50%)";
        notification.style.background = "rgba(0, 0, 0, 0.5)";
        notification.style.borderRadius = "20%";
        notification.style.color = "white";
        notification.style.padding = "4%";
        notification.style.fontSize = "3em";
        notification.style.zIndex = "1000";
        notification.style.transition = "opacity 0.3s ease";
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => notification.remove(), 500); // Remove after fade-out
        }, 750);
    }
}
