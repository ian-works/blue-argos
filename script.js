// BlueArgos landing page — 스크롤 등장 효과만 담당하는 최소 스크립트. 외부 의존성 없음.
(function () {
  var revealTargets = document.querySelectorAll(".card, .steps li, .ring-section-text, .ring-section-visual");
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });
})();
