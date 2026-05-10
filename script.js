import { display } from './display.js';
import { hints } from './hints.js';
import { setupControls } from './keybindings.js';

const colorPicker = document.getElementById('select-color');

document.addEventListener('DOMContentLoaded', () => {
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

    display.setColor(color);
});
