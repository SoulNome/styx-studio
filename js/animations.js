/* ─────────────────────────────────────────────
   STYX STUDIO — Animaciones & Scroll
   ───────────────────────────────────────────── */

(function () {

  /* ── Loader ── */
  var pct = 0;
  var lf  = document.getElementById('lf');
  var lpc = document.getElementById('lpct');

  var ldrTimer = setInterval(function () {
    pct = Math.min(pct + Math.random() * 14, 100);
    lf.style.width = pct + '%';
    lpc.textContent = Math.floor(pct) + '%';
    if (pct >= 100) {
      clearInterval(ldrTimer);
      setTimeout(function () {
        document.getElementById('ldr').classList.add('out');
      }, 200);
    }
  }, 55);


  /* ── Título Hero: caracteres animados ── */
  'STYX'.split('').forEach(function (ch, i) {
    var sp = document.createElement('span');
    sp.className = 'char';
    sp.textContent = ch;
    sp.style.animationDelay = (0.7 + i * .12) + 's';
    document.getElementById('ht').appendChild(sp);
  });


  /* ── Runas flotantes ── */
  var runeLayer = document.getElementById('runeL');
  var runeChars = ['\u03A9','\u03A8','\u0394','\u039B','\u03A3','\u039E','\u03A0','\u0398','*','x','+','o'];

  function spawnRune() {
    var r = document.createElement('div');
    r.className = 'rune';
    r.textContent = runeChars[Math.floor(Math.random() * runeChars.length)];
    r.style.left = Math.random() * 100 + '%';
    r.style.bottom = '-5%';
    var dur = 9 + Math.random() * 14;
    r.style.animationDuration = dur + 's';
    r.style.fontSize = (0.5 + Math.random() * 1.4) + 'rem';
    runeLayer.appendChild(r);
    setTimeout(function () { r.remove(); }, dur * 1000);
  }
  setInterval(spawnRune, 1000);


  /* ── Scroll: parallax, nav, progreso, pasos ── */
  window.addEventListener('scroll', function () {
    var sy = window.scrollY;
    var maxSy = document.body.scrollHeight - window.innerHeight;

    /* Parallax orbs */
    document.getElementById('prl1').style.transform = 'translateY(' + (sy * .2) + 'px)';
    document.getElementById('prl2').style.transform = 'translateY(' + (sy * .12) + 'px)';

    /* Nav fija */
    document.getElementById('nav').classList.toggle('scrolled', sy > 60);

    /* Barra de progreso */
    document.getElementById('prog').style.width = ((sy / maxSy) * 100) + '%';

    /* Pasos del proceso */
    [1, 2, 3, 4].forEach(function (i) {
      var el = document.getElementById('ps' + i);
      if (el) {
        el.classList.toggle('act', el.getBoundingClientRect().top < window.innerHeight * .62);
      }
    });
  });


  /* ── Intersection Observer: reveal elementos ── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        var delay = parseFloat(e.target.style.transitionDelay) || 0;
        setTimeout(function () { e.target.classList.add('on'); }, delay * 1000 + 80);
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: .08 });

  document.querySelectorAll('.rv, .rv-l, .rv-r').forEach(function (el) {
    revealObs.observe(el);
  });


  /* ── Centauro SVG: dibujo al entrar en vista ── */
  var csvEl = document.getElementById('csv');
  if (csvEl) {
    var drawObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          setTimeout(function () { csvEl.classList.add('drawn'); }, 300);
          drawObs.unobserve(e.target);
        }
      });
    }, { threshold: .3 });
    drawObs.observe(csvEl);
  }


  /* ── Contadores animados + arcos SVG ── */
  var numData = [
    { id: 'nv1', target: 50,  suffix: '+', arcPct: .82 },
    { id: 'nv2', target: 98,  suffix: '%', arcPct: .98 },
    { id: 'nv3', target: 12,  suffix: '+', arcPct: .65 },
    { id: 'nv4', target: 3,   suffix: 'x', arcPct: .75 },
  ];
  var arcs = document.querySelectorAll('.arc');
  var circumference = 2 * Math.PI * 43;

  var numObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        numData.forEach(function (d, i) {
          var el  = document.getElementById(d.id);
          var arc = arcs[i];
          var cur = 0;
          var step = d.target / 60;
          var timer = setInterval(function () {
            cur = Math.min(cur + step, d.target);
            el.textContent = Math.floor(cur) + d.suffix;
            arc.style.strokeDashoffset = circumference * (1 - (cur / d.target) * d.arcPct);
            if (cur >= d.target) clearInterval(timer);
          }, 18);
        });
        numObs.unobserve(e.target);
      }
    });
  }, { threshold: .4 });

  var numbersEl = document.getElementById('numbers');
  if (numbersEl) numObs.observe(numbersEl);


  /* ── Línea vertical proceso ── */
  var processEl = document.getElementById('process');
  var pvlEl     = document.getElementById('pvl');
  if (processEl && pvlEl) {
    var procObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { pvlEl.classList.add('on'); procObs.unobserve(e.target); }
      });
    }, { threshold: .2 });
    procObs.observe(processEl);
  }

})();
