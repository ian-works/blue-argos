// 자동 실행·종료 설정법 페이지 — Android/iOS 탭 전환만 담당하는 최소 스크립트.
// 외부 의존성 없음(사이트 전체 관례와 동일).
(function () {
  var tabs = document.querySelectorAll(".platform-tab");
  if (!tabs.length) return;

  function activate(platform) {
    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute("data-platform") === platform;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    document.querySelectorAll(".platform-panel").forEach(function (panel) {
      var isActive = panel.id === "panel-" + platform;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activate(tab.getAttribute("data-platform"));
    });
  });
})();
