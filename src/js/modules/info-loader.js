import { setTextContent, setInnerHTML } from '../utils/dom.js';
import { getBrowserInfo, updateBrowserIcon, getBrowserLanguage, adblockerDetector} from '../utils/browser.js';
import { getOSInfo, getGPUInfo } from '../utils/system.js';
import { getPreferredThemeString, updatePreferredThemeDisplay } from '../utils/theme.js';
import { currentLang } from './language.js';

export function updateOnlineStatusIndicator(isOnline, onlineStatusElement) {
    if (onlineStatusElement) {
        const translationSet = window.translations[currentLang] || window.translations['en'];
        const statusText = isOnline ? translationSet.online : translationSet.offline;
        const statusClass = isOnline ? 'online' : 'offline';
        const pingClass = isOnline ? 'ping' : '';
        const indicatorHtml = `<span class="status-indicator ${statusClass} ${pingClass}"></span>`;
        onlineStatusElement.innerHTML = `${statusText} ${indicatorHtml}`;
    }
}

export async function loadBrowserAndSystemInfo(elements, isLanguageUpdate = false) {
    const browserInfo = getBrowserInfo();
    const { os, deviceType, osIconClass } = getOSInfo();
    const translationSet = window.translations[currentLang] || window.translations['en'];
    setTextContent(elements.browser, browserInfo.name);
    setTextContent(elements.browserVersion, browserInfo.version);
    setTextContent(elements.browserEngine, browserInfo.engine);
    updateBrowserIcon(browserInfo, elements.browserCardIcon);
    const userAgentElement = elements.userAgent;
    if (userAgentElement) {
        const fullUserAgent = navigator.userAgent;
        let userAgentShort = userAgentElement.querySelector('.user-agent-short');
        let userAgentFull = userAgentElement.querySelector('.user-agent-full');
        let uaCopyButton = userAgentElement.querySelector('.ua-copy-button');

        if (!userAgentShort) { // If the structure doesn't exist, create it
            userAgentElement.innerHTML = `
            <div class="user-agent-wrapper">
                <span class="user-agent-short"></span>
                <i class="ph-fill ph-caret-down"></i>
            </div>
            <div class="user-agent-expanded-content">
                <span class="user-agent-full"></span>
                <button class="ua-copy-button">Copy<i class="ph ph-clipboard"></i></button>
            </div>`;

            userAgentShort = userAgentElement.querySelector('.user-agent-short');
            userAgentFull = userAgentElement.querySelector('.user-agent-full');
            uaCopyButton = userAgentElement.querySelector('.ua-copy-button');

            userAgentElement.addEventListener('click', (e) => {
                if (e.target.closest('.ua-copy-button')) {
                    return;
                }
                if (window.getSelection().toString().length > 0) return;
                userAgentElement.classList.toggle('expanded');
            });

            uaCopyButton.addEventListener('click', async (e) => {
                e.stopPropagation();
                try {
                    await navigator.clipboard.writeText(fullUserAgent);
                    uaCopyButton.innerHTML = 'Copied<i class="ph ph-check"></i>';
                    setTimeout(() => {
                        uaCopyButton.innerHTML = 'Copy<i class="ph ph-clipboard"></i>';
                    }, 1500);
                } catch (err) {
                    uaCopyButton.textContent = 'Failed';
                }
            });
        }

        if (userAgentShort) userAgentShort.textContent = fullUserAgent;
        if (userAgentFull) userAgentFull.textContent = fullUserAgent;
    }
    setTextContent(elements.browserLanguage, getBrowserLanguage());
    adblockerDetector(translationSet).then(adblockStatus => {
        setTextContent(elements.adblockStatus, adblockStatus);
    }).catch(() => {
        setTextContent(elements.adblockStatus, translationSet.unavailable);
    });
    setTextContent(elements.cookiesEnabled, navigator.cookieEnabled ? translationSet.enabled : translationSet.disabled);
    updatePreferredThemeDisplay(elements.preferredTheme, translationSet);
    setTextContent(elements.os, os);
    setTextContent(elements.deviceType, deviceType);
    if (elements.osIcon) {
        setInnerHTML(elements.osIcon, `<i class="${osIconClass}"></i>`);
    }
    setTextContent(elements.architecture, navigator.platform || translationSet.unknown);
    setTextContent(elements.cpuCores, navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency}` : translationSet.unknown);
    setTextContent(elements.memory, navigator.deviceMemory ? `${navigator.deviceMemory} GB` : translationSet.unknown);
    setTextContent(elements.systemTimezone, Intl.DateTimeFormat().resolvedOptions().timeZone || translationSet.unknown);
    setTextContent(elements.screenResolution, `${screen.width}×${screen.height}`);
    setTextContent(elements.viewportSize, `${window.innerWidth}×${window.innerHeight}`);
    setTextContent(elements.colorDepth, `${screen.colorDepth}-bit`);
    const gpuInfo = getGPUInfo(window.translations, currentLang);
    const isNotDetected = (gpuInfo === translationSet.notDetected);
    if (isNotDetected) {
        setTextContent(elements.gpu, '', 'notDetected');
    } else {
        setTextContent(elements.gpu, gpuInfo);
    }
    setTextContent(elements.pixelRatio, window.devicePixelRatio || '1');
    setInnerHTML(elements.httpsStatus, location.protocol === 'https:' ?
        `<span class="security-badge secure">${translationSet.secure}</span>` :
        `<span class="security-badge insecure">${translationSet.insecure}</span>`);
    setTextContent(elements.dntStatus, navigator.doNotTrack === '1' ? translationSet.enabled : (navigator.doNotTrack === '0' ? translationSet.disabled : translationSet.notSpecified));
    setTextContent(elements.webrtcStatus, window.RTCPeerConnection ? translationSet.supported : translationSet.notSupported);
    setTextContent(elements.localStorage, typeof (Storage) !== 'undefined' && localStorage ? translationSet.available : translationSet.notAvailable);
    setTextContent(elements.sessionStorage, typeof (Storage) !== 'undefined' && sessionStorage ? translationSet.available : translationSet.notAvailable);
    setTextContent(elements.javascriptEnabled, translationSet.enabled);
    setTextContent(elements.webglSupport, (() => { try { return !!(document.createElement('canvas').getContext('webgl')); } catch (e) { return false; } })() ? translationSet.supported : translationSet.notSupported);
    setTextContent(elements.geolocationSupport, 'geolocation' in navigator ? translationSet.supported : translationSet.notSupported);
    setTextContent(elements.touchSupport, ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ? translationSet.enabled : translationSet.disabled);
}
