export function getOSInfo() {
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

export function getGPUInfo(translations, currentLang) {
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
