import { setTextContent, setInnerHTML } from '../utils/dom.js';
import { getTranslatedName, currentLang } from './language.js';
import { canCopy, setCopy } from '../utils/copy.js';

export let lastGeoData = null;

export function cleanCityName(cityName) {
    if (!cityName) {
        const translationSet = window.translations[currentLang] || window.translations['en'];
        return translationSet.unknown;
    }
    return cityName.replace(/\s*\(.*\)\s*/, '').trim();
}

export function displayGeoData(geoData, elements) {
    const translationSet = window.translations[currentLang] || window.translations['en'];
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
            flagUrl = `src/assets/ir.svg`;
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

export function updateGeoButtonState(elements) {
    if (!elements.fetchGeoButton) return;
    const t = window.translations[currentLang] || window.translations.en;
    const ipText = elements.ipAddress.textContent;
    const isInvalid = ipText === t.invalidIP || ipText === t.unavailable;
    elements.fetchGeoButton.disabled = isInvalid;
}

export function resetGeolocationState(elements) {
    if (elements.geoFetchContainer) {
        elements.geoFetchContainer.classList.remove('hidden');
    }
    if (elements.geolocationItems) {
        elements.geolocationItems.classList.add('hidden');
    }
    if (elements.fetchGeoButton) {
        elements.fetchGeoButton.disabled = false;
        const translationSet = window.translations[currentLang] || window.translations['en'];
        setTextContent(elements.fetchGeoButton, translationSet.showGeoInfo);
    }

    const geoElements = [
        elements.country, elements.region, elements.city,
        elements.isp, elements.organization, elements.asn, elements.ipTimezone
    ];
    geoElements.forEach(el => {
        if (el) setInnerHTML(el, '<i class="loading"></i>');
    });
    if (elements.regionItem) elements.regionItem.style.display = 'none';
    updateGeoButtonState(elements);
}

export function resetNetworkInfoState(elements) {
    setInnerHTML(elements.ipAddress, '<i class="loading"></i>');
    setInnerHTML(elements.ipv6Address, '<i class="loading"></i>');
    resetGeolocationState(elements);
}

export const FINDIP_TOKEN = 'eb2978e07c2e4a5e9bcb8c40e5f68292';
export const REFRESH_COOLDOWN = 2500;
export const TIMEOUT = 5000;
export const isLocal = false;

let spamClicks = [];
const SPAM_LIMIT = 10;
const SPAM_WINDOW = 10000;
const SPAM_BLOCK_TIME = 15000;

export function spamDetector(elements, showNotif) {
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
            updateGeoButtonState(elements);
        }, SPAM_BLOCK_TIME);
        showNotif('You are clicking too fast!<br>15 seconds cooldown applied.', 'warning', 5);
        return true;
    }
    return false;
}

const raceTimeout = (ms, msg = 'Request timeout') =>
    new Promise((_, reject) => setTimeout(() => reject(new Error(msg)), ms));

const fetchWithTimeout = (url, opts, ms = TIMEOUT) =>
    Promise.race([fetch(url, opts), raceTimeout(ms)]);

const fetchUserIPs = async (t) => {
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

const fetchGeoData = async (ip, t) => {
    if (!ip || ip === t.unavailable) return null;
    try {
        let res;
        if (isLocal) {
            const proxyUrl = 'https://corsproxy.io/?url=';
            res = await fetchWithTimeout(`${proxyUrl}https://api.findip.net/${ip}/?token=${FINDIP_TOKEN}`);
        } else {
            res = await fetchWithTimeout(`https://api.findip.net/${ip}/?token=${FINDIP_TOKEN}`);
        }

        if (!res.ok) throw new Error(`API responded with status: ${res.status}`);
        const data = await res.json();
        return data && typeof data === 'object' ? data : null;
    } catch (e) {
        return null;
    }
};

const showGeo = (geo, elements, t) => {
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
    displayGeoData(geo, elements);
    const isp = geo.traits?.isp || geo.traits?.autonomous_system_organization || t.unavailable;
    const asn = geo.traits?.autonomous_system_number ? `AS${geo.traits.autonomous_system_number}` : t.unknown;
    setCopy('isp', isp);
    setCopy('asn', asn);
};

export async function fetchIPInfo(query = '', fetchGeo = false, elements, showNotif, compressIPv6, isValidIP, resolveDomainToIP) {
    if (spamDetector(elements, showNotif)) return false;
    if (elements.refreshNetworkButton.disabled && !fetchGeo) return false;

    if (!fetchGeo) {
        elements.refreshNetworkButton.disabled = true;
        if (elements.searchButton) elements.searchButton.disabled = true;
        resetNetworkInfoState(elements);
    }

    const t = window.translations[currentLang] || window.translations.en;

    const finish = () => {
        if (!fetchGeo) {
            elements.ipDomainSearch.value = query;
            elements.ipDomainSearch.placeholder = t.ipSearchPlaceholder;
            setTimeout(() => {
                elements.refreshNetworkButton.disabled = false;
                if (elements.searchButton) elements.searchButton.disabled = false;
            }, REFRESH_COOLDOWN);
        }
        updateGeoButtonState(elements);
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
                const { ipv4, ipv6 } = await fetchUserIPs(t);
                setTextContent(elements.ipAddress, ipv4);
                setTextContent(elements.ipv6Address, compressIPv6(ipv6));
                setCopy('ip-address', ipv4);
                setCopy('ipv6-address', compressIPv6(ipv6));
                elements.ipv4Item.style.display = 'flex';
                effectiveIP = ipv4;
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
                    showGeo(null, elements, t);
                    finish();
                    return false;
                }
            }

            if (window.isGeoFetchInstant && !fetchGeo && effectiveIP && effectiveIP !== t.unavailable && effectiveIP !== t.invalidIP) {
                setTextContent(elements.fetchGeoButton, '', 'fetchingGeo');
                const geo = await fetchGeoData(effectiveIP, t);
                showGeo(geo, elements, t);
                if (geo) {
                    elements.geoFetchContainer.classList.add('hidden');
                    elements.geolocationItems.classList.remove('hidden');
                } else {
                    setTextContent(elements.fetchGeoButton, '', 'showGeoInfo');
                }
            }
        }

        if (fetchGeo) {
            const geo = await fetchGeoData(effectiveIP, t);
            showGeo(geo, elements, t);
            return !!geo;
        }
        return true;
    } catch (e) {
        setTextContent(elements.ipAddress, t.unavailable);
        setTextContent(elements.ipv6Address, t.unavailable);
        showGeo(null, elements, t);
        return false;
    } finally {
        finish();
    }
}

export async function handleFetchGeo(elements, fetchIPInfo, showNotif) {
    const btn = elements.fetchGeoButton;
    btn.disabled = true;
    const translationSet = window.translations[currentLang] || window.translations['en'];
    setTextContent(btn, translationSet.fetchingGeo);

    const success = await fetchIPInfo(elements.ipDomainSearch.value, true, elements, showNotif);

    if (success) {
        if (elements.geoFetchContainer) {
            elements.geoFetchContainer.classList.add('hidden');
        }
        if (elements.geolocationItems) {
            elements.geolocationItems.classList.remove('hidden');
        }
    } else {
        btn.disabled = false;
        setTextContent(btn, translationSet.showGeoInfo);
        const t = window.translations[currentLang] || window.translations.en;
        showNotif(t.geoFetchError, 'error', 5);
    }
}
