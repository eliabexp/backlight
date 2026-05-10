import { display } from './display.js';
import { hints } from './hints.js';

function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
}

export function setupControls() {
    document.documentElement.addEventListener('mousemove', () => {
        hints.show(3000);
    });

    document.addEventListener('dblclick', () => {
        toggleFullscreen();
    });

    document.addEventListener('keydown', (e) => {
        const key = e.key;

        const step = e.ctrlKey ? 1 : 0.1;

        switch (key) {
            case 'f':
                toggleFullscreen();
                break;

            case 'r':
                display.reset();
                break;

            // Brightness
            case '=':
            case 'ArrowUp':
                display.incrementBrightness(step);
                break;

            case '-':
            case 'ArrowDown':
                display.incrementBrightness(-step);
                break;

            // Temperature
            case 'ArrowRight':
                display.incrementTemperature(step);
                break;

            case 'ArrowLeft':
                display.incrementTemperature(-step);
                break;
        }
    });

    let startX, startY, endX, endY;

    document.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    });
    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].screenX;
        endY = e.changedTouches[0].screenY;
        detectSwipe();
    });

    function detectSwipe() {
        let diffX = endX - startX;
        let diffY = endY - startY;

        const step = 0.1;

        const isVerticalSwipe = Math.abs(diffY) > Math.abs(diffX);
        if (isVerticalSwipe) {
            if (diffY > 50) display.incrementBrightness(-step);
            if (diffY < -50) display.incrementBrightness(step);
        } else {
            if (diffX > 50) display.incrementTemperature(step);
            if (diffX < -50) display.incrementTemperature(-step);
        }
    }
}
