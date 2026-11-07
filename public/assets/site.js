// Drive each scene from its position in the normal scroll flow.
const hero = document.querySelector('.hero');
const chapter = document.querySelector('.chapter');
const signature = document.querySelector('.signature');
const stage = document.querySelector('.signature-stage');
const options = document.querySelector('.option-grid');
const cafePhoto = options.querySelector('.option-photo');
const takeawayArt = options.querySelector('.option-art');
const toggle = document.querySelector('.motion-toggle');
const toggleLabel = toggle.querySelector('span');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');

const preferenceKey = 'yagi-scroll-effects';
let override;
try {
  const saved = localStorage.getItem(preferenceKey);
  if (saved === 'on' || saved === 'off') override = saved === 'on';
} catch {
  // Private browsing or blocked storage: the control still works for this visit.
}

const clamp = (value) => Math.min(1, Math.max(0, value));
const smooth = (value) => value * value * (3 - 2 * value);
const enter = (top, start, end) => clamp((start - top) / (start - end));
let frame = 0;
let enabled;

function updateMotion() {
  frame = 0;
  const height = window.innerHeight;
  const heroHeight = hero.getBoundingClientRect().height;
  const signatureTop = signature.getBoundingClientRect().top;
  const stageTop = stage.getBoundingClientRect().top;
  const cafeTop = cafePhoto.getBoundingClientRect().top;
  const artTop = takeawayArt.getBoundingClientRect().top;

  // The hero responds immediately; the mask gains speed as the whole cake enters.
  const heroTravel = clamp(window.scrollY / Math.max(200, Math.min(heroHeight * .80, height * .70)));
  const heroProgress = 1 - (1 - heroTravel) ** 2;
  const sectionProgress = smooth(enter(signatureTop, height, height * .25));
  const maskProgress = smooth(enter(stageTop, height * .95, height * .33));
  const typeProgress = enter(stageTop, height * .95, height * .04);
  const cakeProgress = enter(stageTop, height * .85, -height * .35);
  const cafeProgress = enter(cafeTop, height, -height * .24);
  const artProgress = smooth(enter(artTop, height * .91, height * .41));

  setProgress(hero, '--hero-progress', heroProgress);
  setProgress(chapter, '--chapter-progress', sectionProgress);
  setProgress(signature, '--section-progress', sectionProgress);
  setProgress(stage, '--mask-progress', maskProgress);
  setProgress(stage, '--type-progress', typeProgress);
  setProgress(stage, '--cake-progress', cakeProgress);
  setProgress(cafePhoto, '--cafe-progress', cafeProgress);
  setProgress(takeawayArt, '--art-progress', artProgress);
}

function setProgress(element, name, progress) {
  const value = progress.toFixed(3);
  if (element.style.getPropertyValue(name) !== value) element.style.setProperty(name, value);
}

function requestUpdate() {
  if (enabled && !frame) frame = requestAnimationFrame(updateMotion);
}

function syncPreference() {
  const active = override ?? !motionPreference.matches;
  toggle.setAttribute('aria-pressed', String(active));
  toggleLabel.textContent = active ? 'ON' : 'OFF';
  if (enabled === active) return;
  enabled = active;

  if (enabled) {
    updateMotion();
    document.documentElement.classList.add('has-scroll-effects');
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    window.addEventListener('pageshow', requestUpdate);
    document.fonts?.ready.then(requestUpdate);
  } else {
    document.documentElement.classList.remove('has-scroll-effects');
    window.removeEventListener('scroll', requestUpdate);
    window.removeEventListener('resize', requestUpdate);
    window.removeEventListener('pageshow', requestUpdate);
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

toggle.addEventListener('click', () => {
  override = !enabled;
  try { localStorage.setItem(preferenceKey, override ? 'on' : 'off'); } catch {}
  syncPreference();
});
motionPreference.addEventListener('change', syncPreference);
toggle.hidden = false;
syncPreference();
