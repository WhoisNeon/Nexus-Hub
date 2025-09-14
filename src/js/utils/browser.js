import { setInnerHTML } from './dom.js';

const browserDefinitions = [
    {
        name: 'Arc Browser',
        engine: 'Blink',
        svg: 'arc',
        test: () => !!getComputedStyle(document.documentElement).getPropertyValue('--arc-palette-title'),
        version: (ua) => ua.match(/Chrome\/([0-9.]+)/)?.[1],
    },
    {
        name: 'Brave',
        engine: 'Blink',
        svg: 'brave',
        test: () => !!navigator.brave,
        version: (ua) => ua.match(/Chrome\/([0-9.]+)/)?.[1],
    },
    {
        name: 'Opera GX',
        engine: 'Blink',
        svg: 'operagx',
        test: (ua) => ua.includes('Opera GX'),
        version: (ua) => ua.match(/(Opera|OPR|Opera GX)\/([0-9.]+)/)?.[2],
    },
    {
        name: 'Opera',
        engine: 'Blink',
        svg: 'opera',
        test: (ua) => ua.includes('Opera') || ua.includes('OPR'),
        version: (ua) => ua.match(/(Opera|OPR)\/([0-9.]+)/)?.[2],
    },
    {
        name: 'Vivaldi',
        engine: 'Blink',
        svg: 'vivaldi',
        test: (ua) => ua.includes('Vivaldi'),
        version: (ua) => ua.match(/Vivaldi\/([0-9.]+)/)?.[1],
    },
    {
        name: 'Microsoft Edge',
        engine: 'Blink',
        svg: 'microsoftedge',
        test: (ua) => ua.includes('Edg'),
        version: (ua) => ua.match(/Edg\/([0-9.]+)/)?.[1],
    },
    {
        name: 'Samsung Internet',
        engine: 'Blink',
        svg: null,
        test: (ua) => ua.includes('SamsungBrowser'),
        version: (ua) => ua.match(/SamsungBrowser\/([0-9.]+)/)?.[1],
    },
    {
        name: 'DuckDuckGo',
        engine: 'WebKit',
        svg: 'duckduckgo',
        test: (ua) => ua.includes('DuckDuckGo'),
        version: (ua) => ua.match(/DuckDuckGo\/([0-9.]+)/)?.[1],
    },
    {
        name: 'Tor Browser',
        engine: 'Gecko',
        svg: 'torbrowser',
        test: (ua) => ua.includes('Tor'),
        version: (ua) => ua.match(/Firefox\/([0-9.]+)/)?.[1],
    },
    {
        name: 'Firefox',
        engine: 'Gecko',
        svg: 'firefoxbrowser',
        test: (ua) => ua.includes('Firefox'),
        version: (ua) => ua.match(/Firefox\/([0-9.]+)/)?.[1],
    },
    {
        name: 'Google Chrome',
        engine: 'Blink',
        svg: 'googlechrome',
        test: (ua) => ua.includes('Chrome'),
        version: (ua) => ua.match(/Chrome\/([0-9.]+)/)?.[1],
    },
    {
        name: 'Safari',
        engine: 'WebKit',
        svg: 'safari',
        test: (ua) => ua.includes('Safari') && !ua.includes('Chrome'),
        version: (ua) => ua.match(/Version\/([0-9.]+)/)?.[1],
    },
    {
        name: 'Internet Explorer',
        engine: 'Trident',
        svg: 'internetexplorer',
        test: (ua) => ua.includes('MSIE') || ua.includes('Trident'),
        version: (ua) => ua.match(/(MSIE |rv:)([0-9.]+)/)?.[2],
    }
];

export function getBrowserInfo() {
    const ua = navigator.userAgent;

    for (const browser of browserDefinitions) {
        if (browser.test(ua)) {
            return {
                name: browser.name,
                version: browser.version(ua) || 'Unknown',
                engine: browser.engine,
                svg: browser.svg,
            };
        }
    }

    return { name: 'Unknown', version: 'Unknown', engine: 'Unknown', svg: null };
}

export function updateBrowserIcon(browserInfo, browserCardIconElement) {
    if (!browserCardIconElement) return;

    if (browserInfo.name === 'Samsung Internet') {
        setInnerHTML(browserCardIconElement, `<i class="ph-fill ph-planet" style="rotate: -10deg;"></i>`);
    } else if (browserInfo.svg) {
        const divHtml = `<div class="browser-logo" style="--svg-url: url('https://cdn.jsdelivr.net/npm/simple-icons@12.4.0/icons/${browserInfo.svg}.svg');"></div>`;
        setInnerHTML(browserCardIconElement, divHtml);
    } else {
        setInnerHTML(browserCardIconElement, `<i class="ph-fill ph-browser"></i>`);
    }
}

export function getBrowserLanguage() {
    return navigator.language || navigator.userLanguage || 'Unknown';
}

export function adblockerDetector(translationSet) {
    if (window.detectAdBlock && typeof window.detectAdBlock === 'function') {
        return window.detectAdBlock().then(isBlocked => {
            return isBlocked ? translationSet.enabled : translationSet.notDetected;
        }).catch(() => {
            return translationSet.unavailable;
        });
    } else {
        return Promise.resolve(translationSet.unavailable);
    }
}
