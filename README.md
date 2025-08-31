<p align="center">
  <img src="https://raw.githubusercontent.com/WhoisNeon/Nexus-Hub/refs/heads/master/assets/banner.png" alt="Nexus Hub Banner">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge">
  <img src="https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/demo-online-blue?style=for-the-badge">
  <img src="https://img.shields.io/badge/languages-10+-purple?style=for-the-badge">
</p>

Nexus Hub is a web-based utility designed with a clean, responsive, and user-friendly interface, offering comprehensive insights into your system, browser, and network information at a glance. It's built for performance and simplicity, using only vanilla web technologies.

---

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

## 🔴 Live Demo


**Click the badge below to try "Nexus Hub" in your browser!**

<p align="left">
  <a href="https://whoisneon.github.io/Nexus-Hub" target="_blank">
    <img src="https://img.shields.io/badge/Open-Live%20Demo-green?style=for-the-badge" alt="Live Demo Badge">
  </a>
</p>

---

## 🚀 Usage

1. **Open the [Live Demo](https://whoisneon.github.io/Nexus-Hub) in your browser.**
2. **View your system, browser, and network details instantly.**
3. **Search for any IP address or domain using the search bar.**
4. **Switch themes or languages using the controls in the header.**
5. **Copy any info by clicking the clipboard icon next to it.**

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