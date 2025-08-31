const translations = {
    'en': {
        resolvingDomain: 'Resolving domain...',
        loading: 'Loading...', ipSearchPlaceholder: 'Search IP or domain', copyright: 'All rights reserved.',
        networkDetails: 'Network Details', ipAddress: 'IP Address', ipv6: 'IPv6', country: 'Country', region: 'Region', city: 'City', isp: 'ISP', organization: 'Organization', asn: 'ASN', ipTimezone: 'Time Zone',
        browserDetails: 'Browser Details', browser: 'Browser', version: 'Version', engine: 'Engine', userAgent: 'User Agent', cookiesEnabled: 'Cookies',
        systemInfo: 'System Information', os: 'Operating System', deviceType: 'Device Type', architecture: 'Architecture', cpuCores: 'CPU Cores', memory: 'Memory', systemTimezone: 'Time Zone', preferredTheme: 'Preferred Theme',
        displayGraphics: 'Display & Graphics', screenResolution: 'Screen Resolution', viewportSize: 'Viewport Size', colorDepth: 'Color Depth', gpu: 'GPU', pixelRatio: 'Pixel Ratio',
        securityPrivacy: 'Security & Privacy', https: 'HTTPS', dnt: 'Do Not Track', webrtc: 'WebRTC', localStorage: 'Local Storage', sessionStorage: 'Session Storage',
        webFeatures: 'Web Features', javascript: 'JavaScript', webgl: 'WebGL', geolocation: 'Geolocation', touchSupport: 'Touch Support', onlineStatus: 'Online Status',
        enabled: 'Enabled', disabled: 'Disabled', notSpecified: 'Not specified', supported: 'Supported', notSupported: 'Not supported', available: 'Available', notAvailable: 'Not available', secure: 'Secure', insecure: 'Insecure', online: 'Online', offline: 'Offline', darkMode: 'Dark Mode', lightMode: 'Light Mode', systemPreference: 'System Preference', notDetected: 'Not detected / Unknown', unknown: 'Unknown', unavailable: 'Unavailable', invalidIP: 'Invalid IP / Domain'
    },
    'fa': {
        resolvingDomain: 'در حال دریافت آی‌پی دامنه...',
        loading: 'در حال بارگذاری...', ipSearchPlaceholder: 'جستجوی آی‌پی یا دامنه', copyright: 'تمامی حقوق محفوظ است.',
        networkDetails: 'جزئیات شبکه', ipAddress: 'آدرس آی‌پی', ipv6: 'آی‌پی ورژن ۶', country: 'کشور', region: 'منطقه', city: 'شهر', isp: 'ارائه دهنده', organization: 'سازمان', asn: 'شماره سیستم', ipTimezone: 'منطقه زمانی',
        browserDetails: 'جزئیات مرورگر', browser: 'مرورگر', version: 'نسخه', engine: 'موتور', userAgent: 'User Agent', cookiesEnabled: 'کوکی‌ها',
        systemInfo: 'اطلاعات سیستم', os: 'سیستم عامل', deviceType: 'نوع دستگاه', architecture: 'معماری', cpuCores: 'هسته‌های پردازنده', memory: 'حافظه', systemTimezone: 'منطقه زمانی', preferredTheme: 'تم ترجیحی',
        displayGraphics: 'نمایشگر و گرافیک', screenResolution: 'وضوح صفحه', viewportSize: 'اندازه Viewport', colorDepth: 'عمق رنگ', gpu: 'پردازنده گرافیکی', pixelRatio: 'نسبت پیکسل',
        securityPrivacy: 'امنیت و حریم خصوصی', https: 'HTTPS', dnt: 'Do Not Track', webrtc: 'WebRTC', localStorage: 'حافظه محلی', sessionStorage: 'حافظه جلسه',
        webFeatures: 'ویژگی‌های وب', javascript: 'جاوا اسکریپت', webgl: 'WebGL', geolocation: 'موقعیت جغرافیایی', touchSupport: 'پشتیبانی از لمس', onlineStatus: 'وضعیت آنلاین',
        enabled: 'فعال', disabled: 'غیرفعال', notSpecified: 'مشخص نشده', supported: 'پشتیبانی می‌شود', notSupported: 'پشتیبانی نمی‌شود', available: 'در دسترس', notAvailable: 'در دسترس نیست', secure: 'امن', insecure: 'نا امن', online: 'آنلاین', offline: 'آفلاین', darkMode: 'حالت تاریک', lightMode: 'حالت روشن', systemPreference: 'تنظیمات سیستم', notDetected: 'شناسایی نشد / ناشناخته', unknown: 'ناشناخته', unavailable: 'در دسترس نیست', invalidIP: 'آی‌پی / دامنه نامعتبر'
    },
    'de': {
        resolvingDomain: 'Domain wird aufgelöst...',
        loading: 'Wird geladen...', ipSearchPlaceholder: 'IP oder Domain suchen', copyright: 'Alle Rechte vorbehalten.',
        networkDetails: 'Netzwerkdetails', ipAddress: 'IP-Adresse', ipv6: 'IPv6', country: 'Land', region: 'Region', city: 'Stadt', isp: 'ISP', organization: 'Organisation', asn: 'ASN', ipTimezone: 'Zeitzone',
        browserDetails: 'Browserdetails', browser: 'Browser', version: 'Version', engine: 'Engine', userAgent: 'User Agent', cookiesEnabled: 'Cookies',
        systemInfo: 'Systeminformationen', os: 'Betriebssystem', deviceType: 'Gerätetyp', architecture: 'Architektur', cpuCores: 'CPU-Kerne', memory: 'Speicher', systemTimezone: 'Zeitzone', preferredTheme: 'Bevorzugtes Thema',
        displayGraphics: 'Anzeige & Grafik', screenResolution: 'Bildschirmauflösung', viewportSize: 'Viewport-Größe', colorDepth: 'Farbtiefe', gpu: 'GPU', pixelRatio: 'Pixel-Verhältnis',
        securityPrivacy: 'Sicherheit & Datenschutz', https: 'HTTPS', dnt: 'Do Not Track', webrtc: 'WebRTC', localStorage: 'Lokaler Speicher', sessionStorage: 'Sitzungsspeicher',
        webFeatures: 'Web-Funktionen', javascript: 'JavaScript', webgl: 'WebGL', geolocation: 'Geolokalisierung', touchSupport: 'Touch-Unterstützung', onlineStatus: 'Online-Status',
        enabled: 'Aktiviert', disabled: 'Deaktiviert', notSpecified: 'Nicht angegeben', supported: 'Unterstützt', notSupported: 'Nicht unterstützt', available: 'Verfügbar', notAvailable: 'Nicht verfügbar', secure: 'Sicher', insecure: 'Unsicher', online: 'Online', offline: 'Offline', darkMode: 'Dunkelmodus', lightMode: 'Heller Modus', systemPreference: 'Systempräferenz', notDetected: 'Nicht erkannt / Unbekannt', unknown: 'Unbekannt', unavailable: 'Nicht verfügbar', invalidIP: 'Ungültige IP / Domain'
    },
    'es': {
        resolvingDomain: 'Resolviendo dominio...',
        loading: 'Cargando...', ipSearchPlaceholder: 'Buscar IP o dominio', copyright: 'Todos los derechos reservados.',
        networkDetails: 'Detalles de la red', ipAddress: 'Dirección IP', ipv6: 'IPv6', country: 'País', region: 'Región', city: 'Ciudad', isp: 'ISP', organization: 'Organización', asn: 'ASN', ipTimezone: 'Zona horaria',
        browserDetails: 'Detalles del navegador', browser: 'Navegador', version: 'Versión', engine: 'Motor', userAgent: 'User Agent', cookiesEnabled: 'Cookies',
        systemInfo: 'Información del sistema', os: 'Sistema operativo', deviceType: 'Tipo de dispositivo', architecture: 'Arquitectura', cpuCores: 'Núcleos de CPU', memory: 'Memoria', systemTimezone: 'Zona horaria', preferredTheme: 'Tema preferido',
        displayGraphics: 'Pantalla y gráficos', screenResolution: 'Resolución de pantalla', viewportSize: 'Tamaño de viewport', colorDepth: 'Profundidad de color', gpu: 'GPU', pixelRatio: 'Relación de píxeles',
        securityPrivacy: 'Seguridad y privacidad', https: 'HTTPS', dnt: 'Do Not Track', webrtc: 'WebRTC', localStorage: 'Almacenamiento local', sessionStorage: 'Almacenamiento de sesión',
        webFeatures: 'Características web', javascript: 'JavaScript', webgl: 'WebGL', geolocation: 'Geolocalización', touchSupport: 'Soporte táctil', onlineStatus: 'Estado en línea',
        enabled: 'Habilitado', disabled: 'Deshabilitado', notSpecified: 'No especificado', supported: 'Soportado', notSupported: 'No soportado', available: 'Disponible', notAvailable: 'No disponible', secure: 'Seguro', insecure: 'Inseguro', online: 'En línea', offline: 'Fuera de línea', darkMode: 'Modo oscuro', lightMode: 'Modo claro', systemPreference: 'Preferencia del sistema', notDetected: 'No detectado / Desconocido', unknown: 'Desconocido', unavailable: 'No disponible', invalidIP: 'IP / Dominio inválido'
    },
    'pt': {
        resolvingDomain: 'Resolvendo domínio...',
        loading: 'Carregando...', ipSearchPlaceholder: 'Buscar IP ou domínio', copyright: 'Todos os direitos reservados.',
        networkDetails: 'Detalhes da Rede', ipAddress: 'Endereço IP', ipv6: 'IPv6', country: 'País', region: 'Região', city: 'Cidade', isp: 'ISP', organization: 'Organização', asn: 'ASN', ipTimezone: 'Fuso Horário',
        browserDetails: 'Detalhes do Navegador', browser: 'Navegador', version: 'Versão', engine: 'Motor', userAgent: 'User Agent', cookiesEnabled: 'Cookies',
        systemInfo: 'Informações do Sistema', os: 'Sistema Operacional', deviceType: 'Tipo de Dispositivo', architecture: 'Arquitetura', cpuCores: 'Núcleos da CPU', memory: 'Memória', systemTimezone: 'Fuso Horário', preferredTheme: 'Tema Preferido',
        displayGraphics: 'Tela e Gráficos', screenResolution: 'Resolução da Tela', viewportSize: 'Tamanho da Janela', colorDepth: 'Profundidade de Cor', gpu: 'GPU', pixelRatio: 'Taxa de Pixels',
        securityPrivacy: 'Segurança e Privacidade', https: 'HTTPS', dnt: 'Do Not Track', webrtc: 'WebRTC', localStorage: 'Armazenamento Local', sessionStorage: 'Armazenamento de Sessão',
        webFeatures: 'Recursos da Web', javascript: 'JavaScript', webgl: 'WebGL', geolocation: 'Geolocalização', touchSupport: 'Suporte a Toque', onlineStatus: 'Status Online',
        enabled: 'Ativado', disabled: 'Desativado', notSpecified: 'Não especificado', supported: 'Suportado', notSupported: 'Não suportado', available: 'Disponível', notAvailable: 'Indisponível', secure: 'Seguro', insecure: 'Inseguro', online: 'Online', offline: 'Offline', darkMode: 'Modo Escuro', lightMode: 'Modo Claro', systemPreference: 'Preferência do Sistema', notDetected: 'Não detectado / Desconhecido', unknown: 'Desconhecido', unavailable: 'Indisponível', invalidIP: 'IP / Domínio Inválido'
    },
    'fr': {
        resolvingDomain: 'Résolution du domaine...',
        loading: 'Chargement...', ipSearchPlaceholder: 'Rechercher IP ou domaine', copyright: 'Tous droits réservés.',
        networkDetails: 'Détails du réseau', ipAddress: 'Adresse IP', ipv6: 'IPv6', country: 'Pays', region: 'Région', city: 'Ville', isp: 'FAI', organization: 'Organisation', asn: 'ASN', ipTimezone: 'Fuseau horaire',
        browserDetails: 'Détails du navigateur', browser: 'Navigateur', version: 'Version', engine: 'Moteur', userAgent: 'User Agent', cookiesEnabled: 'Cookies',
        systemInfo: 'Informations système', os: 'Système d\'exploitation', deviceType: 'Type d\'appareil', architecture: 'Architecture', cpuCores: 'Cœurs CPU', memory: 'Mémoire', systemTimezone: 'Fuseau horaire', preferredTheme: 'Thème préféré',
        displayGraphics: 'Affichage et graphiques', screenResolution: 'Résolution de l\'écran', viewportSize: 'Taille du viewport', colorDepth: 'Profondeur de couleur', gpu: 'GPU', pixelRatio: 'Ratio de pixels',
        securityPrivacy: 'Sécurité et confidentialité', https: 'HTTPS', dnt: 'Do Not Track', webrtc: 'WebRTC', localStorage: 'Stockage local', sessionStorage: 'Stockage de session',
        webFeatures: 'Fonctionnalités Web', javascript: 'JavaScript', webgl: 'WebGL', geolocation: 'Géolocalisation', touchSupport: 'Support tactile', onlineStatus: 'Statut en ligne',
        enabled: 'Activé', disabled: 'Désactivé', notSpecified: 'Non spécifié', supported: 'Supporté', notSupported: 'Non supporté', available: 'Disponible', notAvailable: 'Non disponible', secure: 'Sécurisé', insecure: 'Non sécurisé', online: 'En ligne', offline: 'Hors ligne', darkMode: 'Mode sombre', lightMode: 'Mode clair', systemPreference: 'Préférence système', notDetected: 'Non détecté / Inconnu', unknown: 'Inconnu', unavailable: 'Indisponible', invalidIP: 'IP / Domaine invalide'
    },
    'ru': {
        resolvingDomain: 'Определение IP домена...',
        loading: 'Загрузка...', ipSearchPlaceholder: 'Поиск IP или домена', copyright: 'Все права защищены.',
        networkDetails: 'Сетевые данные', ipAddress: 'IP-адрес', ipv6: 'IPv6', country: 'Страна', region: 'Регион', city: 'Город', isp: 'Провайдер', organization: 'Организация', asn: 'ASN', ipTimezone: 'Часовой пояс',
        browserDetails: 'Данные браузера', browser: 'Браузер', version: 'Версия', engine: 'Движок', userAgent: 'User Agent', cookiesEnabled: 'Cookies',
        systemInfo: 'Информация о системе', os: 'Операционная система', deviceType: 'Тип устройства', architecture: 'Архитектура', cpuCores: 'Ядра ЦП', memory: 'Память', systemTimezone: 'Часовой пояс', preferredTheme: 'Предпочтительная тема',
        displayGraphics: 'Дисплей и графика', screenResolution: 'Разрешение экрана', viewportSize: 'Размер окна', colorDepth: 'Глубина цвета', gpu: 'GPU', pixelRatio: 'Соотношение пикселей',
        securityPrivacy: 'Безопасность и конфиденциальность', https: 'HTTPS', dnt: 'Do Not Track', webrtc: 'WebRTC', localStorage: 'Локальное хранилище', sessionStorage: 'Сессионное хранилище',
        webFeatures: 'Веб-функции', javascript: 'JavaScript', webgl: 'WebGL', geolocation: 'Геолокация', touchSupport: 'Сенсорная поддержка', onlineStatus: 'Статус в сети',
        enabled: 'Включено', disabled: 'Отключено', notSpecified: 'Не указано', supported: 'Поддерживается', notSupported: 'Не поддерживается', available: 'Доступно', notAvailable: 'Недоступно', secure: 'Безопасно', insecure: 'Небезопасно', online: 'В сети', offline: 'Не в сети', darkMode: 'Темный режим', lightMode: 'Светлый режим', systemPreference: 'Системные настройки', notDetected: 'Не определено / Неизвестно', unknown: 'Неизвестно', unavailable: 'Недоступно', invalidIP: 'Неверный IP / домен'
    },
    'ja': {
        resolvingDomain: 'ドメインを解決中...',
        loading: '読み込み中...', ipSearchPlaceholder: 'IPまたはドメイン検索', copyright: 'All rights reserved.',
        networkDetails: 'ネットワーク詳細', ipAddress: 'IPアドレス', ipv6: 'IPv6', country: '国', region: '地域', city: '都市', isp: 'ISP', organization: '組織', asn: 'ASN', ipTimezone: 'タイムゾーン',
        browserDetails: 'ブラウザ詳細', browser: 'ブラウザ', version: 'バージョン', engine: 'エンジン', userAgent: 'ユーザーエージェント', cookiesEnabled: 'クッキー',
        systemInfo: 'システム情報', os: 'オペレーティングシステム', deviceType: 'デバイスタイプ', architecture: 'アーキテクチャ', cpuCores: 'CPUコア数', memory: 'メモリ', systemTimezone: 'タイムゾーン', preferredTheme: '優先テーマ',
        displayGraphics: 'ディスプレイとグラフィックス', screenResolution: '画面解像度', viewportSize: 'ビューポートサイズ', colorDepth: '色深度', gpu: 'GPU', pixelRatio: 'ピクセル比',
        securityPrivacy: 'セキュリティとプライバシー', https: 'HTTPS', dnt: 'Do Not Track', webrtc: 'WebRTC', localStorage: 'ローカルストレージ', sessionStorage: 'セッションストレージ',
        webFeatures: 'Web機能', javascript: 'JavaScript', webgl: 'WebGL', geolocation: '地理位置情報', touchSupport: 'タッチサポート', onlineStatus: 'オンラインステータス',
        enabled: '有効', disabled: '無効', notSpecified: '指定なし', supported: '対応', notSupported: '非対応', available: '利用可能', notAvailable: '利用不可', secure: '安全', insecure: '危険', online: 'オンライン', offline: 'オフライン', darkMode: 'ダークモード', lightMode: 'ライトモード', systemPreference: 'システム設定', notDetected: '未検出/不明', unknown: '不明', unavailable: '利用不可', invalidIP: '無効なIP / ドメイン'
    },
    'ko': {
        resolvingDomain: '도메인 확인 중...',
        loading: '로드 중...', ipSearchPlaceholder: 'IP 또는 도메인 검색', copyright: 'All rights reserved.',
        networkDetails: '네트워크 정보', ipAddress: 'IP 주소', ipv6: 'IPv6', country: '국가', region: '지역', city: '도시', isp: 'ISP', organization: '조직', asn: 'ASN', ipTimezone: '시간대',
        browserDetails: '브라우저 정보', browser: '브라우저', version: '버전', engine: '엔진', userAgent: '사용자 에이전트', cookiesEnabled: '쿠키',
        systemInfo: '시스템 정보', os: '운영 체제', deviceType: '기기 종류', architecture: '아키텍처', cpuCores: 'CPU 코어', memory: '메모리', systemTimezone: '시간대', preferredTheme: '선호 테마',
        displayGraphics: '디스플레이 및 그래픽', screenResolution: '화면 해상도', viewportSize: '뷰포트 크기', colorDepth: '색 농도', gpu: 'GPU', pixelRatio: '픽셀 비율',
        securityPrivacy: '보안 및 개인 정보', https: 'HTTPS', dnt: 'Do Not Track', webrtc: 'WebRTC', localStorage: '로컬 스토리지', sessionStorage: '세션 스토리지',
        webFeatures: '웹 기능', javascript: '자바스크립트', webgl: 'WebGL', geolocation: '지리적 위치', touchSupport: '터치 지원', onlineStatus: '온라인 상태',
        enabled: '활성화됨', disabled: '비활성화됨', notSpecified: '지정되지 않음', supported: '지원됨', notSupported: '지원되지 않음', available: '사용 가능', notAvailable: '사용 불가', secure: '안전함', insecure: '안전하지 않음', online: '온라인', offline: '오프라인', darkMode: '다크 모드', lightMode: '라이트 모드', systemPreference: '시스템 환경설정', notDetected: '감지되지 않음 / 알 수 없음', unknown: '알 수 없음', unavailable: '사용 불가', invalidIP: '잘못된 IP / 도메인'
    },
    'zh': {
        resolvingDomain: '正在解析域名...',
        loading: '加载中...', ipSearchPlaceholder: '搜索IP或域名', copyright: '版权所有。',
        networkDetails: '网络详情', ipAddress: 'IP地址', ipv6: 'IPv6', country: '国家', region: '地区', city: '城市', isp: 'ISP', organization: '组织', asn: 'ASN', ipTimezone: '时区',
        browserDetails: '浏览器详情', browser: '浏览器', version: '版本', engine: '引擎', userAgent: '用户代理', cookiesEnabled: 'Cookie',
        systemInfo: '系统信息', os: '操作系统', deviceType: '设备类型', architecture: '架构', cpuCores: 'CPU核心数', memory: '内存', systemTimezone: '时区', preferredTheme: '首选主题',
        displayGraphics: '显示与图形', screenResolution: '屏幕分辨率', viewportSize: '视口大小', colorDepth: '颜色深度', gpu: 'GPU', pixelRatio: '像素比',
        securityPrivacy: '安全与隐私', https: 'HTTPS', dnt: '请勿跟踪', webrtc: 'WebRTC', localStorage: '本地存储', sessionStorage: '会话存储',
        webFeatures: 'Web功能', javascript: 'JavaScript', webgl: 'WebGL', geolocation: '地理位置', touchSupport: '触摸支持', onlineStatus: '在线状态',
        enabled: '已启用', disabled: '已禁用', notSpecified: '未指定', supported: '支持', notSupported: '不支持', available: '可用', notAvailable: '不可用', secure: '安全', insecure: '不安全', online: '在线', offline: '离线', darkMode: '深色模式', lightMode: '浅色模式', systemPreference: '系统偏好', notDetected: '未检测到/未知', unknown: '未知', unavailable: '不可用', invalidIP: '无效IP / 域名'
    }
};

let currentLang = localStorage.getItem('userLanguage') || 'en';
let lastGeoData = null;

const elements = {
    preloader: document.querySelector('.preloader'),
    mainContainer: document.getElementById('main-container'),
    header: document.querySelector('.header'),
    browserCardIcon: document.getElementById('browser-card-icon'),
    infoCards: document.querySelectorAll('.info-card'),
    ipAddress: document.getElementById('ip-address'),
    ipv6Address: document.getElementById('ipv6-address'),
    ipv4Item: document.getElementById('ip-address-item'),
    ipv6Item: document.getElementById('ipv6-item'),
    city: document.getElementById('city'),
    country: document.getElementById('country'),
    region: document.getElementById('region'),
    regionItem: document.getElementById('region-item'),
    isp: document.getElementById('isp'),
    organization: document.getElementById('organization'),
    connectionType: document.getElementById('asn'),
    ipTimezone: document.getElementById('ip-timezone'),
    browser: document.getElementById('browser'),
    browserVersion: document.getElementById('browser-version'),
    browserEngine: document.getElementById('browser-engine'),
    userAgent: document.getElementById('user-agent'),
    cookiesEnabled: document.getElementById('cookies-enabled'),
    preferredTheme: document.getElementById('preferred-theme'),
    os: document.getElementById('os'),
    deviceType: document.getElementById('device-type'),
    architecture: document.getElementById('architecture'),
    cpuCores: document.getElementById('cpu-cores'),
    memory: document.getElementById('memory'),
    systemTimezone: document.getElementById('system-timezone'),
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
    refreshNetworkButton: document.getElementById('refresh-network-button'),
    networkCardIcon: document.getElementById('network-card-icon'),
    ipDomainSearch: document.getElementById('ip-domain-search'),
    searchButton: document.getElementById('search-button'),
    selectedFlag: document.getElementById('selected-flag'),
    selectedLangText: document.getElementById('selected-lang-text'),
    languageDropdown: document.querySelector('.language-dropdown'),
    languageSelector: document.querySelector('.language-selector'),
    languageButton: document.querySelector('.language-button')
};

function translatePage() {
    const lang = currentLang;
    const translationSet = translations[lang] || translations['en'];

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.dataset.translate;
        if (translationSet[key]) {
            el.textContent = translationSet[key];
        }
    });

    if (elements.ipDomainSearch) {
        elements.ipDomainSearch.placeholder = translationSet.ipSearchPlaceholder;
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
            elements.selectedFlag.src = 'https://whoisneon.github.io/Nexus-Hub/assets/ir.svg';
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
        if (translationKey) {
            const translationSet = translations[currentLang] || translations['en'];
            element.textContent = translationSet[translationKey] || text;
        } else {
            element.textContent = text;
        }
    }
};

const setInnerHTML = (element, html, translationKey = null) => {
    if (element) {
        if (translationKey) {
            const translationSet = translations[currentLang] || translations['en'];
            const statusText = translationSet[translationKey] || '';
            element.innerHTML = html.replace('STATUS_TEXT', statusText);
        } else {
            element.innerHTML = html;
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

function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    let version = 'Unknown';
    let engine = 'Unknown';
    let browserSvg = null;

    if (navigator.brave) {
        browser = 'Brave';
        version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
        browserSvg = 'brave.svg';
    } else if (ua.includes('Vivaldi')) {
        browser = 'Vivaldi';
        version = ua.match(/Vivaldi\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
        browserSvg = 'vivaldi.svg';
    } else if (ua.includes('DuckDuckGo')) {
        browser = 'DuckDuckGo';
        version = ua.match(/DuckDuckGo\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'WebKit';
        browserSvg = 'duckduckgo.svg';
    } else if (ua.includes('SamsungBrowser')) {
        browser = 'Samsung Internet';
        version = ua.match(/SamsungBrowser\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
        browserSvg = 'samsung-internet.svg';
    } else if (ua.includes('Edg')) {
        browser = 'Edge';
        version = ua.match(/Edg\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
        browserSvg = 'edge.svg';
    } else if (ua.includes('Opera') || ua.includes('OPR')) {
        browser = 'Opera';
        if (ua.includes('Opera GX')) {
            browser = 'Opera GX';
            browserSvg = 'opera-gx.svg';
        } else {
            browserSvg = 'opera.svg';
        }
        version = ua.match(/(Opera|OPR|Opera GX)\/([0-9.]+)/)?.[2] || 'Unknown';
        engine = 'Blink';
    } else if (ua.includes('Firefox')) {
        browser = 'Firefox';
        version = ua.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Gecko';
        browserSvg = 'firefox.svg';
    } else if (ua.includes('Chrome')) {
        browser = 'Chrome';
        version = ua.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'Blink';
        browserSvg = 'chrome.svg';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
        browser = 'Safari';
        version = ua.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
        engine = 'WebKit';
        browserSvg = 'safari.svg';
    } else if (ua.includes('MSIE') || ua.includes('Trident')) {
        browser = 'Internet Explorer';
        version = ua.match(/(MSIE |rv:)([0-9.]+)/)?.[2] || 'Unknown';
        engine = 'Trident';
        browserSvg = 'ie.svg';
    }

    if (elements.browserCardIcon) {
        if (browserSvg) {
            const divHtml = `<div class="browser-logo" style="--svg-url: url('https://whoisneon.github.io/Nexus-Hub/assets/browsers/${browserSvg}');"></div>`;
            setInnerHTML(elements.browserCardIcon, divHtml);
        } else {
            setInnerHTML(elements.browserCardIcon, `<i class="ph ph-browser"></i>`);
        }
    }

    return { browser, version, engine };
}

function getOSInfo() {
    const ua = navigator.userAgent;
    let os = 'Unknown';
    let deviceType = 'Desktop';
    let osIconClass = 'ph ph-desktop';

    if (ua.includes('Windows')) {
        if (ua.includes('Windows NT 10.0')) os = 'Windows 10/11';
        else if (ua.includes('Windows NT 6.3')) os = 'Windows 8.1';
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
        osIconClass = 'ph ph-google-logo';
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

function resetNetworkInfoState() {
    setInnerHTML(elements.ipAddress, '<i class="loading"></i>');
    setInnerHTML(elements.ipv6Address, '<i class="loading"></i>');
    setInnerHTML(elements.country, '<i class="loading"></i>');
    setInnerHTML(elements.region, '<i class="loading"></i>');
    if (elements.regionItem) elements.regionItem.style.display = 'none';
    setInnerHTML(elements.city, '<i class="loading"></i>');
    setInnerHTML(elements.isp, '<i class="loading"></i>');
    setInnerHTML(elements.organization, '<i class="loading"></i>');
    setInnerHTML(elements.connectionType, '<i class="loading"></i>');
    setInnerHTML(elements.ipTimezone, '<i class="loading"></i>');
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

    if (countryIso && elements.country) {
        elements.country.dataset.iso = countryIso;
    }

    let countryDisplay = country;
    if (countryIso) {
        let flagUrl;
        if (countryIso === 'ir') {
            flagUrl = `https://whoisneon.github.io/Nexus-Hub/assets/ir.svg`;
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
        setTextContent(elements.organization, organization);
    }

    setInnerHTML(elements.country, countryDisplay);
    setTextContent(elements.city, city);
    setTextContent(elements.isp, isp);
    setTextContent(elements.connectionType, asn);
    setTextContent(elements.ipTimezone, ipTimezone);
}

let spamClicks = [];
const SPAM_LIMIT = 5;
const SPAM_WINDOW = 10000;
const SPAM_BLOCK_TIME = 10000;

function spamDetector() {
    const now = Date.now();
    spamClicks = spamClicks.filter(ts => now - ts < SPAM_WINDOW);
    spamClicks.push(now);
    if (spamClicks.length > SPAM_LIMIT) {
        if (elements.refreshNetworkButton) elements.refreshNetworkButton.disabled = true;
        if (elements.searchButton) elements.searchButton.disabled = true;
        setTimeout(() => {
            spamClicks = [];
            if (elements.refreshNetworkButton) elements.refreshNetworkButton.disabled = false;
            if (elements.searchButton) elements.searchButton.disabled = false;
        }, SPAM_BLOCK_TIME);
        alert('You are clicking too fast! 10 seconds cooldown applied.');
        return true;
    }
    return false;
}

async function fetchIPInfo(query = '') {
    if (spamDetector()) return;
    if (elements.refreshNetworkButton.disabled) return;
    elements.refreshNetworkButton.disabled = true;
    if (elements.searchButton) elements.searchButton.disabled = true;
    resetNetworkInfoState();

    const t = translations[currentLang] || translations.en;
    const TOKEN = 'eb2978e07c2e4a5e9bcb8c40e5f68292';
    const TIMEOUT = 10000;

    const raceTimeout = (ms, msg = 'Request timeout') =>
        new Promise((_, reject) => setTimeout(() => reject(new Error(msg)), ms));

    const fetchWithTimeout = (url, opts, ms = TIMEOUT) =>
        Promise.race([fetch(url, opts), raceTimeout(ms)]);

    const canCopy = (id, content) => {
        if (!content) return false;
        const invalid = {
            'ip-address': ['unknown', 'unavailable', 'invalidIP'],
            'ipv6-address': ['unknown', 'unavailable'],
            asn: ['unknown', 'unavailable'],
            isp: ['unknown', 'unavailable'],
            gpu: ['unknown', 'unavailable', 'notDetected'],
        }[id] || [];
        const invalidVals = invalid.map((k) => t[k]);
        return !invalidVals.includes(content.trim());
    };

    const setCopy = (id, content) => {
        const el = document.getElementById(id);
        if (el && canCopy(id, content)) addCopyFeature(id);
    };

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

    const fetchGeo = async (ip) => {
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
            setTextContent(elements.connectionType, t.unavailable);
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

    const finish = () => {
        hidePreloader();
        elements.ipDomainSearch.value = query;
        elements.ipDomainSearch.placeholder = t.ipSearchPlaceholder;
        setTimeout(() => {
            elements.refreshNetworkButton.disabled = false;
            if (elements.searchButton) elements.searchButton.disabled = false;
        }, REFRESH_COOLDOWN);
    };

    try {
        let processedQuery = query.trim();
        let effectiveIP = null;

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
            setTextContent(elements.ipv6Address, ipv6);
            setCopy('ip-address', ipv4);
            setCopy('ipv6-address', ipv6);
            elements.ipv6Item.style.display = ipv6 === t.unavailable ? 'none' : 'flex';
            elements.ipv4Item.style.display = 'flex';
            effectiveIP = ipv4;

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

            const ipFromDomain = await (async () => {
                try {
                    const res = await fetchWithTimeout(`https://ip-api.com/json/${processedQuery}`);
                    if (!res.ok) return null;
                    const data = await res.json();
                    return (data.status === 'success' && data.query) ? data.query : null;
                } catch {
                    return null;
                }
            })();

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
                return finish();
            }
        }

        const geo = await fetchGeo(effectiveIP);
        showGeo(geo);

    } catch (e) {
        setTextContent(elements.ipAddress, t.unavailable);
        setTextContent(elements.ipv6Address, t.unavailable);
        showGeo(null);
    } finally {
        finish();
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
    const { browser, version, engine } = getBrowserInfo();
    const { os, deviceType, osIconClass } = getOSInfo();
    const translationSet = translations[currentLang] || translations['en'];
    setTextContent(elements.browser, browser);
    setTextContent(elements.browserVersion, version);
    setTextContent(elements.browserEngine, engine);
    setTextContent(elements.userAgent, navigator.userAgent);
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
    });

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
});

function adjustHeaderContent() {
    const headerH1 = document.querySelector('.header h1');
    if (window.innerWidth < 367) { headerH1.textContent = 'Nexus'; }
    else { headerH1.textContent = 'Nexus Hub'; }
}
document.addEventListener('DOMContentLoaded', adjustHeaderContent);
window.addEventListener('resize', adjustHeaderContent);
history.scrollRestoration = 'manual';