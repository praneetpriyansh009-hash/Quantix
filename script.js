// ═══════════ VAJDHATA — IMMERSIVE JS ═══════════

// PRELOADER
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('done'), 2000);
});

// CURSOR
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
});
(function raf() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(raf);
})();

// MAGNETIC
document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width/2)*0.15}px, ${(e.clientY - r.top - r.height/2)*0.15}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
});

// NAV + BTT
const nav = document.getElementById('navbar');
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 60);
    btt.classList.toggle('visible', scrollY > 500);
});

// HAMBURGER
const hb = document.getElementById('hamburger');
const mn = document.getElementById('mobileNav');
hb.addEventListener('click', () => mn.classList.toggle('open'));
mn.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mn.classList.remove('open')));

// ACTIVE NAV
const secs = document.querySelectorAll('.sec, #hero');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let c = '';
    secs.forEach(s => { if (pageYOffset >= s.offsetTop - 250) c = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${c}`));
});

// REVEAL
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            e.target.querySelectorAll('.stat-val').forEach(n => {
                if (!n.dataset.done) { animVal(n, +n.dataset.target, 1800); n.dataset.done = 1; }
            });
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

function animVal(el, end, dur) {
    if (end === 0) return;
    let start = null;
    function step(t) {
        if (!start) start = t;
        const p = Math.min((t - start) / dur, 1);
        el.textContent = Math.floor(p * (2 - p) * end);
        if (p < 1) requestAnimationFrame(step); else el.textContent = end;
    }
    requestAnimationFrame(step);
}

// LEARN MORE TOGGLE
function toggleMore(btn) {
    const expand = btn.previousElementSibling;
    if (!expand) return;
    const isOpen = expand.style.display !== 'none';
    expand.style.display = isOpen ? 'none' : 'block';
    btn.textContent = isOpen ? 'Learn more ↓' : 'Show less ↑';
    btn.classList.toggle('expanded', !isOpen);
}

// ═══════════ STARFIELD CANVAS ═══════════
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H;

function resize() {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
}
addEventListener('resize', resize);
resize();

// Create stars — dense field for fullscreen impact
const STAR_COUNT = 500;
const stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        brightness: Math.random() * 0.5 + 0.5,
        // Slight color variation
        hue: Math.random() > 0.8 ? (Math.random() > 0.5 ? 170 : 270) : 0, // Most white, some cyan, some purple
        sat: Math.random() > 0.8 ? 80 : 0
    });
}

// Shooting stars
const shootingStars = [];
function spawnShootingStar() {
    shootingStars.push({
        x: Math.random() * W * 0.8,
        y: Math.random() * H * 0.3,
        len: Math.random() * 80 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 6 + Math.random() * 0.3,
        life: 1,
        decay: Math.random() * 0.015 + 0.01
    });
}
// Spawn occasionally
setInterval(() => { if (Math.random() > 0.3) spawnShootingStar(); }, 2200);

// Nebula glow positions (subtle colored clouds)
const nebulae = [
    { x: 0.15, y: 0.25, r: 550, color: 'rgba(211,167,91, 0.02)' },
    { x: 0.85, y: 0.55, r: 600, color: 'rgba(255,136,0, 0.018)' },
    { x: 0.5, y: 0.85, r: 450, color: 'rgba(228,186,115, 0.012)' },
    { x: 0.65, y: 0.15, r: 400, color: 'rgba(211,167,91, 0.01)' },
];

let t = 0;
function drawStarfield() {
    t += 0.016;
    ctx.clearRect(0, 0, W, H);

    // Deep space background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, W, H);

    // Nebula clouds
    nebulae.forEach(n => {
        const grd = ctx.createRadialGradient(n.x * W, n.y * H, 0, n.x * W, n.y * H, n.r);
        grd.addColorStop(0, n.color);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
    });

    // Stars with twinkling
    stars.forEach(s => {
        const twinkle = Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset) * 0.4 + 0.6;
        const alpha = s.brightness * twinkle;
        
        if (s.sat > 0) {
            ctx.fillStyle = `hsla(${s.hue}, ${s.sat}%, 80%, ${alpha})`;
        } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        }
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Glow on larger stars
        if (s.r > 1.2) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = s.sat > 0
                ? `hsla(${s.hue}, ${s.sat}%, 70%, ${alpha * 0.08})`
                : `rgba(255, 255, 255, ${alpha * 0.06})`;
            ctx.fill();
        }
    });

    // Shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life -= ss.decay;

        if (ss.life <= 0) { shootingStars.splice(i, 1); continue; }

        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${ss.life * 0.8})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.life})`;
        ctx.fill();
    }

    requestAnimationFrame(drawStarfield);
}
drawStarfield();

// Reposition stars on resize
addEventListener('resize', () => {
    stars.forEach(s => {
        s.x = Math.random() * W;
        s.y = Math.random() * H;
    });
});
