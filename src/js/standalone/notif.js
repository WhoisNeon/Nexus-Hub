export function showNotif(message, type = 'info', durationInSeconds = 4) {
    const notifContainer = document.getElementById('notif-container');
    if (!notifContainer) {
        console.error('Notification container not found!');
        return;
    }

    const durationInMs = durationInSeconds * 1000;

    const notif = document.createElement('div');
    notif.classList.add('notif', type);

    let iconHtml;
    switch (type) {
        case 'success':
            iconHtml = '<i class="ph ph-check-circle"></i>';
            break;
        case 'warning':
            iconHtml = '<i class="ph ph-warning"></i>';
            break;
        case 'error':
            iconHtml = '<i class="ph ph-warning-octagon"></i>';
            break;
        default:
            iconHtml = '<i class="ph ph-info"></i>';
    }

    notif.innerHTML = `
        <div class="notif-content">
            <span class="notif-icon">${iconHtml}</span>
            <p class="notif-message">${message}</p>
        </div>
        <button class="notif-close-btn"><i class="ph ph-x"></i></button>
        <div class="notif-progress">
            <div class="notif-progress-bar"></div>
        </div>
    `;

    notifContainer.appendChild(notif);

    const closeBtn = notif.querySelector('.notif-close-btn');
    closeBtn.addEventListener('click', () => {
        closeNotif(notif);
    });

    const progressBar = notif.querySelector('.notif-progress-bar');
    progressBar.style.animationDuration = `${durationInMs}ms`;

    progressBar.addEventListener('animationend', () => {
        closeNotif(notif);
    });

    if (durationInMs > 0) {
        setTimeout(() => {
            closeNotif(notif);
        }, durationInMs);
    }
}

function closeNotif(notif) {
    if (notif.classList.contains('hide')) {
        return;
    }

    const notifHeight = notif.offsetHeight + 15;
    notif.style.setProperty('--slide-out-margin', `-${notifHeight}px`);

    notif.classList.add('hide');

    notif.addEventListener('animationend', (e) => {
        if (e.animationName === 'slideOut') {
            notif.remove();
        }
    });
}

export function clearNotifications() {
    const notifContainer = document.getElementById('notif-container');
    if (notifContainer) {
        notifContainer.innerHTML = '';
    }
}
