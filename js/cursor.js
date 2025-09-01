document.addEventListener('DOMContentLoaded', () => {
    const isMobile = () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (isMobile()) {
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor,
            svg.trail {
                display: none;
            }
        `;
        document.head.appendChild(style);
        return;
    } else {
        const style = document.createElement('style');
        style.textContent = `
            * {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    const trailSegments = 50;
    const smoothingFactor = 0.5;
    const idleTimeout = 2000;

    const cursor = document.querySelector(".custom-cursor");
    const svg = document.querySelector("svg.trail");
    const path = svg.querySelector("path");

    const mouse = { x: 0, y: 0 };
    const points = Array.from({ length: trailSegments }, () => ({ x: 0, y: 0 }));

    let idleTimer;
    let isCursorVisible = false;

    const setSvgSize = () => {
        svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
    };

    const activateCursor = () => {
        if (!isCursorVisible) {
            cursor.style.opacity = '1';
            svg.style.opacity = '1';
            isCursorVisible = true;
        }
        clearTimeout(idleTimer);
        cursor.classList.remove('hidden');
        svg.classList.remove('hidden');
        startIdleTimer();
    };

    const startIdleTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            cursor.classList.add('hidden');
            svg.classList.add('hidden');
            isCursorVisible = false;
        }, idleTimeout);
    };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        activateCursor();
    });

    window.addEventListener("mousedown", () => {
        activateCursor();
        cursor.classList.add('click-effect');
    });

    window.addEventListener("mouseup", () => {
        cursor.classList.remove('click-effect');
    });
    window.addEventListener("scroll", activateCursor);
    window.addEventListener("keydown", activateCursor);
    window.addEventListener("resize", setSvgSize);

    // Hover effect SVG cursor
    const interactiveCursor = document.createElement("div");
    interactiveCursor.style.position = "fixed";
    interactiveCursor.style.top = "0";
    interactiveCursor.style.left = "0";
    interactiveCursor.style.zIndex = "5";
    interactiveCursor.style.pointerEvents = "none";
    interactiveCursor.style.display = "none";
    interactiveCursor.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--cursor-head-color)" viewBox="0 0 256 256">
            <path class="cursor-path" d="M224,104v50.93c0,46.2-36.85,84.55-83,85.06A83.71,83.71,0,0,1,80.6,215.4C58.79,192.33,34.15,136,34.15,136a16,16,0,0,1,6.53-22.23c7.66-4,17.1-.84,21.4,6.62l21,36.44a6.09,6.09,0,0,0,6,3.09l.12,0A8.19,8.19,0,0,0,96,151.74V32a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V104a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25V88a16,16,0,0,1,16.77-16c8.61.4,15.23,7.82,15.23,16.43V112a8,8,0,0,0,8.53,8,8.17,8.17,0,0,0,7.47-8.25v-7.28c0-8.61,6.62-16,15.23-16.43A16,16,0,0,1,224,104Z"></path>
        </svg>
    `;
    document.body.appendChild(interactiveCursor);

    // Disabled SVG cursor
    const disabledCursor = document.createElement("div");
    disabledCursor.style.position = "fixed";
    disabledCursor.style.top = "0";
    disabledCursor.style.left = "0";
    disabledCursor.style.zIndex = "5";
    disabledCursor.style.pointerEvents = "none";
    disabledCursor.style.display = "none";
    disabledCursor.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--cursor-disabled-bg)" viewBox="0 0 256 256">
            <path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm84,108a83.6,83.6,0,0,1-16.75,50.28L77.72,60.75A84,84,0,0,1,212,128ZM44,128A83.6,83.6,0,0,1,60.75,77.72L178.28,195.25A84,84,0,0,1,44,128Z"></path>
        </svg>
    `;
    document.body.appendChild(disabledCursor);

    // Text selector SVG cursor
    const textSelectorCursor = document.createElement("div");
    textSelectorCursor.style.position = "fixed";
    textSelectorCursor.style.top = "0";
    textSelectorCursor.style.left = "0";
    textSelectorCursor.style.zIndex = "5";
    textSelectorCursor.style.pointerEvents = "none";
    textSelectorCursor.style.display = "none";
    textSelectorCursor.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="var(--cursor-head-color)" viewBox="0 0 256 256">
            <path class="cursor-path" d="M184,208a8,8,0,0,1-8,8H160a40,40,0,0,1-32-16,40,40,0,0,1-32,16H80a8,8,0,0,1,0-16H96a24,24,0,0,0,24-24V136H104a8,8,0,0,1,0-16h16V80A24,24,0,0,0,96,56H80a8,8,0,0,1,0-16H96a40,40,0,0,1,32,16,40,40,0,0,1,32-16h16a8,8,0,0,1,0,16H160a24,24,0,0,0-24,24v40h16a8,8,0,0,1,0,16H136v40a24,24,0,0,0,24,24h16A8,8,0,0,1,184,208Z"></path>
        </svg>
    `;
    document.body.appendChild(textSelectorCursor);

    const animate = () => {
        const elementUnderCursor = document.elementFromPoint(mouse.x, mouse.y);
        const isInteractive = elementUnderCursor?.closest('a, button:not(:disabled), .theme-toggle, .language-selector, .copy-button, .search-button:not(:disabled), input, .notice-checkbox-wrapper, #user-agent');
        const isDisabledButton = elementUnderCursor?.closest('button:disabled, .search-button:disabled, .refresh-button:disabled');
        const isTextInput =
            elementUnderCursor &&
            (
                elementUnderCursor.matches('input[type="text"]:focus, textarea:focus') ||
                elementUnderCursor.isContentEditable
            );
        if (isTextInput) {
            cursor.style.display = 'none';
            svg.style.display = 'none';
            interactiveCursor.style.display = 'none';
            disabledCursor.style.display = 'none';
            textSelectorCursor.style.display = '';
            textSelectorCursor.style.transform = `translate(${mouse.x - 8}px, ${mouse.y - 12}px)`;
        } else if (isDisabledButton) {
            cursor.style.display = 'none';
            svg.style.display = 'none';
            interactiveCursor.style.display = 'none';
            textSelectorCursor.style.display = 'none';
            disabledCursor.style.display = '';
            disabledCursor.style.transform = `translate(${mouse.x - 10}px, ${mouse.y - 10}px)`;
        } else if (isInteractive) {
            cursor.style.display = 'none';
            svg.style.display = 'none';
            textSelectorCursor.style.display = 'none';
            disabledCursor.style.display = 'none';
            interactiveCursor.style.display = '';
            interactiveCursor.style.transform = `translate(${mouse.x - 8}px, ${mouse.y - 0}px)`;
        } else {
            cursor.style.display = '';
            svg.style.display = '';
            textSelectorCursor.style.display = 'none';
            interactiveCursor.style.display = 'none';
            disabledCursor.style.display = 'none';
        }

        const centeredX = mouse.x - cursor.offsetWidth / 2 + 1.5;
        const centeredY = mouse.y - cursor.offsetHeight / 2 + 2;
        cursor.style.transform = `translate(${centeredX}px, ${centeredY}px)`;

        let leaderX = mouse.x + 1.5;
        let leaderY = mouse.y + 2;
        points.forEach((p, index) => {
            const currentX = p.x;
            const currentY = p.y;
            p.x += (leaderX - currentX) * smoothingFactor;
            p.y += (leaderY - currentY) * smoothingFactor;
            leaderX = currentX;
            leaderY = currentY;
        });

        const pathData = `M ${points.map((p) => `${p.x} ${p.y}`).join(` L `)}`;
        path.setAttribute("d", pathData);

        requestAnimationFrame(animate);
    };

    setSvgSize();
    animate();
    startIdleTimer();
});