import { setTextContent } from './dom.js';

export const addCopyFeature = (elementId) => {
    const element = document.getElementById(elementId);
    if (element && !element.querySelector('.copy-button')) {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="ph ph-clipboard"></i>';

        copyButton.onclick = async (e) => {
            e.stopPropagation();
            const textToCopy = element.childNodes[0].textContent.trim() || element.textContent.trim();

            try {
                await navigator.clipboard.writeText(textToCopy);

                copyButton.innerHTML = '<i class="ph ph-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="ph ph-clipboard"></i>';
                }, 1500);

            } catch (err) { }
        };
        element.appendChild(copyButton);
    }
};

export const canCopy = (id, content) => {
    if (!content) return false;
    const t = window.translations[window.currentLang] || window.translations.en;
    const invalidKeys = ['unknown', 'unavailable', 'invalidIP', 'notDetected'];
    const invalidValues = invalidKeys.map(key => t[key]);
    return !invalidValues.includes(content.trim());
};

export const setCopy = (id, content) => {
    const el = document.getElementById(id);
    if (el && canCopy(id, content)) addCopyFeature(id);
};
