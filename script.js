
// Hamburger Menu Logic
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Typed text effect in hero
const tag = document.querySelector('.hero-tag');
const texts = ['Data Analyst', 'Business Intelligence Specialist', 'AI Enthusiast', 'Data Storyteller'];
let ti = 0, ci = 0, deleting = false;
function typeEffect() {
    const current = texts[ti];
    if (!deleting) {
        tag.textContent = current.substring(0, ci + 1);
        ci++;
        if (ci === current.length) { deleting = true; setTimeout(typeEffect, 2000); return; }
    } else {
        tag.textContent = current.substring(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(typeEffect, deleting ? 50 : 100);
}
setTimeout(typeEffect, 1000);

