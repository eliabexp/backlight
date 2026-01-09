import { Display } from './display.js';
import { Hints } from './hints.js';

const display = new Display();
const hints = new Hints();

const colorPicker = document.getElementById('select-color');

function setOptions(options) {
    hints.show();

    display.setBrightness(options.brightness);
    display.setColor(options.color);
    display.setTemperature(options.temperature);

    const newOptions = getOptions();

    localStorage.setItem('options', JSON.stringify(newOptions));
}

function getOptions() {
    const brightness = getComputedStyle(
        document.documentElement
    ).getPropertyValue('--brightness');
    const temperature = getComputedStyle(
        document.documentElement
    ).getPropertyValue('--temperature');

    // Color property is not retrieved because it's not being changed programmatically
    // and can be fetched directly from the color picker input when needed
    return {
        brightness: parseFloat(brightness),
        temperature: parseFloat(temperature)
    };
}

// Round float to 2 decimal places
function sum(initialValue, step) {
    return Number((initialValue + step).toFixed(2));
}

function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
}

// Events
document.addEventListener('DOMContentLoaded', () => {
    // Load options
    const options = JSON.parse(localStorage.getItem('options'));
    if (options) setOptions(options);

    // Prevent screen dimming
    navigator.wakeLock
        .request('screen')
        .catch((err) =>
            console.error(
                `It wasn't possible to prevent screen dimming: ${err.name}`
            )
        );

    hints.show(5000);
});
document.documentElement.addEventListener('mousemove', () => {
    hints.show(3000);
});

colorPicker.addEventListener('input', (e) => {
    const color = e.target.value;

    setOptions({ color, temperature: 1 });
});

// Triggers
document.addEventListener('dblclick', (e) => {
    toggleFullscreen();
});

document.addEventListener('keydown', (e) => {
    const key = e.key;
    const options = getOptions();

    const changeValue = e.ctrlKey ? 1 : 0.1;

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
            setOptions({ brightness: sum(options.brightness, changeValue) });
            break;

        case '-':
        case 'ArrowDown':
            setOptions({ brightness: sum(options.brightness, -changeValue) });
            break;

        // Temperature
        case 'ArrowRight':
            setOptions({ temperature: sum(options.temperature, changeValue) });
            break;

        case 'ArrowLeft':
            setOptions({ temperature: sum(options.temperature, -changeValue) });
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

    // Determine if horizontal or vertical swipe
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) sum(getOptions().temperature, 0.1);
        if (diffX < -50) sum(getOptions().temperature, -0.1);
    } else {
        if (diffY > 50) sum(getOptions().brightness, 0.1);
        if (diffY < -50) sum(getOptions().brightness, -0.1);
    }
}
