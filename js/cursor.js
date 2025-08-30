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
    } else{
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

    window.addEventListener("mousedown", activateCursor);
    window.addEventListener("scroll", activateCursor);
    window.addEventListener("keydown", activateCursor);
    window.addEventListener("resize", setSvgSize);

    const animate = () => {
        const elementUnderCursor = document.elementFromPoint(mouse.x, mouse.y);
        const isInteractive = elementUnderCursor?.closest('a, button, .theme-toggle, .language-selector, .copy-button, .search-button');

        if (isInteractive) {
            cursor.classList.add('hover-effect');
        } else {
            cursor.classList.remove('hover-effect');
        }

        const centeredX = mouse.x - cursor.offsetWidth / 2;
        const centeredY = mouse.y - cursor.offsetHeight / 2;

        cursor.style.transform = `translate(${centeredX}px, ${centeredY}px)`;

        let leaderX = mouse.x;
        let leaderY = mouse.y;

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
