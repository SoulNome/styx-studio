/* ─────────────────────────────────────────────
   STYX STUDIO — UI: Nav, Sliders, Formulario
   ───────────────────────────────────────────── */

(function () {

  /* ── Menú móvil ── */
  var mobileOpen = false;

  window.tm = function () {
    mobileOpen = !mobileOpen;
    document.getElementById('mob').classList.toggle('open', mobileOpen);
    document.getElementById('b1').style.transform = mobileOpen ? 'translateY(7px) rotate(45deg)'  : '';
    document.getElementById('b2').style.opacity   = mobileOpen ? '0' : '1';
    document.getElementById('b3').style.transform = mobileOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  };

  window.cm = function () {
    mobileOpen = false;
    document.getElementById('mob').classList.remove('open');
    document.getElementById('b1').style.transform = '';
    document.getElementById('b2').style.opacity = '1';
    document.getElementById('b3').style.transform = '';
  };


  /* ── Efecto 3D en cards de servicios ── */
  document.querySelectorAll('.sc').forEach(function (card) {
    var glow = card.querySelector('.sc-glow');
    card.addEventListener('mousemove', function (e) {
      var r  = card.getBoundingClientRect();
      var dx = (e.clientX - r.left)  / r.width;
      var dy = (e.clientY - r.top)   / r.height;
      var rx = (dy - .5) * -14;
      var ry = (dx - .5) *  14;
      card.style.transform = 'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-8px)';
      if (glow) { glow.style.left = (dx * 100) + '%'; glow.style.top = (dy * 100) + '%'; }
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });


  /* ── Scrollbar personalizado — Servicios ── */
  var ssEl  = document.getElementById('ss');
  var sstEl = document.getElementById('sst');
  if (ssEl && sstEl) {
    ssEl.addEventListener('scroll', function () {
      var p = ssEl.scrollLeft / (ssEl.scrollWidth - ssEl.clientWidth);
      sstEl.style.left = (p * 80) + '%';
    });
  }


  /* ── Drag to scroll — Proyectos ── */
  var ptEl = document.getElementById('pt');
  if (ptEl) {
    var dragging = false, startX = 0, scrollLeft = 0;

    ptEl.addEventListener('mousedown',  function (e) { dragging = true; startX = e.pageX; scrollLeft = ptEl.scrollLeft; ptEl.classList.add('grab'); });
    ptEl.addEventListener('mousemove',  function (e) { if (!dragging) return; ptEl.scrollLeft = scrollLeft - (e.pageX - startX) * 1.6; });
    ptEl.addEventListener('mouseup',    function ()  { dragging = false; ptEl.classList.remove('grab'); });
    ptEl.addEventListener('mouseleave', function ()  { dragging = false; ptEl.classList.remove('grab'); });

    ptEl.addEventListener('touchstart', function (e) { startX = e.touches[0].pageX; scrollLeft = ptEl.scrollLeft; }, { passive: true });
    ptEl.addEventListener('touchmove',  function (e) { ptEl.scrollLeft = scrollLeft - (e.touches[0].pageX - startX); }, { passive: true });
  }


  /* ── Slider de testimonios ── */
  var ttEl = document.getElementById('tt');
  var tdEl = document.getElementById('td');
  var totalSlides = 3;
  var currentSlide = 0;
  var autoSlide;

  /* Crear dots */
  for (var i = 0; i < totalSlides; i++) {
    var dot = document.createElement('div');
    dot.className = 'tst-dot' + (i === 0 ? ' on' : '');
    (function (idx) {
      dot.addEventListener('click', function () { goTo(idx); });
    })(i);
    if (tdEl) tdEl.appendChild(dot);
  }

  function goTo(idx) {
    currentSlide = (idx + totalSlides) % totalSlides;
    if (ttEl) ttEl.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    document.querySelectorAll('.tst-dot').forEach(function (d, j) {
      d.classList.toggle('on', j === currentSlide);
    });
  }

  function startAuto() { autoSlide = setInterval(function () { goTo(currentSlide + 1); }, 5000); }
  function stopAuto()  { clearInterval(autoSlide); }

  startAuto();

  var prevBtn = document.getElementById('tp');
  var nextBtn = document.getElementById('tn');
  if (prevBtn) {
    prevBtn.addEventListener('click', function () { goTo(currentSlide - 1); });
    prevBtn.addEventListener('mouseenter', stopAuto);
    prevBtn.addEventListener('mouseleave', startAuto);
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function () { goTo(currentSlide + 1); });
    nextBtn.addEventListener('mouseenter', stopAuto);
    nextBtn.addEventListener('mouseleave', startAuto);
  }


  /* ── Efecto magnético en botones ── */
  document.querySelectorAll('.btn-p, .btn-s, .ncta, .cta-btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r  = btn.getBoundingClientRect();
      var dx = e.clientX - r.left - r.width  / 2;
      var dy = e.clientY - r.top  - r.height / 2;
      btn.style.transform = 'translate(' + (dx * .15) + 'px, ' + (dy * .15) + 'px)';
    });
    btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
  });


  /* ── Formulario CTA ── */
  var ctaBtn = document.getElementById('cb');
  var ctaInp = document.getElementById('cei');

  if (ctaBtn && ctaInp) {
    ctaBtn.addEventListener('click', function () {
      if (!ctaInp.value || ctaInp.value.indexOf('@') === -1) {
        ctaInp.style.borderColor = 'rgba(255,80,80,.5)';
        setTimeout(function () { ctaInp.style.borderColor = ''; }, 2000);
        return;
      }
      /* Aquí se puede conectar a un backend o servicio de email */
      ctaBtn.querySelector('.cta-btn-t').textContent = '¡Enviado! Te contactamos pronto';
      ctaBtn.style.background = 'rgba(0,255,240,.15)';
      ctaBtn.style.color      = 'var(--c)';
      ctaInp.value       = '';
      ctaInp.placeholder = '¡Hablamos pronto!';
    });
  }


  /* ── Smooth scroll en links ancla ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
