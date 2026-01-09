const defaultOptions = {
    brightness: 1.0,
    color: 'rgb(255, 140, 10)',
    temperature: 0
};

export class Display {
    constructor() {
        this.brightness = defaultOptions.brightness;
        this.color = defaultOptions.color;
        this.temperature = defaultOptions.temperature;
    }

    setBrightness(level) {
        if (isNaN(level)) return;
        else if (level > 1) level = 1;
        else if (level < 0) level = 0;

        this.brightness = level;
        document.documentElement.style.setProperty('--brightness', level);
    }

    setColor(color) {
        if (!color) return;

        document.documentElement.style.setProperty('--overlay-color', color);
    }

    setTemperature(level) {
        if (isNaN(level)) return;
        else if (level > 1) level = 1;
        else if (level < 0) level = 0;

        document.documentElement.style.setProperty('--temperature', level);
    }

    reset() {
        this.setBrightness(defaultOptions.brightness);
        this.setTemperature(defaultOptions.temperature);
        this.setColor(defaultOptions.color);
    }
}
