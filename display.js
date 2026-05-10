import { Storage } from './storage.js';

const defaultOptions = {
    brightness: 1,
    color: 'rgb(255, 140, 10)',
    temperature: 0
};

// Round float to 2 decimal digits
function sum(initialValue, step) {
    return Number((initialValue + step).toFixed(2));
}

class Display {
    storage = new Storage('display');
    brightness = defaultOptions.brightness;
    temperature = defaultOptions.temperature;
    color = defaultOptions.color;

    constructor() {
        const savedOptions = {
            brightness: this.storage.get('brightness') ?? defaultOptions.brightness,
            temperature: this.storage.get('temperature') ?? defaultOptions.temperature,
            color: this.storage.get('color') ?? defaultOptions.color
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

        document.documentElement.style.setProperty(
            '--brightness',
            this.brightness
        );
        this.storage.set('brightness', this.brightness);
    }

    incrementBrightness(step) {
        this.setBrightness(sum(this.brightness, step));
    }

    setColor(color) {
        if (!color) return;

        this.color = color;

        document.documentElement.style.setProperty('--overlay-color', color);
        this.storage.set('color', color);
    }

    setTemperature(level) {
        if (level == null || isNaN(level)) return;
        else if (level > 1) level = 1;
        else if (level < 0) level = 0;

        this.temperature = level;

        document.documentElement.style.setProperty(
            '--temperature',
            this.temperature
        );
        this.storage.set('temperature', this.temperature);
    }

    incrementTemperature(step) {
        this.setTemperature(sum(this.temperature, step));
    }

    reset() {
        this.storage.clear();

        this.setBrightness(defaultOptions.brightness);
        this.setTemperature(defaultOptions.temperature);
        this.setColor(defaultOptions.color);
    }
}

export const display = new Display();
