// Heart emoji configuration - change these with a single edit
const HEART_CONFIG = {
    dark: '🤍',    // White heart for dark theme
    light: '🖤'    // Black heart for light theme
};

import { setTextContent } from './dom.js';

export function applyTheme(isDarkMode, bodyElement, themeToggleElement) {
    bodyElement.classList.toggle('dark-mode', isDarkMode);
    themeToggleElement.classList.toggle('theme-toggle--toggled', !isDarkMode);
    updateHeartEmoji(isDarkMode);

    // Update heart emoji in all translated elements when theme changes
    updateHeartEmojiInTranslations(isDarkMode);
}

export function toggleTheme(bodyElement, themeToggleElement) {
    const currentIsDarkMode = bodyElement.classList.contains('dark-mode');
    const newIsDarkMode = !currentIsDarkMode;
    applyTheme(newIsDarkMode, bodyElement, themeToggleElement);
    localStorage.setItem('userThemePreference', newIsDarkMode ? 'dark' : 'light');
}

export function getPreferredThemeString(translationSet) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return translationSet.darkMode;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return translationSet.lightMode;
    return translationSet.notSpecified;
}

export function updatePreferredThemeDisplay(preferredThemeElement, translationSet) {
    setTextContent(preferredThemeElement, getPreferredThemeString(translationSet));
}

export function updateHeartEmoji(isDarkMode) {
    const heartElement = document.getElementById('footer-heart');
    if (heartElement) {
        // Use configuration object for theme-based heart emojis
        heartElement.textContent = isDarkMode ? HEART_CONFIG.dark : HEART_CONFIG.light;
    }
}

export function updateHeartEmojiInTranslations(isDarkMode) {
    // Update heart emoji in all elements that contain translated text with heart
    document.querySelectorAll('[data-translate="madeWithLove"]').forEach(el => {
        const currentText = el.textContent;
        // Replace both heart emojis with the appropriate one for current theme
        const newText = currentText.replace(/🤍|🖤/g, isDarkMode ? HEART_CONFIG.dark : HEART_CONFIG.light);
        if (newText !== currentText) {
            el.textContent = newText;
        }
    });
}
