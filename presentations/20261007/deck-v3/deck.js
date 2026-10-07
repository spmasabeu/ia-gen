// Navegación por páginas (21 páginas PDF = 18 slides lógicas; builds como páginas) y escala al viewport.
(() => {
 const slides = [...document.querySelectorAll('.slide')];
 const show = index => {
  const i = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, n) => slide.classList.toggle('active', n === i));
  if (location.hash !== `#${i + 1}`) history.replaceState(null, '', `#${i + 1}`);
 };
 const current = () => slides.findIndex(slide => slide.classList.contains('active'));
 const fromHash = () => show((parseInt(location.hash.slice(1), 10) || 1) - 1);
 addEventListener('hashchange', fromHash);
 addEventListener('keydown', event => {
  if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); show(current() + 1); }
  else if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); show(current() - 1); }
  else if (event.key === 'Home') show(0);
  else if (event.key === 'End') show(slides.length - 1);
 });
 const rescale = () => document.documentElement.style.setProperty('--scale', Math.min(innerWidth / 1280, innerHeight / 720, 1));
 addEventListener('resize', rescale);
 rescale();
 fromHash();
})();
