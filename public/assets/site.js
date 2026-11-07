// A short alternate reveal for browsers without CSS scroll-driven animations.
const stage = document.querySelector('.signature-stage');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (stage && !CSS.supports('animation-timeline: view()') && 'IntersectionObserver' in window && !reduceMotion.matches) {
  const viewport = stage.querySelector('.photo-viewport');
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    if (reduceMotion.matches) return;
    const reveal = viewport.animate([
      { clipPath: 'inset(3% 8% 0 8% round 48% 48% 3px 3px / 25% 25% 3px 3px)' },
      { clipPath: 'inset(0% 0% 0% 0% round 0%)' },
    ], { duration: 720, easing: 'cubic-bezier(.24,.68,.28,1)' });
    reduceMotion.addEventListener('change', () => reveal.cancel(), { once: true });
  }, { threshold: 0.18 });
  observer.observe(stage);
}
