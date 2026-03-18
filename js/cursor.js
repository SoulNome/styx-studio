/* ─────────────────────────────────────────────
   STYX STUDIO — Cursor personalizado
   ───────────────────────────────────────────── */

(function () {
  var c1 = document.getElementById('cd1');
  var c2 = document.getElementById('cd2');
  var c3 = document.getElementById('cd3');
  var c4 = document.getElementById('cd4');

  var mx = 0, my = 0;
  var r1x = 0, r1y = 0;
  var r2x = 0, r2y = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
  });

  /* Animación del cursor con lag suavizado */
  (function animCursor() {
    c1.style.left = mx + 'px';
    c1.style.top  = my + 'px';

    r1x += (mx - r1x) * .12;
    r1y += (my - r1y) * .12;
    c2.style.left = r1x + 'px';
    c2.style.top  = r1y + 'px';

    r2x += (mx - r2x) * .06;
    r2y += (my - r2y) * .06;
    c3.style.left = r2x + 'px';
    c3.style.top  = r2y + 'px';

    requestAnimationFrame(animCursor);
  })();

  /* Hover sobre elementos interactivos */
  var interactives = 'a, button, .sc, .nc, .ps, .chip, .pc, .tst-btn, .phi-pill';

  document.querySelectorAll(interactives).forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      c1.style.width        = '20px';
      c1.style.height       = '20px';
      c1.style.background   = 'var(--v)';
      c1.style.borderRadius = '4px';
      c2.style.transform    = 'translate(-50%,-50%) scale(1.8)';
      c4.style.transform    = 'translateY(-50%) scaleX(1)';
    });
    el.addEventListener('mouseleave', function () {
      c1.style.width        = '8px';
      c1.style.height       = '8px';
      c1.style.background   = 'var(--c)';
      c1.style.borderRadius = '50%';
      c2.style.transform    = 'translate(-50%,-50%) scale(1)';
      c4.style.transform    = 'translateY(-50%) scaleX(0)';
    });
  });
})();
