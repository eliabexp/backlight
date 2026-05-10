const translations = {
    en: {
        controls:
            'Use <kbd>↑ ↓</kbd> to change brightness<br>Use <kbd>← →</kbd> to change temperature',
        'change-color': 'Change color'
    },
    pt: {
        controls:
            'Use <kbd>↑ ↓</kbd> para alterar o brilho<br>Use <kbd>← →</kbd> para alterar a temperatura',
        'change-color': 'Mudar cor'
    },
    es: {
        controls:
            'Use <kbd>↑ ↓</kbd> para cambiar el brillo<br>Use <kbd>← →</kbd> para cambiar la temperatura',
        'change-color': 'Cambiar color'
    }
}

function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]')

    elements.forEach((el) => {
        const key = el.getAttribute('data-i18n')
        el.innerHTML = translations[lang][key] || key
    })
}

function detectLang() {
    const available = Object.keys(translations)
    for (const locale of navigator.languages ?? [navigator.language]) {
        if (available.includes(locale)) return locale
        const prefix = locale.split('-')[0]
        if (available.includes(prefix)) return prefix
    }

    return 'en'
}

applyTranslations(detectLang())
