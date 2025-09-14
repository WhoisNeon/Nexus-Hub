// ---
// Based on: https://github.com/OddDevelopment/Simple-Adblock-Detector
// Modified and refactored for improved efficiency, reliability, and UI/UX.
// ---
(() => {
    'use strict';

    const blockerTranslations = {
        'en': {
            blockerNotice: 'Ad Blocker Detected',
            blockerMessage: 'To ensure all content loads correctly and you get the best experience, we recommend adding this site to your ad blocker\'s allowlist.',
            ok: 'Okay, I understand',
            dontShowAgain: "Don't show this again"
        },
        'fa': {
            blockerNotice: 'ادبلاکر شناسایی شد',
            blockerMessage: 'برای اطمینان از بارگذاری صحیح تمام محتوا و بهترین تجربه، توصیه می‌کنیم این سایت را به لیست مجاز مسدودکننده خود اضافه کنید.',
            ok: 'باشه، متوجه شدم',
            dontShowAgain: 'دیگر نمایش نده'
        },
        'de': {
            blockerNotice: 'Werbeblocker erkannt',
            blockerMessage: 'Um sicherzustellen, dass alle Inhalte korrekt geladen werden und Sie die beste Erfahrung erhalten, empfehlen wir, diese Seite zur Ausnahmeliste Ihres Werbeblockers hinzuzufügen.',
            ok: 'Okay, verstanden',
            dontShowAgain: 'Nicht wieder anzeigen'
        },
        'es': {
            blockerNotice: 'Bloqueador de anuncios detectado',
            blockerMessage: 'Para asegurar que todo el contenido se cargue correctamente y obtenga la mejor experiencia, recomendamos agregar este sitio a la lista de permitidos de su bloqueador de anuncios.',
            ok: 'De acuerdo, entiendo',
            dontShowAgain: 'No mostrar de nuevo'
        },
        'pt': {
            blockerNotice: 'Bloqueador de anúncios detectado',
            blockerMessage: 'Para garantir que todo o conteúdo seja carregado corretamente e você tenha a melhor experiência, recomendamos adicionar este site à lista de permissões do seu bloqueador de anúncios.',
            ok: 'Ok, entendi',
            dontShowAgain: 'Não mostrar novamente'
        },
        'fr': {
            blockerNotice: 'Bloqueur de publicités détecté',
            blockerMessage: 'Pour garantir que tout le contenu se charge correctement et que vous bénéficiez de la meilleure expérience, nous vous recommandons d\'ajouter ce site à la liste blanche de votre bloqueur de publicités.',
            ok: 'D\'accord, je comprends',
            dontShowAgain: 'Ne plus afficher'
        },
        'ru': {
            blockerNotice: 'Обнаружен блокировщик рекламы',
            blockerMessage: 'Чтобы обеспечить правильную загрузку всего контента и лучший опыт, мы рекомендуем добавить этот сайт в список исключений вашего блокировщика рекламы.',
            ok: 'Хорошо, я понимаю',
            dontShowAgain: 'Больше не показывать'
        },
        'ja': {
            blockerNotice: '広告ブロッカーが検出されました',
            blockerMessage: 'すべてのコンテンツが正しく読み込まれ、最高のエクスペリエンスを得るために、このサイトを広告ブロッカーの許可リストに追加することをお勧めします。',
            ok: 'はい、理解しました',
            dontShowAgain: '今後表示しない'
        },
        'ko': {
            blockerNotice: '광고 차단기 감지됨',
            blockerMessage: '모든 콘텐츠가 올바르게 로드되고 최상의 경험을 얻으려면 광고 차단기의 허용 목록에 이 사이트를 추가하는 것이 좋습니다.',
            ok: '네, 알겠습니다',
            dontShowAgain: '다시 보지 않기'
        },
        'zh': {
            blockerNotice: '检测到广告拦截器',
            blockerMessage: '为确保所有内容正确加载并获得最佳体验，我们建议您将此站点添加到广告拦截器的白名单中。',
            ok: '好的，我明白了',
            dontShowAgain: '不再显示'
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
        if (localStorage.getItem('adBlockerNoticeDismissedPermanently') === 'true') {
            console.log("AdBlocker notice dismissed permanently.");
            return;
        }

        const dismissedUntil = localStorage.getItem('adBlockerNoticeDismissedUntil');
        if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
            console.log(`AdBlocker notice dismissed until: ${new Date(parseInt(dismissedUntil, 10)).toLocaleString()}`);
            return;
        }

        console.log("AdBlock detected. Displaying notice.");
        const currentLang = getCurrentLanguage();
        const translationSet = blockerTranslations[currentLang] || blockerTranslations['en'];

        const noticeContainer = document.createElement('div');
        noticeContainer.id = 'notice-container';

        const notice = document.createElement('div');
        notice.id = 'blocker-notice';
        notice.innerHTML = `
            <button class="close-button"><i class="ph ph-x"></i></button>
            <div class="notice-header">
                <div class="notice-icon-wrapper">
                    <i class="ph-fill ph-warning"></i>
                </div>
                <h3>${translationSet.blockerNotice}</h3>
            </div>
            <div class="notice-body">
                <p>${translationSet.blockerMessage}</p>
            </div>
            <div class="notice-footer">
                <div class="notice-checkbox-wrapper">
                    <input type="checkbox" id="dont-show-again">
                    <label for="dont-show-again">${translationSet.dontShowAgain}</label>
                </div>
                <button id="ok-button">${translationSet.ok}</button>
            </div>
        `;

        noticeContainer.appendChild(notice);
        document.body.appendChild(noticeContainer);

        requestAnimationFrame(() => {
            noticeContainer.style.opacity = '1';
            setTimeout(() => notice.style.transform = 'scale(1) translateY(0)', 50);
        });

        const dontShowAgainCheckbox = notice.querySelector('#dont-show-again');
        const closeButton = notice.querySelector('.close-button');

        const handleDismissal = (isOkButton) => {
            if (dontShowAgainCheckbox.checked) {
                localStorage.setItem('adBlockerNoticeDismissedPermanently', 'true');
            } else if (isOkButton) {
                const fiveMinutes = 15 * 60 * 1000;
                localStorage.setItem('adBlockerNoticeDismissedUntil', Date.now() + fiveMinutes);
            }
            noticeContainer.style.opacity = '0';
            notice.style.transform = 'scale(0.9) translateY(20px)';
            setTimeout(() => noticeContainer.remove(), 400);
        };

        noticeContainer.addEventListener('click', (e) => (e.target === noticeContainer) && handleDismissal(false));
        closeButton.addEventListener('click', () => handleDismissal(false));
        notice.querySelector('#ok-button').addEventListener('click', () => handleDismissal(true));

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleDismissal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    window.detectAdBlock = detectAdBlock;

    detectAdBlock().then(isBlocked => {
        console.log(`AdBlock detection status: ${isBlocked ? 'DETECTED' : 'NOT DETECTED'}.`);

        if (isBlocked) {
            const show = () => setTimeout(showBlockerNotice, 1000);
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', show);
            } else {
                show();
            }
        }
    }).catch(error => {
        console.error('AdBlock detection script failed:', error);
    });

    // resetAdBlockerNotice();
    window.resetAdBlockerNotice = () => {
        localStorage.removeItem('adBlockerNoticeDismissedUntil');
        localStorage.removeItem('adBlockerNoticeDismissedPermanently');
        console.log('Ad blocker notice dismissal has been reset.');
    };

})();
