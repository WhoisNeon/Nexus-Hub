import { setTextContent } from './dom.js';

export function applyTheme(isDarkMode, bodyElement, themeToggleElement) {
    bodyElement.classList.toggle('dark-mode', isDarkMode);
    themeToggleElement.classList.toggle('theme-toggle--toggled', !isDarkMode);
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
