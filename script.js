import { display } from './display.js';
import { hints } from './hints.js';
import { storage } from './storage.js';
import { setupControls } from './keybindings.js';

const colorPicker = document.getElementById('select-color');

function setOptions(options) {
    hints.show();

    display.setBrightness(options.brightness);
    display.setColor(options.color);
    display.setTemperature(options.temperature);

    const newOptions = getOptions();

    storage.save('options', newOptions);
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

document.addEventListener('DOMContentLoaded', () => {
    const options = storage.load('options');
    if (options) setOptions(options);

    navigator.wakeLock
        .request('screen')
        .catch((err) =>
            console.error(
                `It wasn't possible to prevent screen dimming: ${err.name}`
            )
        );

    hints.show(5000);

    setupControls();
});

colorPicker.addEventListener('input', (e) => {
    const color = e.target.value;

    setOptions({ color, temperature: 1 });
});
