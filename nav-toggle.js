// 모바일 nav 드롭다운 열기/닫기 — 사이트 전체(index/releases/auto-launch)
// 공용. 외부 의존성 없음(사이트 전체 관례와 동일).
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  function setOpen(isOpen) {
    links.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  toggle.addEventListener("click", function () {
    setOpen(!links.classList.contains("is-open"));
  });

  // 메뉴 항목을 누르면(같은 페이지 앵커든 다른 페이지든) 드롭다운을 닫는다.
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      setOpen(false);
    });
  });
})();
