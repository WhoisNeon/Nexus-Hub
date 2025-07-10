const elements = {
    ipAddress: document.getElementById('ip-address'),
    location: document.getElementById('location'),
    isp: document.getElementById('isp'),
    connectionType: document.getElementById('connection-type'),
    systemTimezone: document.getElementById('system-timezone'),
    browser: document.getElementById('browser'),
    browserVersion: document.getElementById('browser-version'),
    browserEngine: document.getElementById('browser-engine'),
    userAgent: document.getElementById('user-agent'),
    cookiesEnabled: document.getElementById('cookies-enabled'),
    os: document.getElementById('os'),
    deviceType: document.getElementById('device-type'),
    architecture: document.getElementById('architecture'),
    cpuCores: document.getElementById('cpu-cores'),
    memory: document.getElementById('memory'),
    screenResolution: document.getElementById('screen-resolution'),
    viewportSize: document.getElementById('viewport-size'),
    colorDepth: document.getElementById('color-depth'),
    gpu: document.getElementById('gpu'),
    pixelRatio: document.getElementById('pixel-ratio'),
    httpsStatus: document.getElementById('https-status'),
    dntStatus: document.getElementById('dnt-status'),
    webrtcStatus: document.getElementById('webrtc-status'),
    localStorage: document.getElementById('local-storage'),
    sessionStorage: document.getElementById('session-storage'),
    javascriptEnabled: document.getElementById('javascript-enabled'),
    webglSupport: document.getElementById('webgl-support'),
    geolocationSupport: document.getElementById('geolocation-support'),
    touchSupport: document.getElementById('touch-support'),
    onlineStatus: document.getElementById('online-status'),
    themeToggle: document.getElementById('theme-toggle-button'),
    body: document.body,
    videoBackground: document.getElementById('video-background'),
    osIcon: document.getElementById('os-icon')
};

const setTextContent = (element, text) => {
    if (element) {
        element.textContent = text;
    }
};

const setInnerHTML = (element, html) => {
    if (element) {
        element.innerHTML = html;
    }
};

const addCopyFeature = (elementId) => {
    const element = document.getElementById(elementId);
    if (element && !element.dataset.copyAdded) {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="ph ph-clipboard"></i>';
        // Add aria-label for accessibility
        copyButton.setAttribute('aria-label', `Copy ${element.id.replace(/-/g, ' ')}`);

        copyButton.onclick = async (e) => {
            e.stopPropagation();
            const textToCopy = element.textContent.replace('📋', '').trim();
            try {
                await navigator.clipboard.writeText(textToCopy);
                copyButton.innerHTML = '<i class="ph ph-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="ph ph-clipboard"></i>';
                }, 1500);
            } catch (err) {
                console.error('Failed to copy: ', err);
                alert('Failed to copy text. Please try again.');
                copyButton.innerHTML = '<i class="ph ph-x"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="ph ph-clipboard"></i>';
                }, 1500);
            }
        };
        element.appendChild(copyButton);
        element.dataset.copyAdded = true;
    }
};

function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = 'Unknown';
    let engine = 'Unknown';

    if (ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR')) {
        browser = 'Chrome';
        version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
    } else if (ua.includes('Firefox')) {
        browser = 'Firefox';
        version = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Gecko';
    } else if (ua.includes('Safari') && !ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR')) {
        browser = 'Safari';
        version = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'WebKit';
    } else if (ua.includes('Edg')) {
        browser = 'Edge';
        version = ua.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
    } else if (ua.includes('Opera') || ua.includes('OPR')) {
        browser = 'Opera';
        version = ua.match(/(Opera|OPR)\/([0-9.]+)/)?.[2] || 'Unknown';
        engine = 'Blink';
    } else if (ua.includes('MSIE') || ua.includes('Trident')) {
        browser = 'Internet Explorer';
        version = ua.match(/(MSIE |rv:)([0-9.]+)/)?.[2] || 'Unknown';
        engine = 'Trident';
    }

    return { browser, version, engine };
}

function getOSInfo() {
    const ua = navigator.userAgent;
    let os = 'Unknown';
    let deviceType = 'Desktop';
    let osIconClass = '';

    if (ua.includes('Windows')) {
        if (ua.includes('Windows NT 10.0')) os = 'Windows 10/11';
        else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
        else if (ua.includes('Windows NT 6.2')) os = 'Windows 8';
        else if (ua.includes('Windows NT 6.1')) os = 'Windows 7';
        else os = 'Windows';
        osIconClass = 'ph ph-windows-logo';
    } else if (ua.includes('Macintosh') || ua.includes('Mac OS X')) {
        os = 'macOS';
        osIconClass = 'ph ph-apple-logo';
    } else if (ua.includes('Android')) {
        os = 'Android';
        deviceType = 'Mobile';
        osIconClass = 'ph ph-android-logo';
    } else if (ua.includes('iPhone')) {
        os = 'iOS';
        deviceType = 'Mobile';
        osIconClass = 'ph ph-apple-logo';
    } else if (ua.includes('iPad')) {
        os = 'iOS';
        deviceType = 'Tablet';
        osIconClass = 'ph ph-apple-logo';
    } else if (ua.includes('CrOS')) {
        os = 'Chrome OS';
        osIconClass = 'ph ph-linux-logo';
    } else if (ua.includes('Linux')) {
        os = 'Linux';
        osIconClass = 'ph ph-linux-logo';
    }

    return { os, deviceType, osIconClass };
}

function getGPUInfo() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

                let match = renderer.match(/(NVIDIA GeForce (?:RTX|GTX|MX|Quadro) \d+[A-Za-z]*)/);
                if (match && match[1]) {
                    return match[1];
                }

                match = renderer.match(/(AMD Radeon(?:TM)?(?: Pro)?(?: \w+)?(?: Graphics)?(?: Mobile)?(?: Vega \d+)?(?: RX \d+)?(?: \d+M)?)/i);
                if (match && match[1]) {
                    return match[1].replace(/\s*\(\w+\)$/, '').trim();
                }

                match = renderer.match(/(Intel\(R\) (?:Iris\(R\) Xe|Iris\(R\) Plus|HD Graphics \d+|UHD Graphics \d+|Xe Graphics))/);
                if (match && match[1]) {
                    return match[1];
                }

                match = renderer.match(/(Adreno(?:TM)? \d+)/i);
                if (match && match[1]) {
                    return match[1];
                }

                match = renderer.match(/((?:Mali|Apple)[\w\d\s-]*?(?:GPU)?(?:(?:MP)?\d)?)/i);
                if (match && match[1]) {
                    return match[1].replace(/\s+\(.*?$/, '').trim();
                }
                
                match = renderer.match(/(PowerVR(?:TM)? [\w\d\s-]*)/i);
                if (match && match[1]) {
                    return match[1];
                }

                match = renderer.match(/(Samsung Xclipse \d+)/i);
                if (match && match[1]) {
                    return match[1];
                }
                
                // Broad fallback for other known vendors if specific model isn't caught
                match = renderer.match(/(Qualcomm Adreno|ARM Mali|Imagination PowerVR|Apple A\d+ GPU|Microsoft Basic Render Driver)/i);
                 if (match && match[1]) {
                    return match[1];
                }

                return renderer;
            }
        }
    } catch (e) {
        console.error('GPU detection failed:', e);
    }
    return 'Not detected / Unknown';
}

async function fetchIPInfo() {
    const cachedIpInfo = sessionStorage.getItem('ipInfo');
    if (cachedIpInfo) {
        const data = JSON.parse(cachedIpInfo);
        updateNetworkInfo(data);
        return;
    }

    const ipApis = [
        { url: 'https://api.ipify.org?format=json', parser: (data) => data.ip },
        { url: 'https://httpbin.org/ip', parser: (data) => data.origin },
        { url: 'https://api.my-ip.io/ip.json', parser: (data) => data.ip }
    ];

    let ipAddress = null;
    for (const api of ipApis) {
        try {
            const response = await fetch(api.url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            ipAddress = api.parser(data);
            if (ipAddress) break;
        } catch (error) {
            console.warn(`IP API ${api.url} failed:`, error);
        }
    }

    if (ipAddress) {
        try {
            const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
            if (!geoResponse.ok) throw new Error(`HTTP error! status: ${geoResponse.status}`);
            const geoData = await geoResponse.json();

            if (geoData.status === 'success') {
                const info = {
                    ip: ipAddress,
                    location: `${geoData.city || 'Unknown'}, ${geoData.country || 'Unknown'}`,
                    isp: geoData.isp || 'Unknown',
                    connectionType: geoData.as ? geoData.as.split(' ')[0].replace('AS', 'AS-') : 'Unknown',
                };
                sessionStorage.setItem('ipInfo', JSON.stringify(info));
                updateNetworkInfo(info);
            } else {
                console.warn('Geo IP API status not success:', geoData.message);
                fallbackNetworkInfo(ipAddress);
            }
        } catch (geoError) {
            console.error('Geo IP info fetch failed:', geoError);
            fallbackNetworkInfo(ipAddress);
        }
    } else {
        fallbackNetworkInfo(null);
    }
}

function updateNetworkInfo(data) {
    setTextContent(elements.ipAddress, data.ip || 'Unavailable');
    setTextContent(elements.location, data.location || 'Location unavailable');
    setTextContent(elements.isp, data.isp || 'ISP unavailable');
    setTextContent(elements.connectionType, data.connectionType || 'Unknown');
    setTextContent(elements.systemTimezone, Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown');
    if (data.ip) addCopyFeature('ip-address');
}

function fallbackNetworkInfo(ip) {
    setTextContent(elements.ipAddress, ip || 'Unavailable');
    setTextContent(elements.location, 'Location unavailable');
    setTextContent(elements.isp, 'ISP unavailable');
    setTextContent(elements.connectionType, 'Unknown');
    setTextContent(elements.systemTimezone, Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown');
    if (ip) addCopyFeature('ip-address');
}


function loadBrowserAndSystemInfo() {
    const { browser, version, engine } = getBrowserInfo();
    const { os, deviceType, osIconClass } = getOSInfo();

    setTextContent(elements.browser, browser);
    setTextContent(elements.browserVersion, version);
    setTextContent(elements.browserEngine, engine);
    setTextContent(elements.userAgent, navigator.userAgent);
    setTextContent(elements.cookiesEnabled, navigator.cookieEnabled ? 'Yes' : 'No');

    setTextContent(elements.os, os);
    setTextContent(elements.deviceType, deviceType);
    setTextContent(elements.architecture, navigator.platform || 'Unknown');
    setTextContent(elements.cpuCores, navigator.hardwareConcurrency || 'Unknown');
    setTextContent(elements.memory, navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown');

    if (elements.osIcon) {
        setInnerHTML(elements.osIcon, `<i class="${osIconClass}"></i>`);
    }

    setTextContent(elements.screenResolution, `${screen.width}×${screen.height}`);
    setTextContent(elements.viewportSize, `${window.innerWidth}×${window.innerHeight}`);
    setTextContent(elements.colorDepth, `${screen.colorDepth}-bit`);
    setTextContent(elements.gpu, getGPUInfo());
    setTextContent(elements.pixelRatio, window.devicePixelRatio || '1');

    setInnerHTML(elements.httpsStatus, location.protocol === 'https:' ?
        '<span class="security-badge secure">Secure</span>' :
        '<span class="security-badge insecure">Insecure</span>');
    setTextContent(elements.dntStatus, navigator.doNotTrack === '1' ? 'Enabled' : (navigator.doNotTrack === '0' ? 'Disabled' : 'Not specified'));
    setTextContent(elements.webrtcStatus, window.RTCPeerConnection ? 'Supported' : 'Not supported');
    setTextContent(elements.localStorage, typeof (Storage) !== 'undefined' && localStorage ? 'Available' : 'Not available');
    setTextContent(elements.sessionStorage, typeof (Storage) !== 'undefined' && sessionStorage ? 'Available' : 'Not available');

    setTextContent(elements.javascriptEnabled, 'Enabled');
    setTextContent(elements.webglSupport, (() => {
        try {
            const canvas = document.createElement('canvas');
            return canvas.getContext('webgl') || canvas.getContext('experimental-webgl') ? 'Supported' : 'Not supported';
        } catch (e) {
            return 'Not supported';
        }
    })());

    setTextContent(elements.geolocationSupport, 'geolocation' in navigator ? 'Supported' : 'Not supported');
    setTextContent(elements.touchSupport, ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ? 'Yes' : 'No');
    setTextContent(elements.onlineStatus, navigator.onLine ? 'Online' : 'Offline');
}

function applyTheme(isDarkMode) {
    if (isDarkMode) {
        elements.body.classList.add('dark-mode');
        elements.themeToggle.classList.remove('theme-toggle--toggled');
    } else {
        elements.body.classList.remove('dark-mode');
        elements.themeToggle.classList.add('theme-toggle--toggled');
    }
    localStorage.setItem('darkMode', isDarkMode);
}

function toggleTheme() {
    applyTheme(elements.body.classList.contains('dark-mode') ? false : true);
}

document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        applyTheme(true);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && savedTheme === null) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    elements.themeToggle.addEventListener('click', toggleTheme);

    fetchIPInfo();
    loadBrowserAndSystemInfo();
});

window.addEventListener('online', () => setTextContent(elements.onlineStatus, 'Online'));
window.addEventListener('offline', () => setTextContent(elements.onlineStatus, 'Offline'));
window.addEventListener('resize', () => setTextContent(elements.viewportSize, `${window.innerWidth}×${window.innerHeight}`));

if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (localStorage.getItem('darkMode') === null) {
            applyTheme(event.matches);
        }
    });
}