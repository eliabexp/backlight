const defaultOptions = {
    brightness: 1,
    temperature: 0
};

const colorPicker = document.getElementById('select-color');
let isAnimatingTexts = false;
let textAnimationTimeout;

function changeBrightness(level) {
    if (isNaN(level)) return;
    else if (level > 1) level = 1;
    else if (level < 0) level = 0;

    document.documentElement.style.setProperty('--brightness', level);
}
function changeColor(color) {
    if (!color) return;

    document.documentElement.style.setProperty('--overlay-color', color);
}
function changeTemperature(level) {
    if (isNaN(level)) return;
    else if (level > 1) level = 1;
    else if (level < 0) level = 0;

    document.documentElement.style.setProperty('--temperature', level);
}

function setOptions(options) {
    showHints();

    changeBrightness(options.brightness);
    changeColor(options.color);
    changeTemperature(options.temperature);

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

// Increase / decrease
function increase(option, step) {
    setOptions({
        [option]: Number((getOptions()[option] + step).toFixed(2))
    });
}

function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
}

function showHints(duration) {
    const title = document.querySelector('.title');
    const instructions = document.querySelector('.instructions');

    const initial = (from) => ({
        opacity: 0,
        transform: `translateY(${from === 'top' ? '-60px' : '60px'})`
    });
    const animate = {
        opacity: 1,
        transform: 'translateY(0px)'
    };

    if (!isAnimatingTexts) {
        isAnimatingTexts = true;

        title.animate([initial('top'), animate], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'forwards'
        });
        instructions.animate([initial(), animate], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'forwards'
        });
    } else {
        clearTimeout(textAnimationTimeout);
    }

    if (!duration) return;

    textAnimationTimeout = setTimeout(() => {
        title.animate([animate, initial('top')], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'forwards'
        });
        instructions.animate([animate, initial()], {
            duration: 300,
            easing: 'ease-in-out',
            fill: 'forwards'
        });

        isAnimatingTexts = false;
    }, duration);
}

// Events
document.addEventListener('DOMContentLoaded', () => {
    // Load options
    const options = JSON.parse(localStorage.getItem('options'));
    if (options) setOptions(options);

    // Prevent screen dimming
    navigator.wakeLock.request("screen")
        .catch((err) => 
            console.error(`It wasn't possible to prevent screen dimming: ${err.name}`)
        );

    showHints(5000);
});
document.documentElement.addEventListener('mousemove', () => {
    showHints(3000);
});

colorPicker.addEventListener('input', (e) => {
    const color = e.target.value;

    console.log('changing color', color);

    setOptions({ color, temperature: 1 });
});

// Triggers
document.addEventListener('dblclick', (e) => {
    toggleFullscreen();
});

document.addEventListener('keydown', (e) => {
    const key = e.key;

    switch (key) {
        case 'f':
            toggleFullscreen();
            break;

        case 'r':
            setOptions(defaultOptions);
            break;

        // Brightness
        case '=':
        case 'ArrowUp':
            if (e.ctrlKey) increase('brightness', 1);
            else increase('brightness', 0.1);
            break;

        case '-':
        case 'ArrowDown':
            if (e.ctrlKey) increase('brightness', -1);
            increase('brightness', -0.1);
            break;

        // Temperature
        case 'ArrowRight':
            if (e.ctrlKey) increase('temperature', 1);
            increase('temperature', 0.1);
            break;

        case 'ArrowLeft':
            if (e.ctrlKey) increase('temperature', -1);
            increase('temperature', -0.1);
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

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) increase('temperature', 0.1);
        if (diffX < -50) increase('temperature', -0.1);
    } else {
        if (diffY > 50) increase('brightness', 0.1);
        if (diffY < -50) increase('brightness', -0.1);
    }
}
