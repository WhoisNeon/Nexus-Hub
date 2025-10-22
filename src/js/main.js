import translations from './standalone/translations.js';
import { setTextContent, setInnerHTML } from './utils/dom.js';
import { addCopyFeature, canCopy, setCopy } from './utils/copy.js';
import { applyTheme, toggleTheme, getPreferredThemeString, updatePreferredThemeDisplay } from './utils/theme.js';
import { compressIPv6, isValidIP, resolveDomainToIP } from './utils/network.js';
import { currentLang, setLanguage, translatePage, getTranslatedName } from './modules/language.js';
import { preloaderHidden, hidePreloader } from './modules/preloader.js';
import { lastGeoData, cleanCityName, displayGeoData, updateGeoButtonState, resetGeolocationState, resetNetworkInfoState, FINDIP_TOKEN, REFRESH_COOLDOWN, TIMEOUT, isLocal, spamDetector, fetchIPInfo, handleFetchGeo } from './modules/geolocation.js';
import { updateOnlineStatusIndicator, loadBrowserAndSystemInfo } from './modules/info-loader.js';

window.translations = translations;
window.currentLang = currentLang;
window.isGeoFetchInstant = false;

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
    clearSearchButton: document.querySelector('#clear-search-button'),
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
    browserLanguage: document.querySelector('#browser-language'),
    adblockStatus: document.querySelector('#adblock-status'),

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

import { showNotif, clearNotifications } from './standalone/notif.js';

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

function adjustHeaderContent() {
    const headerLogo = document.querySelector('.header .logo');
    if (headerLogo) {
        if (window.innerWidth < 400) {
            headerLogo.textContent = 'Nexus';
        } else {
            headerLogo.textContent = 'Nexus Hub';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const initialLangLink = elements.languageDropdown.querySelector(`[data-lang="${window.currentLang}"]`);
    if (initialLangLink) {
        setLanguage(window.currentLang, initialLangLink.dataset.langName, initialLangLink.dataset.flagCode, elements);
    } else {
        setLanguage('en', 'English', 'us', elements);
    }

    elements.languageDropdown.addEventListener('click', async (e) => {
        const link = e.target.closest('button[data-lang]');
        if (link) {
            e.preventDefault();
            clearNotifications();

            const wasGeoExpanded = elements.geolocationItems.classList.contains('hidden') === false;

            setLanguage(link.dataset.lang, link.dataset.langName, link.dataset.flagCode, elements);
            elements.languageSelector.classList.remove('active');
            loadBrowserAndSystemInfo(elements);
            updateOnlineStatusIndicator(navigator.onLine, elements.onlineStatus);
            const translationSet = window.translations[link.dataset.lang] || window.translations['en'];
            updatePreferredThemeDisplay(elements.preferredTheme, translationSet);

            const initialFetchSuccess = await fetchIPInfo('', false, elements, showNotif, compressIPv6, isValidIP, resolveDomainToIP);

            if (initialFetchSuccess && wasGeoExpanded) {
                handleFetchGeo(elements, fetchIPInfo, showNotif);
            }
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
    if (userThemePreference === 'dark') applyTheme(true, elements.body, elements.themeToggle);
    else if (userThemePreference === 'light') applyTheme(false, elements.body, elements.themeToggle);
    else applyTheme(prefersDarkMediaQuery.matches, elements.body, elements.themeToggle);

    elements.themeToggle.addEventListener('click', () => {
        const audio = new Audio('src/assets/switch.mp3');
        audio.volume = 0.1;
        audio.play().catch(error => console.log('Audio play failed:', error));
        toggleTheme(elements.body, elements.themeToggle);
    });
    elements.refreshNetworkButton?.addEventListener('click', () => {
        if (!spamDetector(elements, showNotif)) fetchIPInfo(elements.ipDomainSearch.value, false, elements, showNotif, compressIPv6, isValidIP, resolveDomainToIP);
    });
    elements.ipDomainSearch.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !spamDetector(elements, showNotif)) fetchIPInfo(elements.ipDomainSearch.value, false, elements, showNotif, compressIPv6, isValidIP, resolveDomainToIP);
    });
    elements.searchButton?.addEventListener('click', () => {
        if (!spamDetector(elements, showNotif)) fetchIPInfo(elements.ipDomainSearch.value, false, elements, showNotif, compressIPv6, isValidIP, resolveDomainToIP);
    });
    elements.clearSearchButton?.addEventListener('click', () => {
        elements.ipDomainSearch.value = '';
        elements.ipDomainSearch.focus();
        elements.ipDomainSearch.dataset.lastSearched = '';
        updateNetworkButtons();
    });

    lazyLoadVideo();

    if (window.matchMedia) {
        prefersDarkMediaQuery.addEventListener('change', (event) => {
            if (localStorage.getItem('userThemePreference') === null) applyTheme(event.matches, elements.body, elements.themeToggle);
            const translationSet = window.translations[currentLang] || window.translations['en'];
            updatePreferredThemeDisplay(elements.preferredTheme, translationSet);
        });
    }

    elements.fetchGeoButton?.addEventListener('click', () => handleFetchGeo(elements, fetchIPInfo, showNotif));

    elements.ipDomainSearch.addEventListener('input', updateNetworkButtons);
    updateNetworkButtons();

    hidePreloader(elements);
    loadBrowserAndSystemInfo(elements);
    updateOnlineStatusIndicator(navigator.onLine, elements.onlineStatus);
    fetchIPInfo('', false, elements, showNotif, compressIPv6, isValidIP, resolveDomainToIP);
});

const handleScroll = () => { document.body.classList.toggle('scrolled', window.scrollY > 25); };
window.addEventListener('scroll', handleScroll);
window.addEventListener('online', () => updateOnlineStatusIndicator(true, elements.onlineStatus));
window.addEventListener('offline', () => updateOnlineStatusIndicator(false, elements.onlineStatus));
window.addEventListener('resize', () => setTextContent(elements.viewportSize, `${window.innerWidth}×${window.innerHeight}`));

elements.networkCardIcon.addEventListener('dblclick', async () => {
    const ip = elements.ipAddress.textContent.trim();
    let countryIso = elements.country.dataset.iso;

    if (!ip || ip === 'Unavailable') {
        showNotif('IP address is unavailable.', 'info', 5);
        return;
    }

    if (!countryIso) {
        showNotif('Fetching geolocation data...', 'info', 3);
        const geoFetchSuccess = await fetchIPInfo(
            elements.ipDomainSearch.value,
            true,
            elements,
            showNotif,
            compressIPv6,
            isValidIP,
            resolveDomainToIP
        );

        if (geoFetchSuccess) {
            countryIso = elements.country.dataset.iso;
        } else {
            showNotif('Failed to fetch geolocation data.', 'error', 5);
            return;
        }
    }

    if (countryIso) {
        const flag = String.fromCodePoint(...[...countryIso.toUpperCase()].map(char => 0x1F1E6 + char.charCodeAt(0) - 'A'.charCodeAt(0)));
        const textToCopy = `${flag}| \`${ip}\`\n`;
        try {
            await navigator.clipboard.writeText(textToCopy);
            showNotif('Copied to clipboard!', 'success', 5);
        } catch (err) {
            showNotif('Failed to copy to clipboard.', 'error', 5);
        }
    } else {
        showNotif('Information is unavailable.', 'info', 5);
    }
});

function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

elements.browserCardIcon.addEventListener('dblclick', async () => {
    if (isMobile()) {
        elements.header.classList.toggle("hidden");
        elements.footer.classList.toggle("hidden");
    }

    window.isGeoFetchInstant = !window.isGeoFetchInstant;
    handleFetchGeo(elements, fetchIPInfo, showNotif);
    showNotif('Instant Geo fetch ' + (window.isGeoFetchInstant ? 'enabled.' : 'disabled.'), 'info', 5);
});


document.addEventListener('DOMContentLoaded', adjustHeaderContent);
window.addEventListener('resize', adjustHeaderContent);
history.scrollRestoration = 'manual';

const card1 = document.getElementById('network-details');
const card2 = document.getElementById('security-and-privacy');

function matchHeight() {
    const card2Height = card2.offsetHeight;
    card1.style.minHeight = card2Height + 'px';
}
matchHeight();
window.addEventListener('resize', matchHeight);

function updateNetworkButtons() {
    const inputField = elements.ipDomainSearch;
    const refreshBtn = elements.refreshNetworkButton;
    const searchBtn = elements.searchButton;

    if (!inputField || !refreshBtn || !searchBtn) return;

    const lastSearchedValue = inputField.dataset.lastSearched || '';
    const currentValue = inputField.value.trim();

    const isRedundantSearch = currentValue === lastSearchedValue;

    searchBtn.disabled = currentValue === '' || isRedundantSearch;

    refreshBtn.disabled = currentValue !== '';
}
window.updateNetworkButtons = updateNetworkButtons;