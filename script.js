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

// Hero video controller — handles both single-video and multi-video hero pages.
// Single point of control: VIDEO_PLAYBACK_RATE below. Adjust if 0.74x feels off.
(function () {
  const VIDEO_PLAYBACK_RATE = 0.74; // ~74% speed (slows perceived pan motion)

  const videos = document.querySelectorAll('.hero-video-bg');
  if (!videos.length) return;

  const reducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Apply playback rate to ALL videos. Re-apply on loadedmetadata since some
  // browsers (Safari especially) reset playbackRate when metadata loads.
  videos.forEach(v => {
    v.playbackRate = VIDEO_PLAYBACK_RATE;
    v.addEventListener('loadedmetadata', () => {
      v.playbackRate = VIDEO_PLAYBACK_RATE;
    });
  });

  if (reducedMotion) {
    // Reduced-motion users: pause everything, posters take over via CSS.
    videos.forEach(v => v.pause());
    return;
  }

  // Single-video page (pricing, booking) — `loop` attribute on the <video>
  // handles replay. Just ensure visible + playing.
  if (videos.length === 1) {
    videos[0].classList.add('active');
    videos[0].play().catch(() => { /* autoplay blocked; poster stays visible */ });
    return;
  }

  // Multi-video page (home) — event-based rotation between clips.
  videos[0].classList.add('active');
  videos[0].play().catch(() => {});

  videos.forEach((video, idx) => {
    video.addEventListener('ended', () => {
      const next = videos[(idx + 1) % videos.length];
      video.classList.remove('active');
      next.classList.add('active');
      next.currentTime = 0;
      next.playbackRate = VIDEO_PLAYBACK_RATE;
      next.play().catch(() => {});
    });
  });
})();
