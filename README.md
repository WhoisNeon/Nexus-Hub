<p align="center">
  <img src="https://raw.githubusercontent.com/WhoisNeon/Nexus-Hub/refs/heads/master/src/assets/banner.png" alt="Nexus Hub Banner">
</p>

<p align="center">
  <a href="https://whoisneon.github.io/Nexus-Hub/"><img src="https://img.shields.io/badge/demo-online-brightgreen?style=for-the-badge" alt="Demo"></a>
  <a href="https://github.com/WhoisNeon/Nexus-Hub/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License"></a>
  <a href="#"><img src="https://img.shields.io/badge/build-passing-darkgreen?style=for-the-badge" alt="Build Passing"></a>
  </p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/version-1.1.1-blue?style=for-the-badge" alt="Version 1.1.1"></a>
  <a href="#"><img src="https://img.shields.io/badge/languages-10+-purple?style=for-the-badge" alt="+10 Languages"></a>
</p>

<p align="center">
<a href="https://deepwiki.com/WhoisNeon/Nexus-Hub"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
</p>


## 📋 Table of Contents

- [Features](#-features)
- [Live Demo](#-live-demo)
- [Usage](#-usage)
- [Tech Stack](#-tech-stack)
- [APIs Used](#-apis-used)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#️-author)

---

## ✨ Features

- **Comprehensive Information Panels:**
  - IPv4/v6 addresses, Geolocation (Country, City, Region), ISP, ASN, network timezone.
  - Operating System, Device Type, CPU Cores, estimated Memory, Architecture.
  - Browser name, version, rendering engine, full User Agent string.
- **Interactive UX/UI:**
  - Search bar for any valid IP address or domain.
  - "Copy to Clipboard" for key info.
  - Seamless dark/light theme switcher.
  - Multi-language support (10+ languages).
  - Fully responsive design.
- **Modern Design:**
  - Smooth loading animations.
  - Icon-driven cards.
  - Glassmorphism effect.

---

## 📂 Project Structure

```
src/
├── assets/       # Images, videos, favicons, and other media assets
├── css/          # Stylesheets, organized into base, layout, and components
│   ├── components/ # Component-specific styles (e.g., cursor, header, info-card)
│   ├── base.css    # Base styles and resets
│   ├── layout.css  # Layout-specific styles (e.g., grid, flex)
│   └── main.css    # Main stylesheet, importing other styles
└── js/           # JavaScript files, organized into modules, standalone, and utils
    ├── modules/    # Modular JavaScript components (e.g., geolocation, language, preloader)
    ├── standalone/ # Standalone scripts (e.g., cursor, blocker, notif, translations)
    ├── utils/      # Utility functions (e.g., browser, copy, dom, network, system, theme)
    └── main.js     # Main application logic and initialization
```

---

## 🔴 Live Demo

Experience Nexus Hub live in your browser: [![Live Demo](https://img.shields.io/badge/Nexus-Live%20Demo-green?style=for-the-badge)](https://whoisneon.github.io/Nexus-Hub)

---

## 🚀 Usage

1.  **Access the Live Demo:** Open the [Live Demo](https://whoisneon.github.io/Nexus-Hub) in your browser.
2.  **Instant Information:** View your system, browser, and network details instantly.
3.  **Search Functionality:** Use the search bar to look up any valid IP address or domain.
4.  **Customize Experience:** Switch themes or languages using the controls in the header.
5.  **Copy Information:** Click the clipboard icon next to any information field to copy it.

### Local Setup

To run Nexus Hub locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/WhoisNeon/Nexus-Hub.git
    cd Nexus-Hub
    ```
2.  **Open `index.html`:** Simply open the `index.html` file in your web browser.
3.  **Configure for Local Use:**
    *   Open `src/js/modules/geolocation.js`.
    *   Set the `isLocal` variable to `true`.
    *   Replace `YOUR_FINDIP_API_TOKEN` with your actual FindIP API token.
        ```javascript
        // Around line 140:
        const isLocal = true; // Set to true for local development
        const FINDIP_TOKEN = 'YOUR_FINDIP_API_TOKEN'; // Replace with your FindIP API token
        ```

---

## 🛠️ Tech Stack

| Technology            |                                                                    Icon                                                                    |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------: |
| **HTML5**             |        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" width="40" height="40"/>         |
| **CSS3**              |          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" width="40" height="40"/>          |
| **JavaScript (ES6+)** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40"/> |

---

## 🌐 APIs Used

- [IPify](https://www.ipify.org/) — for public IP detection.
- [FindIP](https://findip.net/) — for geolocation and network info.
- [Cloudflare DNS-over-HTTPS](https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https) — for domain resolution.
- [Google DNS-over-HTTPS](https://developers.google.com/speed/public-dns/docs/dns-over-https) — for domain resolution.
- [Circle Flags](https://github.com/hatscripts/circle-flags) — for country flags.
- [Phosphor Icons](https://phosphoricons.com/) — for UI icons.
- [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter) — for typography.

---

## 🧩 Troubleshooting

- **Why can't I open DNS API links directly in my browser?**  
  DNS-over-HTTPS endpoints (like Cloudflare or Google) are APIs, not web pages. They expect specific headers and return JSON, not HTML.
- **Some info is missing or shows "Unknown":**
  - Your browser/device may restrict access to certain details for privacy.
  - Network APIs may be blocked by your firewall or region.
- **Domain resolution fails:**
  - The domain may not exist or DNS APIs may be blocked.
  - Check browser console for error logs.

---

## 🤝 Contributing

Contributions are welcome!  
If you have suggestions for improvements, fork the repository and submit a pull request.  
You can also open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [`LICENSE`](LICENSE) file for details.

---

## ✍️ Author

Created with ❤️ by **[WhoisNeon](https://github.com/WhoisNeon)**.
