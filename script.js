// ==========================
// 3D White - Main JS
// ==========================

document.addEventListener('DOMContentLoaded', () => {

  // 1️⃣ Atualiza ano automaticamente
  const y = new Date().getFullYear();
  document.querySelectorAll('#year, #year-g, #year-o, #year-c').forEach(el => {
    if(el) el.textContent = y;
  });

  // 2️⃣ Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      mainNav.style.display = open ? 'block' : '';
    });
  }

  // 3️⃣ Smooth scroll for anchors
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

  // 4️⃣ Lightbox for gallery
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

  // 5️⃣ Toast notification & Formspree submission
  const contactForm = document.querySelector('.contact-form');
  const toast = document.getElementById('toast');

  if(contactForm && toast){
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // evita reload
      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if(response.ok){
          toast.classList.add('show');      // mostra toast
          contactForm.reset();               // limpa formulário
          setTimeout(() => {
            toast.classList.remove('show'); // esconde toast após 3s
          }, 3000);
        } else {
          alert("Erro ao enviar. Tente novamente!");
        }
      }).catch(() => alert("Erro ao enviar. Tente novamente!"));
    });
  }

});
