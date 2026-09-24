const steps = [
  {img:'assets/market-reach-input.png',label:'STEP 01',title:'Simple farmer-friendly inputs',text:'The user provides a location, available margin capital and proposed business category. The interface stays intentionally simple and visual.',list:['Village / area / pincode','Available contribution capital','Business category']},
  {img:'assets/market-reach-loading.png',label:'STEP 02',title:'Samarth analyses the local area',text:'The system moves through a visible analysis flow — checking the local area, potential customers, existing businesses, demand signals and opportunities.',list:['Local area analysis','Potential customer discovery','Existing business signals','Demand & opportunity analysis']},
  {img:'assets/market-reach-dashboard.png',label:'STEP 03',title:'A decision-ready market dashboard',text:'The final view brings the local picture together: estimated customers, map-based reach, population distribution, demand indicators and distribution channels.',list:['5–10 km market view','Estimated customer base','Demand & distribution insights','Actionable local observations']}
];

const tabs = [...document.querySelectorAll('.demo-tab')];
const img = document.getElementById('demoImage');
const label = document.getElementById('stepLabel');
const title = document.getElementById('stepTitle');
const text = document.getElementById('stepText');
const list = document.getElementById('stepList');
const next = document.getElementById('nextStep');
let current = 0;

// The old Market Reach step controls are no longer visible in the Live Demo section,
// but keeping this block makes the page safe if those elements are restored later.
if (img && label && title && text && list && next && tabs.length) {
  function setStep(i) {
    current = (i + steps.length) % steps.length;
    const s = steps[current];
    img.src = s.img;
    label.textContent = s.label;
    title.textContent = s.title;
    text.textContent = s.text;
    list.innerHTML = s.list.map(x => `<li>${x}</li>`).join('');
    tabs.forEach((t, j) => t.classList.toggle('active', j === current));
    next.textContent = current === steps.length - 1 ? 'Back to input →' : 'Next stage →';
  }

  tabs.forEach((t, i) => t.addEventListener('click', () => setStep(i)));
  next.addEventListener('click', () => setStep(current + 1));
  setStep(0);
}

// Optional lightbox for the original Market Reach demo, if present.
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const zoomBtn = document.getElementById('zoomBtn');
const closeLightbox = document.getElementById('closeLightbox');
if (lb && lbImg && zoomBtn && closeLightbox && img) {
  zoomBtn.addEventListener('click', () => {
    lbImg.src = img.src;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
  });
  closeLightbox.addEventListener('click', () => {
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
  });
  lb.addEventListener('click', e => {
    if (e.target === lb) lb.classList.remove('open');
  });
}

// Mobile navigation.
const menu = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
if (menu && nav) {
  menu.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Reveal animations. This must always run, even when the optional demo controls are absent.
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(x => io.observe(x));
} else {
  document.querySelectorAll('.reveal').forEach(x => x.classList.add('visible'));
}

// Back-to-top button.
const back = document.getElementById('backTop');
if (back) {
  window.addEventListener('scroll', () => back.classList.toggle('show', window.scrollY > 700));
  back.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}
