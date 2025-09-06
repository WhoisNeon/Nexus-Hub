const TOKEN = 'eb2978e07c2e4a5e9bcb8c40e5f68292';

import translations from './translations.js';

let currentLang = localStorage.getItem('userLanguage') || 'en';
let lastGeoData = null;

const elements = {
    // --- Core Layout & General UI ---
    body: document.body,
    preloader: document.querySelector('.preloader'),
    mainContainer: document.querySelector('#main-container'),
    header: document.querySelector('.header'),
    footer: document.querySelector('.footer'),
    videoBackground: document.querySelector('#video-background'),
    infoCards: document.querySelectorAll('.info-card'),

    // --- Header Controls ---
    themeToggle: document.querySelector('#theme-toggle-button'),
    languageSelector: document.querySelector('.language-selector'),
    languageButton: document.querySelector('.language-button'),
    languageDropdown: document.querySelector('.language-dropdown'),
    selectedFlag: document.querySelector('#selected-flag'),
    selectedLangText: document.querySelector('#selected-lang-text'),
    googleTranslateButton: document.querySelector('#google-translate-button'),

    // --- Network Card ---
    networkCardIcon: document.querySelector('#network-card-icon'),
    refreshNetworkButton: document.querySelector('#refresh-network-button'),
    ipDomainSearch: document.querySelector('#ip-domain-search'),
    searchButton: document.querySelector('#search-button'),
    ipAddress: document.querySelector('#ip-address'),
    ipv6Address: document.querySelector('#ipv6-address'),
    ipv4Item: document.querySelector('#ip-address-item'),
    ipv6Item: document.querySelector('#ipv6-item'),
    fetchGeoButton: document.querySelector('#fetch-geo-button'),
    geoFetchContainer: document.querySelector('.geo-fetch-container'),
    geolocationItems: document.querySelector('.geolocation-items'),
    country: document.querySelector('#country'),
    region: document.querySelector('#region'),
    regionItem: document.querySelector('#region-item'),
    city: document.querySelector('#city'),
    isp: document.querySelector('#isp'),
    organization: document.querySelector('#organization'),
    asn: document.querySelector('#asn'),
    ipTimezone: document.querySelector('#ip-timezone'),

    // --- Browser Card ---
    browserCardIcon: document.querySelector('#browser-card-icon'),
    browser: document.querySelector('#browser'),
    browserVersion: document.querySelector('#browser-version'),
    browserEngine: document.querySelector('#browser-engine'),
    userAgent: document.querySelector('#user-agent'),
    cookiesEnabled: document.querySelector('#cookies-enabled'),

    // --- System Card ---
    osIcon: document.querySelector('#os-icon'),
    os: document.querySelector('#os'),
    deviceType: document.querySelector('#device-type'),
    architecture: document.querySelector('#architecture'),
    cpuCores: document.querySelector('#cpu-cores'),
    memory: document.querySelector('#memory'),
    systemTimezone: document.querySelector('#system-timezone'),
    preferredTheme: document.querySelector('#preferred-theme'),

    // --- Display & Graphics Card ---
    screenResolution: document.querySelector('#screen-resolution'),
    viewportSize: document.querySelector('#viewport-size'),
    colorDepth: document.querySelector('#color-depth'),
    gpu: document.querySelector('#gpu'),
    pixelRatio: document.querySelector('#pixel-ratio'),

    // --- Security & Privacy Card ---
    httpsStatus: document.querySelector('#https-status'),
    dntStatus: document.querySelector('#dnt-status'),
    webrtcStatus: document.querySelector('#webrtc-status'),
    localStorage: document.querySelector('#local-storage'),
    sessionStorage: document.querySelector('#session-storage'),

    // --- Web Features Card ---
    javascriptEnabled: document.querySelector('#javascript-enabled'),
    webglSupport: document.querySelector('#webgl-support'),
    geolocationSupport: document.querySelector('#geolocation-support'),
    touchSupport: document.querySelector('#touch-support'),
    onlineStatus: document.querySelector('#online-status'),
};

function compressIPv6(address) {
    if (!address || !address.includes(':')) return address;

    let parts = address.split('::');
    let part1 = parts[0] ? parts[0].split(':') : [];
    let part2 = parts.length > 1 && parts[1] ? parts[1].split(':') : [];

    let fullAddress = [];
    if (parts.length > 1) {
        let missingParts = 8 - (part1.length + part2.length);
        fullAddress = [...part1, ...Array(missingParts).fill('0000'), ...part2];
    } else {
        fullAddress = address.split(':');
    }

    fullAddress = fullAddress.map(part => part.padStart(4, '0'));

    let longestStreak = { start: -1, len: 0 };
    let currentStreak = { start: -1, len: 0 };

    for (let i = 0; i < 8; i++) {
        if (fullAddress[i] === '0000') {
            if (currentStreak.start === -1) {
                currentStreak.start = i;
            }
            currentStreak.len++;
        } else {
            if (currentStreak.len > longestStreak.len) {
                longestStreak = { ...currentStreak };
            }
            currentStreak = { start: -1, len: 0 };
        }
    }
    if (currentStreak.len > longestStreak.len) {
        longestStreak = { ...currentStreak };
    }

    let compressed = fullAddress.map(part => parseInt(part, 16).toString(16));

    if (longestStreak.len > 1) {
        compressed.splice(longestStreak.start, longestStreak.len, '');
        if (longestStreak.start === 0) {
            compressed.unshift('');
        }
        if (longestStreak.start + longestStreak.len === 8) {
            compressed.push('');
        }
    }

    return compressed.join(':');
}

function translatePage() {
    const lang = currentLang;
    const translationSet = translations[lang] || translations['en'];

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translationSet[key]) {
            setTextContent(el, translationSet[key]);
        }
    });

    if (elements.ipDomainSearch) {
        elements.ipDomainSearch.placeholder = translationSet.ipSearchPlaceholder;
    }

    if (elements.fetchGeoButton) {
        setTextContent(elements.fetchGeoButton, translationSet.showGeoInfo);
    }

    loadBrowserAndSystemInfo(true);
    updateOnlineStatusIndicator(navigator.onLine);

    if (elements.ipDomainSearch) {
        elements.ipDomainSearch.value = '';
    }

    elements.refreshNetworkButton.disabled = false;
    if (elements.searchButton) elements.searchButton.disabled = false;
    fetchIPInfo();
}

function setLanguage(lang, langName, flagCode) {
    currentLang = lang;
    localStorage.setItem('userLanguage', lang);

    if (elements.selectedFlag) {
        if (flagCode === 'ir') {
            elements.selectedFlag.src = 'assets/ir.svg';
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

    translatePage();
}


const setTextContent = (element, text, translationKey = null) => {
    if (element) {
        let content;
        if (translationKey) {
            const translationSet = translations[currentLang] || translations['en'];
            content = translationSet[translationKey] || text;
            element.textContent = content;
        } else {
            content = text;
            element.textContent = content;
        }
    }
};

const setInnerHTML = (element, html, translationKey = null) => {
    if (element) {
        let content;
        if (translationKey) {
            const translationSet = translations[currentLang] || translations['en'];
            const statusText = translationSet[translationKey] || '';
            content = html.replace('STATUS_TEXT', statusText);
            element.innerHTML = content;
        } else {
            content = html;
            element.innerHTML = content;
        }
    }
};

const addCopyFeature = (elementId) => {
    const element = document.getElementById(elementId);
    if (element && !element.querySelector('.copy-button')) {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="ph ph-clipboard"></i>';
        copyButton.setAttribute('aria-label', `Copy ${element.id.replace(/-/g, ' ')}`);

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

const canCopy = (id, content) => {
    if (!content) return false;
    const t = translations[currentLang] || translations.en;
    const invalidKeys = ['unknown', 'unavailable', 'invalidIP', 'notDetected'];
    const invalidValues = invalidKeys.map(key => t[key]);
    return !invalidValues.includes(content.trim());
};

const setCopy = (id, content) => {
    const el = document.getElementById(id);
    if (el && canCopy(id, content)) addCopyFeature(id);
};

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

function getBrowserInfo() {
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

function updateBrowserIcon(browserInfo) {
    if (!elements.browserCardIcon) return;

    if (browserInfo.name === 'Samsung Internet') {
        setInnerHTML(elements.browserCardIcon, `<i class="ph-fill ph-planet" style="rotate: -10deg;"></i>`);
    } else if (browserInfo.svg) {
        const divHtml = `<div class="browser-logo" style="--svg-url: url('https://cdn.jsdelivr.net/npm/simple-icons@12.4.0/icons/${browserInfo.svg}.svg');"></div>`;
        setInnerHTML(elements.browserCardIcon, divHtml);
    } else {
        setInnerHTML(elements.browserCardIcon, `<i class="ph-fill ph-browser"></i>`);
    }
}

function getOSInfo() {
    const userAgent = navigator.userAgent;
    const isIPad = /iPad/.test(userAgent) || (/Macintosh/.test(userAgent) && 'ontouchend' in document);

    const osChecks = [
        { name: 'Windows 11', regex: /Windows NT 10\.0; Win64; x64/i, icon: 'ph-windows-logo', device: 'Desktop' },
        { name: 'Windows 10', regex: /Windows NT 10\.0/i, icon: 'ph-windows-logo', device: 'Desktop' },
        { name: 'Windows 8.1', regex: /Windows NT 6\.3/i, icon: 'ph-windows-logo', device: 'Desktop' },
        { name: 'Windows 8', regex: /Windows NT 6\.2/i, icon: 'ph-windows-logo', device: 'Desktop' },
        { name: 'Windows 7', regex: /Windows NT 6\.1/i, icon: 'ph-windows-logo', device: 'Desktop' },
        { name: 'macOS', regex: /Macintosh|Mac OS X/, icon: 'ph-apple-logo', device: 'Desktop' },
        { name: 'Android', regex: /Android/, icon: 'ph-android-logo', device: 'Mobile' },
        { name: 'iOS', regex: /iPhone/, icon: 'ph-apple-logo', device: 'Mobile' },
        { name: 'iOS', regex: /iPad/, icon: 'ph-apple-logo', device: 'Tablet' },
        { name: 'Chrome OS', regex: /CrOS/, icon: 'ph-google-logo', device: 'Desktop' },
        { name: 'Ubuntu', regex: /Ubuntu/i, icon: 'ph-ubuntu-logo', device: 'Desktop' },
        { name: 'Linux', regex: /Linux/, icon: 'ph-linux-logo', device: 'Desktop' },
    ];

    let osResult = osChecks.find(os => os.regex.test(userAgent));
    if (!osResult) {
        osResult = { name: 'Unknown', icon: 'ph-desktop' };
    }

    if (isIPad) {
        osResult.name = 'iPadOS';
        osResult.icon = 'ph-apple-logo';
        osResult.device = 'Tablet';
    }

    return {
        os: osResult.name,
        deviceType: osResult.device,
        osIconClass: `ph-fill ${osResult.icon}`
    };
}

function getGPUInfo() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                let match;

                match = renderer.match(/(ANGLE \(Qualcomm, Adreno \(TM\) \d+, OpenGL ES \d\.\d\))/i);
                if (match && match[1]) { return match[1]; }
                match = renderer.match(/(NVIDIA (?:Tesla|A\d+|H\d+|L\d+)[A-Za-z0-9\s]*)/i);
                if (match && match[1]) { return match[1]; }
                match = renderer.match(/(NVIDIA GeForce (?:RTX|GTX|MX|Quadro) \d+[A-Za-z]*)/);
                if (match && match[1]) { return match[1]; }
                match = renderer.match(/(AMD Instinct (?:MI\d+))/i);
                if (match && match[1]) { return match[1]; }
                match = renderer.match(/(AMD Radeon(?:TM)?(?: Pro)?(?: \w+)?(?: Graphics)?(?: Mobile)?(?: Vega \d+)?(?: RX \d+)?(?: \d+M)?)/i);
                if (match && match[1]) { return match[1].replace(/\s*\(\w+\)$/, '').trim(); }
                match = renderer.match(/(Intel\(R\) Arc(?:[A-Za-z0-9\s]*?) Graphics)/i);
                if (match && match[1]) { return match[1]; }
                match = renderer.match(/(Intel\(R\) (?:Iris\(R\) Xe|Iris\(R\) Plus|HD Graphics \d+|UHD Graphics \d+|Xe Graphics))/);
                if (match && match[1]) { return match[1]; }
                match = renderer.match(/(Adreno(?:TM)? \d+)/i);
                if (match && match[1]) { return match[1]; }
                match = renderer.match(/((?:Mali|Apple)[\w\d\s-]*?(?:GPU)?(?:(?:MP)?\d)?)/i);
                if (match && match[1]) { return match[1].replace(/\s+\(.*?$/, '').trim(); }
                match = renderer.match(/(PowerVR(?:TM)? [\w\d\s-]*)/i);
                if (match && match[1]) { return match[1]; }
                match = renderer.match(/(Samsung Xclipse \d+)/i);
                if (match && match[1]) { return match[1]; }
                match = renderer.match(/(Microsoft Basic Render Driver|Microsoft Remote Desktop Graphics Adapter)/i);
                if (match && match[1]) { return match[1]; }
                match = renderer.match(/(Qualcomm Adreno|ARM Mali|Imagination PowerVR|Apple A\d+ GPU)/i);
                if (match && match[1]) { return match[1]; }

                return renderer;
            }
        }
    } catch (e) {
    }

    const translationSet = translations[currentLang] || translations['en'];
    return translationSet.notDetected;
}

function cleanCityName(cityName) {
    if (!cityName) {
        const translationSet = translations[currentLang] || translations['en'];
        return translationSet.unknown;
    }
    return cityName.replace(/\s*\(.*\)\s*/, '').trim();
}

function getTranslatedName(namesObject, lang) {
    if (!namesObject) return undefined;
    const baseLang = lang.split('-')[0];
    return namesObject[lang] || namesObject[baseLang] || namesObject['en'];
}

let preloaderHidden = false;
function hidePreloader() {
    if (preloaderHidden) return;
    preloaderHidden = true;

    if (elements.preloader && elements.mainContainer) {
        elements.preloader.classList.add('hidden');
        setTimeout(() => {
            elements.mainContainer.classList.add('loaded');
            elements.infoCards.forEach((card, index) => {
                card.style.transitionDelay = `${index * 100}ms`;
            });
        }, 600);

        setTimeout(() => {
            elements.preloader.classList.add('finished');
            elements.infoCards.forEach((card, index) => {
                card.style.transitionDelay = `0ms`;
            });
        }, 1000);
    }
}

function updateGeoButtonState() {
    if (!elements.fetchGeoButton) return;
    const t = translations[currentLang] || translations.en;
    const ipText = elements.ipAddress.textContent;
    const isInvalid = ipText === t.invalidIP || ipText === t.unavailable;
    elements.fetchGeoButton.disabled = isInvalid;
}

function resetGeolocationState() {
    if (elements.geoFetchContainer) {
        elements.geoFetchContainer.classList.remove('hidden');
    }
    if (elements.geolocationItems) {
        elements.geolocationItems.classList.add('hidden');
    }
    if (elements.fetchGeoButton) {
        elements.fetchGeoButton.disabled = false;
        setTextContent(elements.fetchGeoButton, '', 'showGeoInfo');
    }

    const geoElements = [
        elements.country, elements.region, elements.city,
        elements.isp, elements.organization, elements.asn, elements.ipTimezone
    ];
    geoElements.forEach(el => {
        if (el) setInnerHTML(el, '<i class="loading"></i>');
    });
    if (elements.regionItem) elements.regionItem.style.display = 'none';
    updateGeoButtonState();
}

function resetNetworkInfoState() {
    setInnerHTML(elements.ipAddress, '<i class="loading"></i>');
    setInnerHTML(elements.ipv6Address, '<i class="loading"></i>');
    resetGeolocationState();
}

const REFRESH_COOLDOWN = 2500;

function isValidIP(str) {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    return ipv4Regex.test(str) || ipv6Regex.test(str);
}

function displayGeoData(geoData) {
    const translationSet = translations[currentLang] || translations['en'];
    const country = getTranslatedName(geoData.country?.names, currentLang) || translationSet.unknown;
    const countryIso = geoData.country?.iso_code?.toLowerCase();

    if (elements.ipv6Item) {
        const ipv6AddressElement = elements.ipv6Address;
        if (ipv6AddressElement && ipv6AddressElement.textContent.trim() === translationSet.unavailable) {
            elements.ipv6Item.style.display = 'none';
        }
    }

    if (countryIso && elements.country) {
        elements.country.dataset.iso = countryIso;
    }

    let countryDisplay = country;
    if (countryIso) {
        let flagUrl;
        if (countryIso === 'ir') {
            flagUrl = `assets/ir.svg`;
        } else {
            flagUrl = `https://hatscripts.github.io/circle-flags/flags/${countryIso}.svg`;
        }
        const flagHtml = `
                    <span class="flag-container">
                        <i class="loading flag-loader"></i>
                        <img src="${flagUrl}" class="flag-icon" style="display: none;"
                             onload="this.style.display='inline-block'; this.previousElementSibling.style.display='none';"
                             onerror="this.parentElement.style.display='none';" />
                    </span>`;
        countryDisplay = `${country} ${flagHtml}`;
    }

    const city = cleanCityName(getTranslatedName(geoData.city?.names, currentLang));
    const region = getTranslatedName(geoData.subdivisions?.[0]?.names, currentLang);

    if (elements.regionItem && region && region.toLowerCase() !== city.toLowerCase()) {
        setTextContent(elements.region, region);
        elements.regionItem.style.display = 'flex';
    } else if (elements.regionItem) {
        elements.regionItem.style.display = 'none';
    }

    const isp = geoData.traits?.isp || geoData.traits?.autonomous_system_organization || translationSet.unavailable;
    const organization = geoData.traits?.organization || translationSet.unavailable;
    const asn = geoData.traits?.autonomous_system_number ? `AS${geoData.traits.autonomous_system_number}` : translationSet.unknown;
    const ipTimezone = geoData.location?.time_zone || translationSet.unknown;

    const organizationItem = elements.organization.parentElement;

    if (organization === isp || organization === translationSet.unavailable) {
        organizationItem.style.display = 'none';
    } else {
        organizationItem.style.display = 'flex';
        setTextContent(elements.organization, organization || translationSet.unavailable);
    }

    setInnerHTML(elements.country, countryDisplay);
    setTextContent(elements.city, city);
    setTextContent(elements.isp, isp);
    setTextContent(elements.asn, asn);
    setTextContent(elements.ipTimezone, ipTimezone);
}

let spamClicks = [];
const SPAM_LIMIT = 10;
const SPAM_WINDOW = 10000;
const SPAM_BLOCK_TIME = 15000;

function spamDetector() {
    const now = Date.now();
    spamClicks = spamClicks.filter(ts => now - ts < SPAM_WINDOW);
    spamClicks.push(now);
    if (spamClicks.length > SPAM_LIMIT) {
        if (elements.refreshNetworkButton) elements.refreshNetworkButton.disabled = true;
        if (elements.searchButton) elements.searchButton.disabled = true;
        if (elements.fetchGeoButton) elements.fetchGeoButton.disabled = true;
        setTimeout(() => {
            spamClicks = [];
            if (elements.refreshNetworkButton) elements.refreshNetworkButton.disabled = false;
            if (elements.searchButton) elements.searchButton.disabled = false;
            updateGeoButtonState();
        }, SPAM_BLOCK_TIME);
        showNotif('You are clicking too fast!<br>15 seconds cooldown applied.', 'warning', 5);
        return true;
    }
    return false;
}

async function resolveDomainToIP(domain) {
    // Cloudflare DoH
    try {
        const res = await fetch(`https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=A`, {
            headers: { 'accept': 'application/dns-json' }
        });
        if (res.ok) {
            const data = await res.json();
            const answer = data.Answer?.find(a => a.type === 1 && a.data);
            if (answer) return answer.data;
        } else {
            console.error('Cloudflare DNS error:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('Cloudflare DNS fetch failed:', err);
    }
    // Google DNS
    try {
        const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`);
        if (res.ok) {
            const data = await res.json();
            const answer = data.Answer?.find(a => a.type === 1 && a.data);
            if (answer) return answer.data;
        } else {
            console.error('Google DNS error:', res.status, res.statusText);
        }
    } catch (err) {
        console.error('Google DNS fetch failed:', err);
    }
    return null;
}

let isGeoFetchInstant = false;

async function fetchIPInfo(query = '', fetchGeo = false) {
    if (spamDetector()) return false;
    if (elements.refreshNetworkButton.disabled && !fetchGeo) return false;

    if (!fetchGeo) {
        elements.refreshNetworkButton.disabled = true;
        if (elements.searchButton) elements.searchButton.disabled = true;
        resetNetworkInfoState();
    }

    const t = translations[currentLang] || translations.en;
    const TIMEOUT = 10000;

    const finish = () => {
        hidePreloader();
        if (!fetchGeo) {
            elements.ipDomainSearch.value = query;
            elements.ipDomainSearch.placeholder = t.ipSearchPlaceholder;
            setTimeout(() => {
                elements.refreshNetworkButton.disabled = false;
                if (elements.searchButton) elements.searchButton.disabled = false;
            }, REFRESH_COOLDOWN);
        }
        updateGeoButtonState();
    };

    const raceTimeout = (ms, msg = 'Request timeout') =>
        new Promise((_, reject) => setTimeout(() => reject(new Error(msg)), ms));

    const fetchWithTimeout = (url, opts, ms = TIMEOUT) =>
        Promise.race([fetch(url, opts), raceTimeout(ms)]);

    const fetchUserIPs = async () => {
        const result = { ipv4: t.unavailable, ipv6: t.unavailable };
        const q4 = fetchWithTimeout('https://api.ipify.org?format=json')
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((d) => (result.ipv4 = d.ip || t.unavailable))
            .catch(() => (result.ipv4 = t.unavailable));
        const q6 = fetchWithTimeout('https://api6.ipify.org?format=json')
            .then((r) => (r.ok ? r.json() : Promise.reject()))
            .then((d) => (result.ipv6 = d.ip || t.unavailable))
            .catch(() => (result.ipv6 = t.unavailable));
        await Promise.allSettled([q4, q6]);
        return result;
    };

    const fetchGeoData = async (ip) => {
        if (!ip || ip === t.unavailable) return null;
        try {
            const res = await fetchWithTimeout(`https://api.findip.net/${ip}/?token=${TOKEN}`);
            if (!res.ok) throw new Error(`API responded with status: ${res.status}`);
            const data = await res.json();
            return data && typeof data === 'object' ? data : null;
        } catch (e) {
            return null;
        }
    };

    const showGeo = (geo) => {
        if (!geo) {
            lastGeoData = null;
            setTextContent(elements.country, t.unavailable);
            setTextContent(elements.city, t.unavailable);
            setTextContent(elements.isp, t.unavailable);
            setTextContent(elements.organization, t.unavailable);
            setTextContent(elements.asn, t.unavailable);
            setTextContent(elements.ipTimezone, t.unavailable);
            if (elements.regionItem) elements.regionItem.style.display = 'none';
            return;
        }
        lastGeoData = geo;
        displayGeoData(geo);
        const isp = geo.traits?.isp || geo.traits?.autonomous_system_organization || t.unavailable;
        const asn = geo.traits?.autonomous_system_number ? `AS${geo.traits.autonomous_system_number}` : t.unknown;
        setCopy('isp', isp);
        setCopy('asn', asn);
    };

    try {
        let processedQuery = query.trim();
        let effectiveIP = null;

        if (fetchGeo) {
            effectiveIP = elements.ipAddress.textContent.trim();
        } else {
            if (processedQuery) {
                let sanitizedInput = processedQuery;
                if (!sanitizedInput.startsWith('http://') && !sanitizedInput.startsWith('https://')) {
                    sanitizedInput = 'http://' + sanitizedInput;
                }
                try {
                    const url = new URL(sanitizedInput);
                    processedQuery = url.hostname;
                } catch (e) {
                    processedQuery = query.trim().split('/')[0];
                }
            }

            if (!processedQuery) {
                const { ipv4, ipv6 } = await fetchUserIPs();
                setTextContent(elements.ipAddress, ipv4);
                setTextContent(elements.ipv6Address, compressIPv6(ipv6));
                setCopy('ip-address', ipv4);
                setCopy('ipv6-address', compressIPv6(ipv6));
                elements.ipv4Item.style.display = 'flex';
                effectiveIP = ipv4;
                // Add this line to make the ipv6 item visible again when search input is empty.
                elements.ipv6Item.style.display = 'flex';

            } else if (isValidIP(processedQuery)) {
                effectiveIP = processedQuery;
                setTextContent(elements.ipAddress, effectiveIP);
                setTextContent(elements.ipv6Address, t.unavailable);
                setCopy('ip-address', effectiveIP);
                elements.ipv6Item.style.display = 'none';
                elements.ipv4Item.style.display = 'flex';

            } else {
                elements.ipDomainSearch.value = '';
                elements.ipDomainSearch.placeholder = t.resolvingDomain;

                const ipFromDomain = await resolveDomainToIP(processedQuery);

                if (ipFromDomain) {
                    effectiveIP = ipFromDomain;
                    setTextContent(elements.ipAddress, effectiveIP);
                    setCopy('ip-address', effectiveIP);
                    setTextContent(elements.ipv6Address, t.unavailable);
                    elements.ipv6Item.style.display = 'none';
                    elements.ipv4Item.style.display = 'flex';
                } else {
                    setTextContent(elements.ipAddress, '', 'invalidIP');
                    setTextContent(elements.ipv6Address, t.unavailable);
                    elements.ipv6Item.style.display = 'none';
                    showGeo(null);
                    finish();
                    return false;
                }
            }

            if (isGeoFetchInstant && !fetchGeo && effectiveIP && effectiveIP !== t.unavailable && effectiveIP !== t.invalidIP) {
                setTextContent(elements.fetchGeoButton, '', 'fetchingGeo');
                const geo = await fetchGeoData(effectiveIP);
                showGeo(geo);
                if (geo) {
                    elements.geoFetchContainer.classList.add('hidden');
                    elements.geolocationItems.classList.remove('hidden');
                } else {
                    setTextContent(elements.fetchGeoButton, '', 'showGeoInfo');
                }
            }
        }

        if (fetchGeo) {
            const geo = await fetchGeoData(effectiveIP);
            showGeo(geo);
            return !!geo;
        }
        return true;
    } catch (e) {
        setTextContent(elements.ipAddress, t.unavailable);
        setTextContent(elements.ipv6Address, t.unavailable);
        showGeo(null);
        return false;
    } finally {
        finish();
    }
}

async function handleFetchGeo() {
    const btn = elements.fetchGeoButton;
    btn.disabled = true;
    setTextContent(btn, '', 'fetchingGeo');

    const success = await fetchIPInfo(elements.ipDomainSearch.value, true);

    if (success) {
        if (elements.geoFetchContainer) {
            elements.geoFetchContainer.classList.add('hidden');
        }
        if (elements.geolocationItems) {
            elements.geolocationItems.classList.remove('hidden');
        }
    } else {
        btn.disabled = false;
        setTextContent(btn, '', 'showGeoInfo');
        const t = translations[currentLang] || translations.en;
        showNotif(t.geoFetchError, 'error', 5);
    }
}

function updateOnlineStatusIndicator(isOnline) {
    const onlineStatusElement = elements.onlineStatus;
    if (onlineStatusElement) {
        const translationSet = translations[currentLang] || translations['en'];
        const statusText = isOnline ? translationSet.online : translationSet.offline;
        const statusClass = isOnline ? 'online' : 'offline';
        const pingClass = isOnline ? 'ping' : '';
        const indicatorHtml = `<span class="status-indicator ${statusClass} ${pingClass}"></span>`;
        onlineStatusElement.innerHTML = `${statusText} ${indicatorHtml}`;
    }
}

function getPreferredThemeString() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'darkMode';
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'lightMode';
    return 'systemPreference';
}

function updatePreferredThemeDisplay() {
    setTextContent(elements.preferredTheme, '', getPreferredThemeString());
}

async function loadBrowserAndSystemInfo(isLanguageUpdate = false) {
    const browserInfo = getBrowserInfo();
    const { os, deviceType, osIconClass } = getOSInfo();
    const translationSet = translations[currentLang] || translations['en'];
    setTextContent(elements.browser, browserInfo.name);
    setTextContent(elements.browserVersion, browserInfo.version);
    setTextContent(elements.browserEngine, browserInfo.engine);
    updateBrowserIcon(browserInfo);
    const userAgentElement = elements.userAgent;
    if (userAgentElement) {
        const fullUserAgent = navigator.userAgent;

        userAgentElement.innerHTML = `
        <div class="user-agent-wrapper">
            <span class="user-agent-short"></span>
            <i class="ph-fill ph-caret-down"></i>
        </div>
        <div class="user-agent-expanded-content">
            <span class="user-agent-full"></span>
            <button class="ua-copy-button">Copy<i class="ph ph-clipboard"></i></button>
        </div>`;

        const userAgentShort = userAgentElement.querySelector('.user-agent-short');
        const userAgentFull = userAgentElement.querySelector('.user-agent-full');
        const uaCopyButton = userAgentElement.querySelector('.ua-copy-button');

        if (userAgentShort) userAgentShort.textContent = fullUserAgent;
        if (userAgentFull) userAgentFull.textContent = fullUserAgent;

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
    setTextContent(elements.cookiesEnabled, navigator.cookieEnabled ? translationSet.enabled : translationSet.disabled);
    updatePreferredThemeDisplay();
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
    const gpuInfo = getGPUInfo();
    const isNotDetected = (gpuInfo === translationSet.notDetected);
    if (isNotDetected) {
        setTextContent(elements.gpu, '', 'notDetected');
    } else {
        setTextContent(elements.gpu, gpuInfo);
    }
    setTextContent(elements.pixelRatio, window.devicePixelRatio || '1');
    setInnerHTML(elements.httpsStatus, location.protocol === 'https:' ?
        '<span class="security-badge secure">STATUS_TEXT</span>' :
        '<span class="security-badge insecure">STATUS_TEXT</span>', location.protocol === 'https:' ? 'secure' : 'insecure');
    setTextContent(elements.dntStatus, navigator.doNotTrack === '1' ? translationSet.enabled : (navigator.doNotTrack === '0' ? translationSet.disabled : translationSet.notSpecified));
    setTextContent(elements.webrtcStatus, window.RTCPeerConnection ? translationSet.supported : translationSet.notSupported);
    setTextContent(elements.localStorage, typeof (Storage) !== 'undefined' && localStorage ? translationSet.available : translationSet.notAvailable);
    setTextContent(elements.sessionStorage, typeof (Storage) !== 'undefined' && sessionStorage ? translationSet.available : translationSet.notAvailable);
    setTextContent(elements.javascriptEnabled, translationSet.enabled);
    setTextContent(elements.webglSupport, (() => { try { return !!(document.createElement('canvas').getContext('webgl')); } catch (e) { return false; } })() ? translationSet.supported : translationSet.notSupported);
    setTextContent(elements.geolocationSupport, 'geolocation' in navigator ? translationSet.supported : translationSet.notSupported);
    setTextContent(elements.touchSupport, ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ? translationSet.enabled : translationSet.disabled);
}

function applyTheme(isDarkMode) {
    elements.body.classList.toggle('dark-mode', isDarkMode);
    elements.themeToggle.classList.toggle('theme-toggle--toggled', !isDarkMode);
}

function toggleTheme() {
    const currentIsDarkMode = elements.body.classList.contains('dark-mode');
    const newIsDarkMode = !currentIsDarkMode;
    applyTheme(newIsDarkMode);
    localStorage.setItem('userThemePreference', newIsDarkMode ? 'dark' : 'light');
}

function lazyLoadVideo() {
    const videoBackground = elements.videoBackground;
    const videoSource = videoBackground.querySelector('source');
    if (videoSource && videoSource.dataset.src) {
        videoSource.src = videoSource.dataset.src;
        videoBackground.load();
        videoBackground.addEventListener('canplaythrough', function () {
            videoBackground.classList.add('loaded');
            videoBackground.play().catch(error => { });
        }, { once: true });
        videoSource.removeAttribute('data-src');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const initialLangLink = elements.languageDropdown.querySelector(`[data-lang="${currentLang}"]`);
    if (initialLangLink) {
        setLanguage(currentLang, initialLangLink.dataset.langName, initialLangLink.dataset.flagCode);
    } else {
        setLanguage('en', 'English', 'us');
    }

    elements.languageDropdown.addEventListener('click', (e) => {
        const link = e.target.closest('button[data-lang]');
        if (link) {
            e.preventDefault();
            setLanguage(link.dataset.lang, link.dataset.langName, link.dataset.flagCode);
            elements.languageSelector.classList.remove('active');
        }
    });

    elements.languageButton.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.languageSelector.classList.toggle('active');
        updateBorders();
    });

    function updateBorders() {
        const visibleButtons = elements.languageDropdown.querySelectorAll('button:not(.hidden)');

        elements.languageDropdown.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('first-visible', 'last-visible');
        });

        if (visibleButtons.length > 0) {
            visibleButtons[0].classList.add('first-visible');
            visibleButtons[visibleButtons.length - 1].classList.add('last-visible');
        }
    }

    window.addEventListener('click', (e) => {
        if (!elements.languageSelector.contains(e.target)) {
            elements.languageSelector.classList.remove('active');
        }
    });

    const flagImages = document.querySelectorAll('.language-dropdown img, .language-button img');
    const createFallbackContainer = () => {
        const container = document.createElement('div');
        container.className = 'fallback-icon-container';
        container.style.display = 'none';

        const icon = document.createElement('i');
        icon.className = 'ph ph-translate fallback-icon';

        container.appendChild(icon);
        return container;
    };

    flagImages.forEach(image => {
        const parent = image.parentNode;
        const fallbackContainer = createFallbackContainer();
        parent.insertBefore(fallbackContainer, image.nextSibling);

        image.addEventListener('error', function () {
            this.style.display = 'none';
            fallbackContainer.style.display = 'flex';
        });
    });

    const userThemePreference = localStorage.getItem('userThemePreference');
    const prefersDarkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (userThemePreference === 'dark') applyTheme(true);
    else if (userThemePreference === 'light') applyTheme(false);
    else applyTheme(prefersDarkMediaQuery.matches);

    elements.themeToggle.addEventListener('click', toggleTheme);
    elements.refreshNetworkButton?.addEventListener('click', () => {
        if (!spamDetector()) fetchIPInfo(elements.ipDomainSearch.value);
    });
    elements.ipDomainSearch.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !spamDetector()) fetchIPInfo(elements.ipDomainSearch.value);
    });
    elements.searchButton?.addEventListener('click', () => {
        if (!spamDetector()) fetchIPInfo(elements.ipDomainSearch.value);
    });

    if (elements.refreshNetworkButton) elements.refreshNetworkButton.disabled = false;
    if (elements.searchButton) elements.searchButton.disabled = false;

    lazyLoadVideo();

    if (window.matchMedia) {
        prefersDarkMediaQuery.addEventListener('change', (event) => {
            if (localStorage.getItem('userThemePreference') === null) applyTheme(event.matches);
            updatePreferredThemeDisplay();
        });
    }

    elements.fetchGeoButton?.addEventListener('click', handleFetchGeo);

    hidePreloader();
});

const handleScroll = () => { document.body.classList.toggle('scrolled', window.scrollY > 10); };
window.addEventListener('scroll', handleScroll);
window.addEventListener('online', () => updateOnlineStatusIndicator(true));
window.addEventListener('offline', () => updateOnlineStatusIndicator(false));
window.addEventListener('resize', () => setTextContent(elements.viewportSize, `${window.innerWidth}×${window.innerHeight}`));

elements.networkCardIcon.addEventListener('dblclick', async () => {
    const ip = elements.ipAddress.textContent.trim();
    const countryIso = elements.country.dataset.iso;
    if (ip && ip !== 'Unavailable' && countryIso) {
        const flag = String.fromCodePoint(...[...countryIso.toUpperCase()].map(char => 0x1F1E6 + char.charCodeAt(0) - 'A'.charCodeAt(0)));
        const textToCopy = `${flag}| \`${ip}\`\n`;
        try { await navigator.clipboard.writeText(textToCopy); } catch (err) { }
    }
});

elements.browserCardIcon.addEventListener('dblclick', async () => {
    elements.header.classList.toggle("hidden");
    elements.footer.classList.toggle("hidden");
    isGeoFetchInstant = !isGeoFetchInstant;
    handleFetchGeo();
    elements.networkCardIcon.classList.toggle('instant-geo-active', isGeoFetchInstant);
    elements.infoCards.forEach((card, index) => {
        if (index >= 2) {
            card.classList.toggle("hidden");
        }
    });
});

function adjustHeaderContent() {
    const headerLogo = document.querySelector('.header .logo');
    if (headerLogo) {
        if (window.innerWidth < 367) {
            headerLogo.textContent = 'Nexus';
        } else {
            headerLogo.textContent = 'Nexus Hub';
        }
    }
}

document.addEventListener('DOMContentLoaded', adjustHeaderContent);
window.addEventListener('resize', adjustHeaderContent);
history.scrollRestoration = 'manual';