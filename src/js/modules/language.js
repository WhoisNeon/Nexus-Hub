import { setTextContent } from '../utils/dom.js';

// Heart emoji configuration for theme-based replacement
const HEART_CONFIG = {
    dark: '🤍',    // White heart for dark theme
    light: '🖤'    // Black heart for light theme
};

export let currentLang = localStorage.getItem('userLanguage') || 'en';

export function setLanguage(lang, langName, flagCode, elements) {
    currentLang = lang;
    localStorage.setItem('userLanguage', lang);

    if (elements.selectedFlag) {
        if (flagCode === 'ir') {
            elements.selectedFlag.src = 'src/assets/ir.svg';
        } else {
            elements.selectedFlag.src = `https://hatscripts.github.io/circle-flags/flags/${flagCode}.svg`;
        }
    }
    if (elements.selectedLangText) {
        elements.selectedLangText.textContent = langName;
    }

    document.querySelectorAll('.language-dropdown button[data-lang]').forEach(link => {
        if (link.dataset.lang === lang) {
            link.classList.add('hidden');
        } else {
            link.classList.remove('hidden');
        }
    });

    if (lang === 'fa') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    translatePage(elements);
}

export function translatePage(elements) {
    const lang = currentLang;
    const translationSet = window.translations[lang] || window.translations['en'];
    const isDarkMode = document.body.classList.contains('dark-mode');

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translationSet[key]) {
            let translatedText = translationSet[key];
            // Replace {heart} placeholder with appropriate emoji based on theme
            translatedText = translatedText.replace('{heart}', isDarkMode ? HEART_CONFIG.dark : HEART_CONFIG.light);
            setTextContent(el, translatedText);
        }
    });

    if (elements.ipDomainSearch) {
        elements.ipDomainSearch.placeholder = translationSet.ipSearchPlaceholder;
    }

    if (elements.fetchGeoButton) {
        setTextContent(elements.fetchGeoButton, translationSet.showGeoInfo);
    }


    if (elements.ipDomainSearch) {
        elements.ipDomainSearch.value = '';
    }

    elements.refreshNetworkButton.disabled = false;
    if (elements.searchButton) elements.searchButton.disabled = false;
}

export function getTranslatedName(namesObject, lang) {
    if (!namesObject) return undefined;
    const baseLang = lang.split('-')[0];
    return namesObject[lang] || namesObject[baseLang] || namesObject['en'];
}
