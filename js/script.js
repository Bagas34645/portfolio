let menu = document.querySelector('#menu-btn');
let header = document.querySelector('.header');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
}

let themeToggler = document.querySelector('#theme-toggler');

themeToggler.onclick = () => {
    if (themeToggler.classList.contains('fa-moon')) {
        themeToggler.classList.remove('fa-moon');
        themeToggler.classList.add('fa-sun');
        document.body.classList.add('active');
    } else {
        themeToggler.classList.remove('fa-sun');
        themeToggler.classList.add('fa-moon');
        document.body.classList.remove('active');
    }
}

// Set initial state for progress bars on page load
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.progress .bar span').forEach(bar => {
        bar.style.transition = 'none';
        bar.style.width = '0';
    });
});

function animateProgressBars(progressEl) {
    progressEl.querySelectorAll('.bar span').forEach(bar => {
        const h3 = bar.parentElement.previousElementSibling;
        if (!h3) return;
        const percent = h3.querySelector('span')?.textContent.replace('%', '');
        if (!percent) return;
        bar.style.transition = 'none';
        bar.style.width = '0';
        void bar.offsetWidth;
        setTimeout(() => {
            bar.style.transition = 'width 1.2s cubic-bezier(.68,-0.55,.27,1.55)';
            bar.style.width = percent + '%';
        }, 150);
    });
}

// Intersection Observer for each progress bar
const progressEls = document.querySelectorAll('.progress');
progressEls.forEach(progressEl => {
    let animated = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animateProgressBars(progressEl);
                animated = true;
            } else if (!entry.isIntersecting && animated) {
                progressEl.querySelectorAll('.bar span').forEach(bar => {
                    bar.style.transition = 'none';
                    bar.style.width = '0';
                });
                animated = false;
            }
        });
    }, { threshold: 0.3 });
    observer.observe(progressEl);
});

// About link click triggers animation
const aboutLink = document.querySelector('a[href="#about"]');
if (aboutLink) {
    aboutLink.addEventListener('click', () => {
        setTimeout(() => {
            progressEls.forEach(progressEl => animateProgressBars(progressEl));
        }, 600); // Wait for scroll
    });
}

// Typing animation for 'I am a Software Engineer'
const typingElement = document.getElementById('typing');
if (typingElement) {
    const text = 'I am a Software Engineer';
    let idx = 0;
    function type() {
        if (idx <= text.length) {
            typingElement.textContent = text.slice(0, idx);
            idx++;
            setTimeout(type, 80);
        }
    }
    type();
}