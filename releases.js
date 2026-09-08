// 릴리즈 노트 페이지 — releases.json을 읽어 렌더링만 담당한다.
// 콘텐츠(ko/en 문구) 자체는 이 스크립트가 만들지 않는다 — no-mad-max
// 저장소의 tool/generate_release_notes.sh로 뽑은 커밋 로그를 근거로
// 사람이(오케스트레이터가) 매 릴리즈마다 releases.json에 항목을 추가한다.
(function () {
  var list = document.getElementById("release-list");

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderRelease(release) {
    var item = el("li", "release-card");

    var meta = el("div", "release-meta");
    meta.appendChild(el("span", "release-version", "v" + release.version));
    meta.appendChild(el("span", "release-date", release.date));
    item.appendChild(meta);

    (release.ko || []).forEach(function (line) {
      item.appendChild(el("p", "release-text release-text-ko", line));
    });
    (release.en || []).forEach(function (line) {
      item.appendChild(el("p", "release-text release-text-en", line));
    });

    return item;
  }

  fetch("releases.json")
    .then(function (res) {
      if (!res.ok) throw new Error("releases.json fetch failed: " + res.status);
      return res.json();
    })
    .then(function (data) {
      var releases = data.releases || [];
      list.innerHTML = "";
      if (releases.length === 0) {
        list.appendChild(
          el("li", "release-loading", "아직 게시된 릴리즈가 없습니다. / No releases yet.")
        );
        return;
      }
      releases.forEach(function (release) {
        list.appendChild(renderRelease(release));
      });
    })
    .catch(function (err) {
      list.innerHTML = "";
      list.appendChild(
        el(
          "li",
          "release-loading",
          "릴리즈 노트를 불러오지 못했습니다. / Failed to load release notes."
        )
      );
      console.error(err);
    });
})();
