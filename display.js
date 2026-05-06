import { storage } from './storage.js';

const defaultOptions = {
    brightness: 1.0,
    color: 'rgb(255, 140, 10)',
    temperature: 0
};

// Round float to 2 decimal digits
function sum(initialValue, step) {
    return Number((initialValue + step).toFixed(2));
}

class Display {
    brightness = defaultOptions.brightness;
    temperature = defaultOptions.temperature;
    color = defaultOptions.color;

    constructor() {
        const savedOptions = {
            brightness: storage.load('brightness'),
            temperature: storage.load('temperature'),
            color: storage.load('color')
        };

        Object.assign(this, savedOptions);

        this.setBrightness(this.brightness);
        this.setTemperature(this.temperature);
        this.setColor(this.color);
    }

    setBrightness(level) {
        if (level == null || isNaN(level)) return;
        else if (level > 1) level = 1;
        else if (level < 0) level = 0;

        this.brightness = level;

        document.documentElement.style.setProperty('--brightness', this.brightness);
        storage.save('brightness', this.brightness);
    }

    incrementBrightness(step) {
        this.setBrightness(sum(this.brightness, step));
    }

    setColor(color) {
        if (!color) return;

        document.documentElement.style.setProperty('--overlay-color', color);
    }

    setTemperature(level) {
        if (level == null || isNaN(level)) return;
        else if (level > 1) level = 1;
        else if (level < 0) level = 0;

        this.temperature = level;

        document.documentElement.style.setProperty('--temperature', this.temperature);
        storage.save('temperature', this.temperature);
    }

    incrementTemperature(step) {
        this.setTemperature(sum(this.temperature, step));
    }

    reset() {
        this.setBrightness(defaultOptions.brightness);
        this.setTemperature(defaultOptions.temperature);
        this.setColor(defaultOptions.color);
    }
}

export const display = new Display();
