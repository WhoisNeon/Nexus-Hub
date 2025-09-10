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

export function getPreferredThemeString() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'darkMode';
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'lightMode';
    return 'systemPreference';
}

export function updatePreferredThemeDisplay(preferredThemeElement) {
    setTextContent(preferredThemeElement, '', getPreferredThemeString());
}
