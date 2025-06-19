"use strict";
!(function (e) {
  "function" == typeof define && define.amd
    ? define(e)
    : "undefined" != typeof module && module.exports
    ? (module.exports = e())
    : (window.enterView = e.call(this));
})(function () {
  var e = function (e) {
    function n() {
      g =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (e) {
          return setTimeout(e, 1e3 / 60);
        };
    }
    function t() {
      if (h && "number" == typeof h) {
        var e = Math.min(Math.max(0, h), 1);
        return q - e * q;
      }
      return q;
    }
    function i() {
      var e = document.documentElement.clientHeight,
        n = window.innerHeight || 0;
      q = Math.max(e, n);
    }
    function o() {
      y = !1;
      var e = t();
      (A = A.filter(function (n) {
        var t = n.getBoundingClientRect(),
          i = t.top,
          o = i < e;
        if (o && !n.__enter_view) {
          if ((m(n), _)) return !1;
        } else !o && n.__enter_view && w && w(n);
        return (n.__enter_view = o), !0;
      })),
        A.length || window.removeEventListener("scroll", r, !0);
    }
    function r() {
      y || ((y = !0), g(o));
    }
    function u() {
      i(), o();
    }
    function f(e) {
      for (var n = e.length, t = [], i = 0; i < n; i += 1) t.push(e[i]);
      return t;
    }
    function c(e) {
      var n =
        arguments.length > 1 && void 0 !== arguments[1]
          ? arguments[1]
          : document;
      return "string" == typeof e
        ? f(n.querySelectorAll(e))
        : e instanceof NodeList
        ? f(e)
        : e instanceof Array
        ? e
        : void 0;
    }
    function d() {
      A = c(l);
    }
    function a() {
      window.addEventListener("resize", u, !0),
        window.addEventListener("scroll", r, !0),
        u();
    }
    function s() {
      var e = l && m;
      e || console.error("must set selector and enter options"),
        n(),
        d(),
        a(),
        o();
    }
    var l = e.selector,
      m = e.enter,
      w = e.exit,
      v = e.offset,
      h = void 0 === v ? 0 : v,
      p = e.once,
      _ = void 0 !== p && p,
      g = null,
      y = !1,
      A = [],
      q = 0;
    s();
  };
  return e;
});

// Modern background fader for section-based backgrounds

document.addEventListener("DOMContentLoaded", function () {
  // Background images for each section (order matches section-1, section-2, ...)
  const bgImages = [
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1525695230005-efd074980869?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    "https://miro.medium.com/max/3600/1*pKKv8eS4qcVf_yPHc6-eaQ.jpeg",
    "https://images.unsplash.com/photo-1584145513820-6fdbfa7e427a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
    "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=632&q=80",
    "https://images.unsplash.com/photo-1551985954-a317e5a04547?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
    "https://images.unsplash.com/photo-1565615833231-e8c91a38a012?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
  ];

  // Create the background fader container and images
  let fader = document.createElement('div');
  fader.className = 'background-fader';
  bgImages.forEach((src, idx) => {
    let img = document.createElement('img');
    img.className = 'background-fader-img';
    img.src = src;
    img.alt = '';
    if (idx === 0) img.classList.add('active');
    fader.appendChild(img);
  });
  document.body.prepend(fader);

  // Get all sections by ID order
  const sections = bgImages.map((_, i) => document.getElementById(`section-${i+1}`));
  const images = Array.from(document.querySelectorAll('.background-fader-img'));

  // Intersection Observer to detect which section is most in view
  let currentIdx = 0;
  const observer = new window.IntersectionObserver((entries) => {
    // Find the section with the largest intersection ratio
    let maxRatio = 0;
    let maxIdx = 0;
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        maxIdx = sections.indexOf(entry.target);
      }
    });
    if (maxRatio > 0 && maxIdx !== currentIdx) {
      images[currentIdx].classList.remove('active');
      images[maxIdx].classList.add('active');
      currentIdx = maxIdx;
    }
  }, {
    threshold: Array.from({length: 21}, (_, i) => i/20) // 0, 0.05, ..., 1
  });

  sections.forEach(section => {
    if (section) observer.observe(section);
  });
});