// set current year on all pages
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #year-g, #year-o, #year-c').forEach(el => {
    if(el) el.textContent = y;
  });

  // mobile nav toggle (affects all pages)
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      // small animation: when open, show overlay on mobile
      if(open){
        mainNav.style.display = 'block';
      } else {
        mainNav.style.display = '';
      }
    });
  }

  // simple smooth scroll (for anchors on same page)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if(mainNav && mainNav.classList.contains('open')){
            mainNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded','false');
          }
        }
      }
    });
  });

  // lightbox for gallery images (works on all pages using .gallery-item img)
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  function openLightbox(src, alt, caption){
    if(!lightbox) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('visible');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox(){
    if(!lightbox) return;
    lightbox.classList.remove('visible');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      const full = img.dataset.full || img.src;
      const caption = img.nextElementSibling ? img.nextElementSibling.textContent : img.alt;
      openLightbox(full, img.alt, caption);
    });
  });

  if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if(lightbox) lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });

});
