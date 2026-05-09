// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a link inside is clicked (mobile)
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && links.classList.contains('open')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// Hero video rotator — event-based, swaps when each clip's `ended` event fires.
// Only runs on the home page; exits silently if no .hero-video-bg elements exist.
(function () {
  const videos = document.querySelectorAll('.hero-video-bg');
  if (!videos.length) return;

  // Respect reduced-motion: don't auto-advance, let CSS show the poster fallback.
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Start the first video.
  const first = videos[0];
  first.classList.add('active');
  first.play().catch(() => { /* autoplay blocked; poster stays visible */ });

  videos.forEach((video, idx) => {
    video.addEventListener('ended', () => {
      const next = videos[(idx + 1) % videos.length];
      video.classList.remove('active');
      next.classList.add('active');
      next.currentTime = 0;
      next.play().catch(() => {});
    });
  });
})();
