const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
reveals.forEach(el => observer.observe(el));

const parallaxItems = document.querySelectorAll('[data-speed]');
let ticking = false;
function parallax(){
  const y = window.scrollY;
  parallaxItems.forEach(el => {
    const speed = Number(el.dataset.speed || .15);
    el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
  });
  ticking = false;
}
window.addEventListener('scroll', () => {
  if(!ticking){ requestAnimationFrame(parallax); ticking = true; }
},{passive:true});

document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('pointermove', e => {
    if(window.innerWidth < 801) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    card.style.transform = `perspective(1100px) rotateX(${y*-2.2}deg) rotateY(${x*2.2}deg) translateZ(4px)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});

document.querySelectorAll('.nav-links a, .nav-cta, .btn').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.add('navigating');
    setTimeout(() => document.body.classList.remove('navigating'), 300);
  });
});
