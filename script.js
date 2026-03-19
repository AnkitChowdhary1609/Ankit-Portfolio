const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 6 + 'px';
    cursor.style.top = my - 6 + 'px';
});

function animateRing() {
    rx += (mx - rx - 20) * 0.12;
    ry += (my - ry - 20) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        ring.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        ring.style.transform = 'scale(1)';
    });
});

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

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');

            // For grids, apply staggered child delays dynamically
            if (e.target.classList.contains('skills-grid') ||
                e.target.classList.contains('projects-grid') ||
                e.target.classList.contains('achievements-grid') ||
                e.target.classList.contains('certs-grid')) {

                const children = Array.from(e.target.children);
                children.forEach((child, index) => {
                    child.style.setProperty('--child-delay', `${index * 0.15}s`);
                });
            }
        }
    });
}, { threshold: 0.1 });
reveals.forEach(r => io.observe(r));

// Navbar entrance animation
document.querySelectorAll('.nav-links a').forEach((link, index) => {
    link.style.setProperty('--delay', `${index * 0.1}s`);
});

// Typed text effect in hero
const tag = document.querySelector('.hero-tag');
const texts = ['Computer Science Engineer', 'Data Engineer', 'AI Enthusiast', 'Cloud Architect'];
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

// --- Background Video Color Sequence ---
const videoOverlay = document.getElementById('videoOverlay');
if (videoOverlay) {
    // Sequence matching user request: Red, Green, Blue, Black
    const videoSequence = [
        'rgba(255, 0, 60, 0.6)',   // Red
        'rgba(0, 255, 65, 0.6)',   // Green
        'rgba(26, 100, 255, 0.6)', // Blue
        'rgba(255, 255, 255, 0.6)' // White
    ];
    let vSeqIndex = 0;

    // Initial Color
    videoOverlay.style.backgroundColor = videoSequence[0];

    // Change Every 5 seconds
    setInterval(() => {
        vSeqIndex = (vSeqIndex + 1) % videoSequence.length;
        videoOverlay.style.backgroundColor = videoSequence[vSeqIndex];
    }, 5000);
}

// --- Theme Switcher Logic ---
const themeBtns = document.querySelectorAll('.theme-btn');
const rootElement = document.documentElement;

function setTheme(theme) {
    // Determine which theme to set on the root element
    if (theme === 'monochrome') {
        rootElement.removeAttribute('data-theme');
    } else {
        rootElement.setAttribute('data-theme', theme);
    }

    // Update active state on buttons
    themeBtns.forEach(btn => {
        if (btn.getAttribute('data-theme-btn') === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update profile picture
    const aboutImg = document.querySelector('.about-image');
    if (aboutImg) {
        if (theme === 'monochrome') {
            aboutImg.src = 'pic1.jpeg';
        } else {
            aboutImg.src = 'pic2.jpeg';
        }
    }
    
    // Persist to localStorage
    localStorage.setItem('portfolio-theme', theme);
}

// Load saved theme or default to cyber (red)
const savedTheme = localStorage.getItem('portfolio-theme') || 'cyber';
setTheme(savedTheme);

// Add click listeners to buttons
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const themeToSet = btn.getAttribute('data-theme-btn');
        setTheme(themeToSet);
    });
});

// --- Matrix Numbers Border Animation ---
const canvas = document.getElementById('numberBorderCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    // Resize canvas to full screen
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const chars = '010101010123456789'.split('');
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = [];
    
    // Initialize drops
    for(let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }

    let lastDrawTime = 0;
    const drawMatrix = (time) => {
        requestAnimationFrame(drawMatrix);
        
        // Throttling to make it look like a video and not run too fast
        if (time - lastDrawTime < 50) return;
        lastDrawTime = time;

        const isMonochrome = !document.documentElement.hasAttribute('data-theme');
        if (isMonochrome) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        } else {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        }
        
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Get current theme accent color dynamically
        let rawAccent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
        let accentColor = rawAccent || '#00ff41'; 
        
        // If monochrome (white theme), use a dark color for the numbers
        if (isMonochrome && (!rawAccent || rawAccent === '#000000')) {
            accentColor = '#555555'; 
        }
        
        ctx.fillStyle = accentColor;
        ctx.font = fontSize + 'px "Space Mono", monospace';
        
        // Handle resize properly
        const newCols = Math.floor(canvas.width / fontSize);
        if (newCols !== columns) {
            columns = newCols;
            const newDrops = [];
            for(let i = 0; i < columns; i++) {
                newDrops[i] = drops[i] || Math.random() * -50;
            }
            drops = newDrops;
        }

        for(let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };
    
    requestAnimationFrame(drawMatrix);
}
