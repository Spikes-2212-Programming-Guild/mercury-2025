export function setUpEventListeners(pageManager) {
    disableIOSZoom();
    setUpSwipeListeners(pageManager);
}

export function setUpSwipeListeners(pageManager) {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    document.addEventListener("touchstart", function (event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });
    document.addEventListener("touchend", function (event) {
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;

        let diffX = endX - startX;
        let distanceY = Math.abs(endY - startY);
        if (distanceY > 300) return;

        if (diffX > 200) pageManager.navigateByDirection(-1);
        else if (diffX < -200) pageManager.navigateByDirection(1);
    });
}

export function disableIOSZoom() {
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        let now = Date.now();
        // Allow normal clicks on buttons
        if (event.target.tagName === 'BUTTON' || event.target.closest('[role="button"]')) {
            return;
        }
        // Block double-tap zoom for everything else
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}