export function compressIPv6(address) {
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

export function isValidIP(str) {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    return ipv4Regex.test(str) || ipv6Regex.test(str);
}

export async function resolveDomainToIP(domain) {
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
