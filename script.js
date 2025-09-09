function changeBrightness(level) {
    if (!level || level < 0 || level > 1) return;

    document.documentElement.style.setProperty('--brightness', level);
}
function changeTemperature(level) {
    if (!level || level < 0 || level > 1) return;

    document.documentElement.style.setProperty('--temperature', level);
}

function changeProperties(properties) {
    changeBrightness(properties.brightness);
    changeTemperature(properties.temperature);

    const newProperties = { ...getProperties(), ...properties };

    localStorage.setItem('properties', JSON.stringify(newProperties));
}

function getProperties() {
    const brightness = getComputedStyle(document.documentElement).getPropertyValue('--brightness');
    const temperature = getComputedStyle(document.documentElement).getPropertyValue('--temperature');

    return {
        brightness: parseFloat(brightness),
        temperature: parseFloat(temperature)
    }
}

function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
}

// Load
document.addEventListener("DOMContentLoaded", () => {
    const properties = JSON.parse(localStorage.getItem('properties'));
    if (properties) changeProperties(properties);
});

// Triggers
document.addEventListener('dblclick', (e) => {
    toggleFullscreen();
})

document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key === '=' || key === 'ArrowUp') {
        changeProperties({ brightness: getProperties().brightness + 0.1 });        
    }
    else if (key === '-' || key === 'ArrowDown') {
        changeProperties({ brightness: getProperties().brightness - 0.1 });
    }
    else if (key === 'ArrowRight') {
        changeProperties({ temperature: getProperties().temperature + 0.1 });
    }
    else if (key === 'ArrowLeft') {
        changeProperties({ temperature: getProperties().temperature - 0.1 });
    }
})

let startX, startY, endX, endY;

document.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
});
document.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].screenX;
    endY = e.changedTouches[0].screenY;
    detectSwipe();
});

function detectSwipe() {
    let diffX = endX - startX;
    let diffY = endY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) changeProperties({ temperature: getProperties().temperature + 0.1 });
        if (diffX < -50) changeProperties({ temperature: getProperties().temperature - 0.1 });
    } else {
        if (diffY < -50) changeProperties({ brightness: getProperties().brightness + 0.1 });
        if (diffY > 50) changeProperties({ brightness: getProperties().brightness - 0.1 });
    }
}