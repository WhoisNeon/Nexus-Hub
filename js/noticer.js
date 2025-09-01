// ---
// Based on: https://github.com/OddDevelopment/Simple-Adblock-Detector
// Modified and refactored for improved efficiency and reliability.
// ---
(() => {
    'use strict';

    const blockerTranslations = {
        'en': {
            blockerNotice: 'Ad/Content Blocker Detected',
            blockerMessage: 'Some information may be inaccurate due to content blocking. Please disable your ad blocker or add this site to your allowlist for better accuracy.',
            dismiss: 'Dismiss',
            refresh: 'Refresh'
        },
        'fa': {
            blockerNotice: 'مسدودکننده تبلیغات شناسایی شد',
            blockerMessage: 'برخی اطلاعات ممکن است نادرست باشند. لطفاً مسدودکننده تبلیغات خود را غیرفعال کنید یا این سایت را به لیست مجاز اضافه کنید.',
            dismiss: 'رد کردن',
            refresh: 'بارگذاری مجدد'
        },
        'de': {
            blockerNotice: 'Werbeblocker erkannt',
            blockerMessage: 'Einige Informationen könnten ungenau sein. Bitte deaktivieren Sie Ihren Werbeblocker oder fügen Sie diese Seite zur Ausnahmeliste hinzu.',
            dismiss: 'Schließen',
            refresh: 'Aktualisieren'
        },
        'es': {
            blockerNotice: 'Bloqueador de anuncios detectado',
            blockerMessage: 'Alguna información puede ser inexacta. Desactive su bloqueador de anuncios o agregue este sitio a su lista de permitidos.',
            dismiss: 'Descartar',
            refresh: 'Actualizar'
        },
        'pt': {
            blockerNotice: 'Bloqueador de anúncios detectado',
            blockerMessage: 'Algumas informações podem estar incorretas. Desative seu bloqueador de anúncios ou adicione este site à lista de permissões.',
            dismiss: 'Dispensar',
            refresh: 'Atualizar'
        },
        'fr': {
            blockerNotice: 'Bloqueur de publicités détecté',
            blockerMessage: 'Certaines informations peuvent être inexactes. Veuillez désactiver votre bloqueur de publicités ou ajouter ce site à votre liste blanche.',
            dismiss: 'Ignorer',
            refresh: 'Actualiser'
        },
        'ru': {
            blockerNotice: 'Обнаружен блокировщик рекламы',
            blockerMessage: 'Некоторая информация может быть неточной. Отключите блокировщик рекламы или добавьте этот сайт в список исключений.',
            dismiss: 'Закрыть',
            refresh: 'Обновить'
        },
        'ja': {
            blockerNotice: '広告ブロッカーが検出されました',
            blockerMessage: '一部の情報が不正確である可能性があります。広告ブロッカーを無効にするか、このサイトを許可リストに追加してください。',
            dismiss: '閉じる',
            refresh: '更新'
        },
        'ko': {
            blockerNotice: '광고 차단기가 감지됨',
            blockerMessage: '일부 정보가 부정확할 수 있습니다. 광고 차단기를 비활성화하거나 이 사이트를 허용 목록에 추가하세요.',
            dismiss: '닫기',
            refresh: '새로고침'
        },
        'zh': {
            blockerNotice: '检测到广告拦截器',
            blockerMessage: '某些信息可能不准确. 请禁用您的广告拦截器或将此站点添加到白名单.',
            dismiss: '忽略',
            refresh: '刷新'
        }
    };

    const isUrlBlocked = async (url, options = {}) => {
        try {
            await fetch(url, options);
            return false;
        } catch (error) {
            return true;
        }
    };

    const checkDOMElementBlocking = async () => {
        const bannerIds = ['AdHeader', 'AdContainer', 'AD_Top', 'homead', 'ad-lead'];
        const dataContainer = document.createElement("div");
        dataContainer.style.cssText = 'position:absolute; top: -9999px; left: -9999px;';
        dataContainer.innerHTML = bannerIds.map((id) => `<div id="${id}">&nbsp;</div>`).join('');
        document.body.append(dataContainer);

        let isBlocked = false;
        for (const id of bannerIds) {
            const elem = document.getElementById(id);
            if (!elem || elem.offsetHeight === 0) {
                isBlocked = true;
                break;
            }
        }

        dataContainer.remove();
        return isBlocked;
    };

    const checkSetInterval = () => {
        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                resolve(true);
            }, 2000);

            const interval = setInterval(() => {
                clearInterval(interval);
                clearTimeout(timeout);
                resolve(false);
            }, 100);
        });
    };

    const detectAdBlock = async () => {
        const adServiceUrls = [
            "https://widgets.outbrain.com/outbrain.js",
            "https://adligature.com/",
            "https://secure.quantserve.com/quant.js",
            "https://cdn.adligature.com/work.ink/prod/rules.css",
            "https://srvtrck.com/assets/css/LineIcons.css",
            "https://js.srvtrck.com/v1/js?api_key=40710abb89ad9e06874a667b2bc7dee7&site_id=1f10f78243674fcdba586e526cb8ef08"
        ];

        const networkChecks = adServiceUrls.map(url => isUrlBlocked(url, {
            mode: "no-cors"
        }));

        const detectionResults = await Promise.all([
            ...networkChecks,
            checkDOMElementBlocking(),
            checkSetInterval()
        ]);
        return detectionResults.some(isBlocked => isBlocked);
    };

    function getCurrentLanguage() {
        return localStorage.getItem('userLanguage') || 'en';
    }

    function showBlockerNotice() {
        const dismissedUntil = localStorage.getItem('adBlockerNoticeDismissedUntil');
        if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
            return;
        }

        const currentLang = getCurrentLanguage();
        const translationSet = blockerTranslations[currentLang] || blockerTranslations['en'];

        const noticeContainer = document.createElement('div');
        noticeContainer.id = 'notice-container';

        const notice = document.createElement('div');
        notice.id = 'blocker-notice';
        notice.innerHTML = `
            <div class="notice-content">
                <div class="notice-icon-wrapper">
                    <i class="ph ph-warning"></i>
                </div>
                <h3>${translationSet.blockerNotice}</h3>
                <p>${translationSet.blockerMessage}</p>
            </div>
            <div class="notice-buttons">
                <button id="dismiss-notice"><i class="ph ph-x-circle"></i> ${translationSet.dismiss}</button>
                <button id="refresh-page"><i class="ph ph-arrows-clockwise"></i> ${translationSet.refresh}</button>
            </div>
        `;
        noticeContainer.appendChild(notice);
        document.body.appendChild(noticeContainer);

        requestAnimationFrame(() => {
            noticeContainer.style.opacity = '1';
            setTimeout(() => notice.style.transform = 'scale(1) translateY(0)', 50);
        });

        const dismissNotice = () => {
            const fiveMinutes = 5 * 60 * 1000;
            localStorage.setItem('adBlockerNoticeDismissedUntil', Date.now() + fiveMinutes);

            noticeContainer.style.opacity = '0';
            notice.style.transform = 'scale(0.9) translateY(20px)';
            setTimeout(() => noticeContainer.remove(), 400);
        };

        const dismissButton = notice.querySelector('#dismiss-notice');
        const refreshButton = notice.querySelector('#refresh-page');

        dismissButton.addEventListener('click', dismissNotice);
        refreshButton.addEventListener('click', () => location.reload());

        noticeContainer.addEventListener('click', (e) => (e.target === noticeContainer) && dismissNotice());
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                dismissNotice();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    detectAdBlock().then(isBlocked => {
        console.log(`AdBlock detection status: ${isBlocked ? 'DETECTED' : 'NOT DETECTED'}.`);

        if (isBlocked) {
            console.log("AdBlock detected. Displaying notice.");
            const show = () => setTimeout(showBlockerNotice, 1500);
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', show);
            } else {
                show();
            }
        }
    }).catch(error => {
        console.error('AdBlock detection script failed:', error);
    });

    window.resetAdBlockerNotice = () => {
        localStorage.removeItem('adBlockerNoticeDismissedUntil');
        console.log('Ad blocker notice dismissal has been reset.');
    };

})();