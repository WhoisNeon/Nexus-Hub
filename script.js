const elements = {
    ipAddress: document.getElementById('ip-address'),
    ipv6Address: document.getElementById('ipv6-address'),
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
    osIcon: document.getElementById('os-icon'),
    ipTimezone: document.getElementById('ip-timezone'),
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
                // Attempt to return a cleaner, more readable GPU name
                return renderer.match(/((NVIDIA|AMD|Intel|Apple|Adreno|Mali|PowerVR)[\w\s()]*)/i)?.[1] || renderer;
            }
        }
    } catch (e) {
        console.error('GPU detection failed:', e);
    }
    return 'Not detected / Unknown';
}

async function fetchIPInfo() {
    let ipv4 = 'Not available';
    let ipv6 = 'Not available';

    try {
        const mainResponse = await fetch('https://api.my-ip.io/v2/ip.json');
        if (!mainResponse.ok) throw new Error(`Primary API failed: ${mainResponse.status}`);
        const data = await mainResponse.json();

        // Update location and ISP info from the primary API response
        setTextContent(elements.location, data.country ? data.country.name : 'Location unavailable');
        setTextContent(elements.isp, data.asn ? data.asn.name : 'ISP unavailable');
        setTextContent(elements.connectionType, data.asn ? `AS-${data.asn.number}` : 'Unknown');
        setTextContent(elements.ipTimezone, data.timeZone ? data.timeZone : 'Unknown');

        if (data.type === 'IPv4') {
            ipv4 = data.ip;
            // Now try to get IPv6
            try {
                const ipv6Response = await fetch('https://api6.ipify.org?format=json');
                if (ipv6Response.ok) {
                    const ipv6Data = await ipv6Response.json();
                    ipv6 = ipv6Data.ip;
                }
            } catch (e) {
                console.warn('Could not fetch IPv6 address.');
            }
        } else if (data.type === 'IPv6') {
            ipv6 = data.ip;
            // Now try to get IPv4
            try {
                const ipv4Response = await fetch('https://api.ipify.org?format=json');
                if (ipv4Response.ok) {
                    const ipv4Data = await ipv4Response.json();
                    ipv4 = ipv4Data.ip;
                }
            } catch (e) {
                console.warn('Could not fetch IPv4 address.');
            }
        }

    } catch (error) {
        console.error('IP info fetch failed:', error);
        // Fallback in case my-ip.io fails completely
        try {
             const [ipv4Res, ipv6Res] = await Promise.allSettled([
                fetch('https://api.ipify.org?format=json'),
                fetch('https://api64.ipify.org?format=json')
            ]);
            if (ipv4Res.status === 'fulfilled' && ipv4Res.value.ok) ipv4 = (await ipv4Res.value.json()).ip;
            if (ipv6Res.status === 'fulfilled' && ipv6Res.value.ok) ipv6 = (await ipv6Res.value.json()).ip;
        } catch (fallbackError) {
             console.error('Fallback IP fetch also failed:', fallbackError);
        }
        setTextContent(elements.location, 'Location unavailable');
        setTextContent(elements.isp, 'ISP unavailable');
        setTextContent(elements.connectionType, 'Unknown');
    }

    updateNetworkInfo({ ip: ipv4, ipv6: ipv6 });
}

function updateNetworkInfo(data) {
    setTextContent(elements.ipAddress, data.ip || 'Unavailable');
    setTextContent(elements.ipv6Address, data.ipv6 || 'Not available');
    setTextContent(elements.systemTimezone, Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown');
    if (data.ip && data.ip !== 'Not available') addCopyFeature('ip-address');
    if (data.ipv6 && data.ipv6 !== 'Not available');
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
    if (elements.osIcon) {
        setInnerHTML(elements.osIcon, `<i class="${osIconClass}"></i>`);
    }

    setTextContent(elements.architecture, navigator.platform || 'Unknown');
    setTextContent(elements.cpuCores, navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency}` : 'Unknown');
    setTextContent(elements.memory, navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown');

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
            return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        } catch (e) {
            return 'Not supported';
        }
    })() ? 'Supported' : 'Not supported');
    setTextContent(elements.geolocationSupport, 'geolocation' in navigator ? 'Supported' : 'Not supported');
    setTextContent(elements.touchSupport, ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ? 'Yes' : 'No');
    setTextContent(elements.onlineStatus, navigator.onLine ? 'Online' : 'Offline');
}

function applyTheme(isDarkMode) {
    elements.body.classList.toggle('dark-mode', isDarkMode);
    elements.themeToggle.classList.toggle('theme-toggle--toggled', !isDarkMode);
    localStorage.setItem('darkMode', isDarkMode);
}

function toggleTheme() {
    applyTheme(!elements.body.classList.contains('dark-mode'));
}

document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme === 'true' || (savedTheme === null && prefersDark));

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
