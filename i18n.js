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
    }
}

function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-i18n]')

    elements.forEach((el) => {
        const key = el.getAttribute('data-i18n')
        el.innerHTML = translations[lang][key] || key
    })
}

const userLang = navigator.language || navigator.userLanguage
const lang = userLang.startsWith('pt') ? 'pt' : 'en'

applyTranslations(lang)
