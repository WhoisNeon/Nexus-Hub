export const setTextContent = (element, text, translationKey = null) => {
    if (element) {
        let content;
        if (translationKey) {
            const translationSet = window.translations[window.currentLang] || window.translations['en'];
            content = translationSet[translationKey] || text;
            element.textContent = content;
        } else {
            content = text;
            element.textContent = content;
        }
    }
};

export const setInnerHTML = (element, html, translationKey = null) => {
    if (element) {
        let content;
        if (translationKey) {
            const translationSet = window.translations[window.currentLang] || window.translations['en'];
            const statusText = translationSet[translationKey] || '';
            content = html.replace('STATUS_TEXT', statusText);
            element.innerHTML = content;
        } else {
            content = html;
            element.innerHTML = content;
        }
    }
};
