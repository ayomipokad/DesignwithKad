/* ══════════════════════════════════════
PAGE SWITCHER  (same pattern as index.html)
══════════════════════════════════════ */

function showPage(pageId, anchor) {
    // hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // show target
    const target = document.getElementById(pageId);
    if (target) target.classList.add('active');
    // update nav active state
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.dataset.page === pageId && !a.dataset.anchor);
    });
    // scroll to top then optionally to anchor
    window.scrollTo(0, 0);
    if (anchor) {
        setTimeout(() => {
            const el = document.getElementById(anchor);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
    }
    // re-trigger reveal animations for the newly shown page
    initReveals();
}
// Wire all nav links and footer links
document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = el.dataset.page;
        const anchor = el.dataset.anchor || null;
        showPage(pageId, anchor);
        // close mobile menu
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
    });
});
/* ══════════════════════════════════════
   HAMBURGER
══════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});
/* ══════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════ */
let revealObserver;
function initReveals() {
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.page.active .reveal, .page.active .fade-left, .page.active .fade-right, .page.active .stagger').forEach(el => {
        // reset so they animate in again
        el.classList.remove('visible');
        revealObserver.observe(el);
    });
}
initReveals();
/* ══════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════ */
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            if (isNaN(target)) return;
            let start = 0;
            const duration = 1200;
            const step = (ts) => {
                if (!start) start = ts;
                const progress = Math.min((ts - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(step);
                else el.textContent = target + '+';
            };
            requestAnimationFrame(step);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
/* ══════════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════════ */
document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.faq-answer').classList.remove('open');
        });
        if (!isOpen) {
            item.classList.add('open');
            item.querySelector('.faq-answer').classList.add('open');
        }
    });
});
/* ══════════════════════════════════════
   LESSON ACCORDION
══════════════════════════════════════ */
document.querySelectorAll('.lesson-item').forEach(item => {
    item.querySelector('.lesson-header').addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.lesson-item').forEach(i => {
            i.classList.remove('open');
            i.querySelector('.lesson-content').classList.remove('open');
        });
        if (!isOpen) {
            item.classList.add('open');
            item.querySelector('.lesson-content').classList.add('open');
        }
    });
});
// Disable Right-Click
document.addEventListener('contextmenu', (e) => e.preventDefault());
// Disable F12 and Inspection Shortcuts
document.onkeydown = function(e) {
    // Disable F12
    if (e.keyCode == 123) {
        return false;
    }
    // Disable Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    // Disable Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
};