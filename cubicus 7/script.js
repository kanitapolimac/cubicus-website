// CUBICUS d.o.o. - shared scripts
document.addEventListener('DOMContentLoaded', function () {
  // Nav scroll shadow
  var navWrap = document.querySelector('.nav-wrap');
  if (navWrap) {
    var onScroll = function () {
      navWrap.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Duplicate marquee content for seamless loop
  document.querySelectorAll('.marquee-track').forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Animated counters
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / 1400, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }
});
