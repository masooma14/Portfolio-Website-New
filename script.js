// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  cursor.style.transform = `translate(${mx-5}px, ${my-5}px)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx-18}px, ${ry-18}px)`;
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '54px'; ring.style.height = '54px'; ring.style.borderColor = 'rgba(200,240,60,0.7)'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'rgba(200,240,60,0.4)'; });
});

// Hamburger
const ham = document.getElementById('hamburger');
const menu = document.getElementById('mobileMenu');
const close = document.getElementById('closeMenu');
ham.addEventListener('click', () => menu.classList.add('open'));
close.addEventListener('click', () => menu.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => menu.classList.remove('open')));

// Scroll animations
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate skill bars
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

// Also trigger skill bars for already-visible skill cards
document.querySelectorAll('.skill-fill').forEach(bar => {
  const card = bar.closest('.skill-card');
  if (!card) return;
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) bar.style.width = bar.dataset.width + '%'; });
  }, { threshold: 0.3 });
  cardObs.observe(card);
});

// Contact form
function handleSubmit(btn) {
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#3cffc8';
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      btn.style.background = '';
    }, 3000);
  }, 1500);
}
