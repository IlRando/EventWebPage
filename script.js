// script.js
// ... timer logic ...
const eventDate = new Date('October 18, 2024 00:00:00');

// Popup functionality
const timerPopup = document.createElement('div');
timerPopup.classList.add('popup');

// Remove the original countdown element from the page
const countdownElement = document.querySelector('.timer');
if (countdownElement) {
    countdownElement.parentNode.removeChild(countdownElement);
}

// Update the timer within the popup 
function updateCountdown() {
    const now = new Date();
    const distance = eventDate - now;

    if (distance <= 0) {
        // Update the popup 
        timerPopup.innerHTML = `
            <div class="timer">Event has started!</div>
        `;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update or set the popup's content 
    timerPopup.innerHTML = `
        <div class="timer">${days}d ${hours}h ${minutes}m ${seconds}s</div>
    `;
}

// Call updateCountdown once to initially populate the popup
updateCountdown();

setInterval(updateCountdown, 1000);

document.body.appendChild(timerPopup);

// Show the popup after a delay (e.g., 3 seconds)
setTimeout(() => {
    timerPopup.classList.add('show');
}, 500);

// Tabbed content functionality with smooth transition
const tabs = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.tab-panel');

function showTab(index) {
    // Hide all tabs
    tabs.forEach((tab) => {
        tab.classList.remove('active');
    });

    // Show the selected tab
    tabs[index].classList.add('active');

    // Fade out all tab panels
    tabContent.forEach((panel) => {
        panel.style.opacity = '0';
    });

    // Fade in the selected tab panel
    setTimeout(() => {
        tabContent.forEach((panel) => {
            panel.style.display = 'none';
        });
        tabContent[index].style.display = 'block';
        setTimeout(() => {
            tabContent[index].style.opacity = '1';
        }, 50); // Keep the original smooth transition for tabs
    }, 300); // This delay should match the transition duration in CSS
}

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        showTab(index);
    });
});

// Show the first tab by default
showTab(0);

// Add animation delays to all cards
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${(index + 1) * 0.2}s`;
});

// Scroll button functionality
const scrollButton = document.getElementById('scrollButton');
scrollButton.setAttribute('aria-label', 'Scroll to Top/Bottom');

// Track the previous scroll position to determine scroll direction
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 200) {
        scrollButton.style.opacity = '0.7 !important';
        scrollButton.style.transform = 'translateY(0) !important';
    } else {
        scrollButton.style.opacity = '0 !important';
        scrollButton.style.transform = 'translateY(20px) !important';
    }

    // Update scroll direction and button appearance
    if (currentScrollPos > prevScrollPos) {
        scrollButton.classList.remove('scroll-to-top');
        scrollButton.classList.add('scroll-to-bottom');
    } else {
        scrollButton.classList.remove('scroll-to-bottom');
        scrollButton.classList.add('scroll-to-top');
    }

    prevScrollPos = currentScrollPos;
});

scrollButton.addEventListener('click', () => {
    if (scrollButton.classList.contains('scroll-to-bottom')) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});
