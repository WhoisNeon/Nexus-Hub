export let preloaderHidden = false;

export function hidePreloader(elements) {
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
