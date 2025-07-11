# System Info Hub 🌐

**System Info Hub** is a lightweight, clean web application designed to provide comprehensive information about the user's current environment, including system, browser, and network details.

The application features a modern, card-based user interface with a background video and supports dark mode. It offers a seamless user experience with a preloader animation and dynamic rendering of information.

## ✨ Features

* **Network Information:** Displays key network data, including IPv4 and IPv6 addresses, geographical location (City, Country), ISP, connection type, and the detected IP time zone.
* **Browser Details:** Identifies the browser name, version, rendering engine (e.g., Blink, Gecko, WebKit), and provides the full User Agent string. It also checks if cookies are enabled.
* **System Information:** Gathers details about the Operating System, device type (Desktop, Mobile, Tablet), architecture, CPU cores, available memory, and system time zone.
* **Display & Graphics:** Reports screen resolution, viewport size, color depth, GPU renderer information (if supported), and pixel ratio.
* **Security & Privacy:** Checks the HTTPS status of the connection, Do Not Track settings, WebRTC support, and the availability of local and session storage.
* **Web Features:** Verifies support for core web functionalities such as JavaScript, WebGL, Geolocation, and Touch support, along with the current online status.
* **Copy to Clipboard:** Provides a convenient button to copy the IP address, IPv6 address, and User Agent string.
* **Dynamic Theme:** Includes a theme toggle for switching between light and dark modes.

## ⚙️ Technologies

* **HTML5 & CSS3:** For structuring and styling the interface.
* **JavaScript:** Used for detecting system information, fetching network data via APIs, theme management, and implementing the copy functionality.
* **External Libraries:**
    * [Phosphor Icons](https://phosphoricons.com/): For interface icons.
    * [Google Fonts (Inter)](https://fonts.google.com/specimen/Inter): For typography.
    * [Theme Toggles](https://theme-toggles.com/): For the theme switch button.

## 📁 Usage

This project is designed as a single HTML file containing all necessary HTML, CSS, and JavaScript.
To use it, simply open the `index.html` file in your web browser.

## 🧠 Acknowledgments

* **Developer:** [WhoisNeon](https://github.com/WhoisNeon)
* **IP Information API:** The application utilizes external APIs (e.g., `api.my-ip.io`, `api.ipify.org`) to fetch network details.
