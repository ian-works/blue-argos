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

// ---------------------------------------------------------------------
// 다국어(ko/en) 전환.
//
// data-i18n="key"인 요소는 innerHTML을, data-i18n-attr="속성:key"인 요소는
// 그 속성값을 사전(I18N)의 문구로 바꿔 끼운다. 콘텐츠는 전부 이 파일이
// 직접 쓴 신뢰된 정적 문구라 innerHTML 대입도 안전하다(외부/사용자 입력
// 없음). 고른 언어는 localStorage에 저장해 재방문 시 그대로 유지된다.
(function () {
  var STORAGE_KEY = "blueargos-lang";

  var I18N = {
    ko: {
      "meta.title": "BlueArgos — 깨끗한 과속카메라 알림",
      "meta.description": "개인정보 입력 없이, 광고 없이, 데이터 통신과 배터리 사용을 최소화한 깨끗한 과속 단속 카메라 알림 앱 BlueArgos.",
      "meta.ogDescription": "개인정보 없이, 광고 없이, 배터리도 아끼며 조용히 지켜보는 과속카메라 알림 앱.",
      "nav.ariaLabel": "주요 섹션",
      "nav.principles": "원칙",
      "nav.how": "동작 방식",
      "nav.ring": "블루 링",
      "nav.releases": "릴리즈",
      "hero.eyebrow": "경로 설정 없음 · 개인정보 필요 없음 · 통신·배터리 사용 최소화 · 광고 없음",
      "hero.h1": "깨끗하고 쾌적한<br class=\"br-mobile\" /> 과속 카메라 알림",
      "hero.lead": "BlueArgos는 이름도 화면도 배터리도 군더더기가 없습니다. 아무것도 입력하지 않아도 되고, 광고가 끼어들지 않으며, 데이터 통신과 배터리 사용을 최소한으로 줄인 <strong>깨끗한 과속 단속 카메라 알림 앱</strong>입니다.",
      "hero.badge2": "현재 개발 중",
      "promise.h2": "BlueArgos는 다릅니다.",
      "card1.h3": "경로 설정 없음",
      "card1.p": "어디로 가는지 몰라도 됩니다. 목적지나 경로를 입력하지 않아도, 지금 달리는 길 위의 카메라를 그때그때 알려줍니다.",
      "card2.h3": "개인정보 입력 없음",
      "card2.p": "회원가입도, 차량 정보도 필요 없습니다. App을 설치하고 바로 사용하면 됩니다. Android의 루틴, iOS의 자동화 기능을 사용하면 차량 탑승 시 자동 실행, 하차 시 자동 종료됩니다.",
      "card3.h3": "데이터 사용 없음",
      "card3.p": "2주 혹은 한 달에 한 번 3MB 정도 데이터를 다운로드하여 계속 사용합니다. 차량 운행 시 데이터 통신을 하지 않습니다.",
      "card4.h3": "배터리 최소화",
      "card4.p": "저속 구간에서는 위치 확인 주기를 늘리고, 실제로 필요한 순간에만 정밀 추적으로 전환합니다. 화면 배경도 검은색이라 디스플레이 전력 소모까지 줄입니다.",
      "card5.h3": "광고 없음",
      "card5.p": "보기 민망한 광고, 게임 광고 같은 건 없습니다. 한 번 저렴한 가격으로 구매하면 평생 자동 업데이트됩니다.",
      "how.h2": "동작 방식",
      "how.p": "과속카메라가 가까워질 때만 목소리를 냅니다. 나머지는 조용합니다.",
      "step1.h3": "사전 경고",
      "step1.p": "흔한 내비게이션은 카메라까지 남은 \"거리\"로 경고합니다 — 그래서 저속일 땐 쓸데없이 일찍, 자칫하면 늦게 울리기도 합니다. BlueArgos는 지금 속도로 도달하기까지 남은 \"시간\"(기본 20초)을 기준으로 삼아, 얼마나 빠르게 달리든 항상 같은 여유를 두고 알립니다.",
      "step1.caption": "20초 뒤 60km 단속 카메라가 있습니다.",
      "step2.h3": "과속 경고",
      "step2.p": "속도를 줄이지 않으면 규정속도 이하가 될 때까지 알림이 이어집니다. 줄이면 곧바로 멈춥니다.",
      "step2.caption": "속도를 60km로 줄이세요",
      "step3.h3": "과속 통과 안내",
      "step3.p": "과속 상태로 카메라를 지났다면 그 사실만 짧게 안내합니다. 규정을 지켰다면 아무 말도 하지 않습니다.",
      "step3.caption": "20km/h 과속 했습니다.",
      "step4.h3": "자동 보정 업데이트",
      "step4.p": "잘못됐거나 오래된 카메라 정보를 발견하면, 정기 갱신 주기(평균 2주, 최대 한 달) 안에 자동으로 바로잡혀 다음 업데이트에 반영됩니다. 사용자가 따로 신고하거나 손볼 일은 없습니다.",
      "step4.updated": "업데이트됨",
      "ring.h2": "블루 링",
      "ring.p1": "평소 화면 중앙에는 은은하게 숨 쉬는 파란 원, <strong>블루 링</strong>이 켜져 있습니다. 전방에 알릴 카메라가 없다는 뜻이자, 앱이 조용히 정상 동작 중이라는 신호입니다.",
      "ring.p2": "말이 많은 앱이 되고 싶지 않았습니다. 아무 일도 없을 땐 화면도, 소리도, 배터리도 최대한 아낍니다 — 정말 알려야 할 순간에만 목소리를 냅니다.",
      "footer.note": "과속카메라 위치 데이터 출처: 경찰청 · 공공데이터포털(data.go.kr), 공공누리 제1유형(출처표시).",
      "footer.copy": "© BlueArgos. 개인정보를 수집하지 않는 앱입니다."
    },
    en: {
      "meta.title": "BlueArgos — Clean Speed Camera Alerts",
      "meta.description": "BlueArgos: a clean speed camera alert app with no personal data entry, no ads, and minimal data & battery use.",
      "meta.ogDescription": "A speed camera alert app that watches quietly — no personal data, no ads, easy on the battery.",
      "nav.ariaLabel": "Main sections",
      "nav.principles": "Principles",
      "nav.how": "How it works",
      "nav.ring": "Blue Ring",
      "nav.releases": "Releases",
      "hero.eyebrow": "No route needed · No personal data required · Minimal data & battery use · No ads",
      "hero.h1": "Clean, unobtrusive<br class=\"br-mobile\" /> speed camera alerts",
      "hero.lead": "BlueArgos keeps its name, its screen, and its battery use free of clutter. Nothing to type in, no ads to interrupt you — just a <strong>clean speed camera alert app</strong> that keeps data and battery use to a minimum.",
      "hero.badge2": "In development",
      "promise.h2": "BlueArgos is different.",
      "card1.h3": "No route needed",
      "card1.p": "It doesn't need to know where you're going. Without a destination or route, it still tells you about cameras on the road you're driving, as you go.",
      "card2.h3": "No personal data required",
      "card2.p": "No sign-up, no vehicle info needed. Install the app and start using it right away. Pair it with Android Routines or iOS Automations to launch automatically when you get in the car and quit when you get out.",
      "card3.h3": "No data use",
      "card3.p": "It downloads about 3MB of data every two weeks to a month and keeps using that — no data communication at all while you're driving.",
      "card4.h3": "Minimal battery use",
      "card4.p": "At low speeds it checks your location less often, switching to precise tracking only when it's actually needed. The screen background is black too, which cuts display power use as well.",
      "card5.h3": "No ads",
      "card5.p": "No embarrassing ads, no game-style ads. Pay once at a low price and get automatic updates for life.",
      "how.h2": "How it works",
      "how.p": "It only speaks up when a speed camera is close. The rest of the time, it stays quiet.",
      "step1.h3": "Early warning",
      "step1.p": "Most navigation apps warn you based on the remaining \"distance\" to a camera — which means alerts fire needlessly early at low speed, and sometimes too late at high speed. BlueArgos instead uses the remaining \"time\" to reach it at your current speed (20 seconds by default), so it always gives you the same margin no matter how fast you're going.",
      "step1.caption": "Speed camera (60 km/h) ahead in 20 seconds.",
      "step2.h3": "Speed warning",
      "step2.p": "If you don't slow down, the alert keeps repeating until you're under the limit. Slow down, and it stops immediately.",
      "step2.caption": "Slow down to 60 km/h.",
      "step3.h3": "Overspeed pass notice",
      "step3.p": "If you passed the camera over the limit, it tells you briefly — that's all. If you stayed within it, it says nothing.",
      "step3.caption": "You were 20 km/h over the limit.",
      "step4.h3": "Automatic corrections",
      "step4.p": "When incorrect or outdated camera data is found, it's automatically corrected within the regular update cycle (about every 2 weeks, at most a month) and included in the next update. You never have to report or fix anything yourself.",
      "step4.updated": "Updated",
      "ring.h2": "Blue Ring",
      "ring.p1": "At the center of the screen, a softly breathing blue circle — the <strong>Blue Ring</strong> — stays lit. It means there's no camera ahead to warn you about, and that the app is quietly running as normal.",
      "ring.p2": "We didn't want to build a chatty app. When nothing's happening, it goes easy on the screen, the sound, and the battery — and speaks up only when it truly matters.",
      "footer.note": "Speed camera location data source: Korea National Police Agency · Public Data Portal (data.go.kr), KOGL Type 1 (Attribution).",
      "footer.copy": "© BlueArgos. An app that collects no personal data."
    }
  };

  function currentLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ko" || saved === "en") return saved;
    } catch (e) {
      // localStorage 접근 불가(프라이빗 모드 등) — 기본값(ko)로 폴백.
    }
    return "ko";
  }

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.ko;
    document.documentElement.lang = lang;

    var i18nEls = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < i18nEls.length; i++) {
      var key = i18nEls[i].getAttribute("data-i18n");
      if (dict[key] != null) i18nEls[i].innerHTML = dict[key];
    }

    var attrEls = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < attrEls.length; j++) {
      var spec = attrEls[j].getAttribute("data-i18n-attr").split(":");
      if (dict[spec[1]] != null) attrEls[j].setAttribute(spec[0], dict[spec[1]]);
    }

    var toggle = document.querySelector("[data-lang-toggle]");
    if (toggle) {
      toggle.textContent = lang === "ko" ? "EN" : "KO";
      toggle.setAttribute("aria-label", lang === "ko" ? "Switch to English" : "한국어로 전환");
    }

    // 히어로 폰 데모(아래 IIFE)가 현재 재생 중인 단계의 캡션을 즉시
    // 다시 그리도록 알린다 — 다음 단계 경계까지 기다리지 않는다.
    if (typeof CustomEvent === "function") {
      window.dispatchEvent(new CustomEvent("blueargos:langchange", { detail: { lang: lang } }));
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // 저장 실패해도 이번 세션 표시는 그대로 진행한다.
    }
    applyLang(lang);
  }

  var toggleBtn = document.querySelector("[data-lang-toggle]");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      setLang(currentLang() === "ko" ? "en" : "ko");
    });
  }

  applyLang(currentLang());
})();

// ---------------------------------------------------------------------
// 히어로 폰 — 블루 링 데모 애니메이션.
//
// 실제 앱의 블루 링 상태 머신(no-mad-max/lib/features/driving/view/
// blue_ring_animation.dart)과 색상/문구(driving_visual_tuning.dart,
// speed_sign.dart, warning_view.dart)를 참고해 6단계 루프로 재현한다.
// 실제 타이밍(예: expandDuration 8000ms, awaken 2500ms 등)은 이 앱 화면
// 전체가 아니라 짧은 홍보용 미리보기이므로 그대로 쓰지 않고, "가속할수록
// 링이 더 빨리 퍼진다"·"전방 마커가 뜨면 블루 링이 꺼진다" 같은 동작의
// 모양만 옮겨 디자인 피드백이 요청한 초 단위로 눌러 담았다.
(function () {
  var stage = document.querySelector("[data-ring-stage]");
  if (!stage) return;

  var ring = stage.querySelector("[data-ring]");
  var glow = stage.querySelector("[data-ring-glow]");
  var speedEl = stage.querySelector("[data-speed-value]");
  var signEl = stage.querySelector("[data-camera-sign]");
  var signTextEl = signEl && signEl.querySelector("[data-camera-sign-text]");
  var captionEl = document.querySelector("[data-phone-caption]");
  var flashEl = document.querySelector("[data-flash]");
  if (!ring || !glow || !speedEl || !signEl || !signTextEl || !captionEl || !flashEl) {
    return;
  }

  // 실제 색상 — driving_visual_tuning.dart 값을 그대로 옮김.
  var RING_BLUE = "#5ea8ff";
  var RING_RED = "#e8383f"; // blueRingColorMaxSpeed(속도 ≥110km/h)
  var SPEED_LOW = "#9aa0a8"; // speedReadoutColorLow(<30km/h)
  var SPEED_MID = "#f5f6f8"; // speedReadoutColorMid(<100km/h)
  var SPEED_HIGH = "#e8383f"; // speedReadoutColorHigh(≥100km/h)
  var FLASH_LIGHT = "#ffffff"; // warningBgLight
  var FLASH_DARK = "#000000"; // warningBgDark
  var VERDICT_BG = "#8e0f16"; // overspeedVerdictBg
  var FLASH_PERIOD_MS = 667; // flashPeriod(1.5Hz 사이클)
  var LIMIT_KMH = 100;
  var EXCESS_KMH = 20;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    speedEl.textContent = "5";
    speedEl.style.color = SPEED_LOW;
    captionEl.textContent =
      document.documentElement.lang === "en" ? "Low-speed driving" : "저속 주행";
    return;
  }

  // 단계별 지속시간(ms) — 원래 디자인 피드백이 지정한 값(1. 펄스 2회,
  // 2. 6초 가속, 3. 4초 카메라 접근, 4. 4초 경고 점멸, 5. 4초 과속 결과,
  // 6. 3초 감속)에서, 2번부터 마지막까지는 사용자 요청으로 각 +3초씩
  // 늘렸다(1번 펄스는 그대로).
  var ORDER = ["pulse", "accel", "approach", "warning", "overspeed", "decel"];
  var DURATIONS = {
    pulse: 1600 * 2,
    accel: 6000 + 3000,
    approach: 4000 + 3000,
    warning: 4000 + 3000,
    overspeed: 4000 + 3000,
    decel: 3000 + 3000,
  };

  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeInOut(t) {
    t = clamp01(t);
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  function easeOutCubic(t) {
    t = clamp01(t);
    var inv = 1 - t;
    return 1 - inv * inv * inv;
  }
  function speedColor(kmh) {
    if (kmh < 30) return SPEED_LOW;
    if (kmh < 100) return SPEED_MID;
    return SPEED_HIGH;
  }

  function clampRange(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  var RING_BLUE_RGB = hexToRgb(RING_BLUE);
  var RING_RED_RGB = hexToRgb(RING_RED);

  // 링의 "호 길이"는 서로 다른 두 각도 마스크의 곱으로 정해진다(실제 앱
  // blue_ring_shape.dart의 `paintBlueRingShape`와 같은 방식) — 하나는 6시
  // 방향에 고정된 "C자" 개구부(ringOpacityForClockDeg, blue_ring_animation
  // .dart), 다른 하나는 진행 방향(12시) 기준 속도에 따라 좁아지는 "전방
  // 회랑"(corridor_angle.dart). 후자가 이번 요청의 핵심 — 가속할수록 12시
  // 쪽 밝은 호 자체가 좁아진다.

  // 6시(180°) 기준 고정 개구부 — ringGapHalfWidthDeg(7.5°)/ringFadeSpanDeg
  // (82.5°) 그대로, ease-out(1-t³) 곡선까지 원본과 동일하게 옮겼다.
  function baseShapeMask(deg) {
    var normalized = ((deg % 360) + 360) % 360;
    var wrapped = Math.abs(normalized - 180);
    if (wrapped <= 7.5) return 0;
    var fullyOpaqueAt = 90; // 7.5 + 82.5
    if (wrapped >= fullyOpaqueAt) return 1;
    var localT = (wrapped - 7.5) / 82.5;
    var tt = 1 - localT;
    return 1 - tt * tt * tt;
  }

  // 12시(0°) 기준 "전방 회랑" — innerHalf(본연색 반각)~outerHalf(완전
  // 투명 경계) 사이를 같은 ease-out(1-t³)으로 페이드한다
  // (blue_ring_shape.dart의 arcMaskForClockDeg). innerHalf가 null이면
  // idle(정지 펄스/감속 끝)이라 회랑 제한이 없다 — 전 구간 1.
  function corridorMask(deg, innerHalf, outerHalf) {
    if (innerHalf == null) return 1;
    var normalized = ((deg % 360) + 360) % 360;
    var d = normalized > 180 ? 360 - normalized : normalized;
    if (d <= innerHalf) return 1;
    if (d >= outerHalf) return 0;
    var tt = (d - innerHalf) / (outerHalf - innerHalf);
    return 1 - tt * tt * tt;
  }

  // corridor_angle.dart의 blueRingThetaBaseDeg/ringOuterHalfAngleDeg
  // (weight=1.0 기본값) 그대로 — 110km/h에서 최솟값(14°/30°)에 도달한다.
  function blueRingInnerHalfDeg(kmh) {
    return clampRange(70 - 0.56 * (kmh - 10), 14, 70);
  }
  function blueRingOuterHalfDeg(kmh) {
    return clampRange(110 - 0.8 * (kmh - 10), 30, 110);
  }

  var RING_GRADIENT_STEPS = 48;
  function ringGradient(rgb, innerHalf, outerHalf) {
    var stops = [];
    for (var i = 0; i <= RING_GRADIENT_STEPS; i++) {
      var deg = (i * 360) / RING_GRADIENT_STEPS;
      var alpha = baseShapeMask(deg) * corridorMask(deg, innerHalf, outerHalf);
      stops.push(
        "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + alpha.toFixed(3) + ") " +
          ((deg / 360) * 100).toFixed(3) + "%"
      );
    }
    return "conic-gradient(from 0deg, " + stops.join(", ") + ")";
  }

  function lerpRgb(a, b, tt) {
    return { r: lerp(a.r, b.r, tt), g: lerp(a.g, b.g, tt), b: lerp(a.b, b.b, tt) };
  }

  function paintRing(rgb, scale, opacity, innerHalf, outerHalf) {
    var gradient = ringGradient(rgb, innerHalf, outerHalf);
    var t = "scale(" + scale.toFixed(4) + ")";
    ring.style.background = gradient;
    ring.style.transform = t;
    ring.style.opacity = opacity.toFixed(3);
    glow.style.background = gradient;
    glow.style.transform = t;
    glow.style.opacity = (opacity * 0.65).toFixed(3);
  }

  // 단계가 막 바뀐 직후 이 시간(ms) 동안, 직전 단계의 마지막 실제 프레임
  // (lastRingFrame)에서 이번 단계가 원하는 목표값으로 크로스페이드한다 —
  // 실제 앱의 modeBlendDuration/frameAtChange(펄스↔확산 전환 시 "껌벅임
  // 없이 smooth하게")와 같은 발상. 이게 없으면 예를 들어 펄스(scale~1,
  // opacity~0.86)에서 가속 웨이브 첫 프레임(scale 0.9, opacity 0)으로
  // 하드컷되어 링이 순간적으로 꺼졌다 다른 크기로 다시 나타나는 것처럼
  // 보였다(사용자가 "중심이 이동하는 것 같다"고 신고한 원인).
  var RING_BLEND_MS = 400;
  var ringBlendFrom = null; // {scale, opacity, rgb, inner, outer}
  var ringBlendStart = 0;
  var lastRingFrame = null; // 마지막으로 실제 화면에 그린(블렌드 반영 후) 프레임

  // innerHalf/outerHalf를 생략(undefined/null)하면 회랑 제한 없이 원래의
  // "C자" 전체 폭 그대로 그린다(정지 펄스·감속 끝 무렵) — 내부적으로는
  // 180(반원)을 "제한 없음"의 수치 대역값으로 써서 블렌드 보간이 항상
  // 숫자 대 숫자로 이뤄지게 한다.
  function setRing(now, scale, opacity, color, innerHalf, outerHalf) {
    var rgb = color === RING_RED ? RING_RED_RGB : RING_BLUE_RGB;
    var inner = innerHalf == null ? 180 : innerHalf;
    var outer = outerHalf == null ? 180 : outerHalf;

    var paintScale = scale, paintOpacity = opacity, paintRgb = rgb,
        paintInner = inner, paintOuter = outer;
    if (ringBlendFrom) {
      var blendT = clamp01((now - ringBlendStart) / RING_BLEND_MS);
      if (blendT < 1) {
        var eased = easeInOut(blendT);
        paintScale = lerp(ringBlendFrom.scale, scale, eased);
        paintOpacity = lerp(ringBlendFrom.opacity, opacity, eased);
        paintRgb = lerpRgb(ringBlendFrom.rgb, rgb, eased);
        paintInner = lerp(ringBlendFrom.inner, inner, eased);
        paintOuter = lerp(ringBlendFrom.outer, outer, eased);
      } else {
        ringBlendFrom = null; // 블렌드 종료 — 이후엔 목표값 그대로
      }
    }

    paintRing(paintRgb, paintScale, paintOpacity, paintInner, paintOuter);
    lastRingFrame = {
      scale: paintScale, opacity: paintOpacity, rgb: paintRgb,
      inner: paintInner, outer: paintOuter,
    };
  }

  function setSign(opacity, scale, rise, overspeed) {
    signEl.style.opacity = opacity.toFixed(3);
    // translateY를 scale보다 먼저 적용해야(transform 함수는 뒤에서부터
    // 합성된다) 표지가 작을 때도 위로 치우친 이동량이 scale로 눌리지 않는다.
    signEl.style.transform =
      "translateY(" + rise.toFixed(1) + "px) scale(" + scale.toFixed(4) + ")";
    signEl.classList.toggle("is-overspeed", !!overspeed);
    signTextEl.textContent = overspeed ? "+" + EXCESS_KMH : String(LIMIT_KMH);
  }

  function setFlash(color, opacity) {
    flashEl.style.backgroundColor = color;
    flashEl.style.opacity = opacity.toFixed(3);
  }

  function setSpeed(kmh) {
    speedEl.textContent = String(Math.round(kmh));
    speedEl.style.color = speedColor(kmh);
  }

  // "고속 확산" 웨이브의 현재 위상(0~1) — expandDurationForSpeed와 같은
  // 발상으로 속도가 빠를수록 주기를 짧게 잡되, 매 프레임 dt만큼 누적해
  // (모듈로 재계산이 아니라) 속도가 바뀌어도 위상이 순간이동하지 않게 한다.
  var expandPhase = 0;

  function expandPeriodMsForSpeed(kmh) {
    // 실제 expandDurationForSpeed(8000ms@3km/h → 900ms@130km/h, 중간을
    // 완만하게 누르는 지수 1.3)와 같은 모양을 6초짜리 데모 분량에 맞춰
    // 1400ms@5km/h → 380ms@120km/h로 축약했다.
    var rateT = Math.pow(clamp01((kmh - 5) / (120 - 5)), 1.3);
    return lerp(1400, 380, rateT);
  }

  function expandWaveFrame(accum) {
    var FADE_IN = 0.06;
    var SMALL_SCALE = 0.9;
    var MAX_SCALE = 1.55;
    var PEAK_OPACITY = 0.85;
    if (accum < FADE_IN) {
      return { scale: SMALL_SCALE, opacity: PEAK_OPACITY * easeInOut(accum / FADE_IN) };
    }
    var spreadT = (accum - FADE_IN) / (1 - FADE_IN);
    return {
      scale: lerp(SMALL_SCALE, MAX_SCALE, easeOutCubic(spreadT)),
      opacity: PEAK_OPACITY * (1 - spreadT),
    };
  }

  var phaseIndex = 0;
  var phaseStart = 0;
  var lastNow = 0;

  // 단계 설명 캡션(디자인 피드백이 지정한 문구 그대로, ko/en 두 세트) —
  // 감속 단계는 빈 문자열로 둬 .is-blank로 시각적으로만 지운다(applyCaption
  // 참고). 언어는 위 i18n IIFE가 document.documentElement.lang에 반영해둔
  // 값을 그대로 읽는다 — 상태를 따로 들지 않는다.
  var PHASE_LABELS = {
    ko: {
      pulse: "저속 주행",
      accel: "110km/h까지 가속",
      approach: "시간 기반 전방 과속 카메라 알림",
      warning: "과속 경고",
      overspeed: "과속 통과 알림",
      decel: "",
    },
    en: {
      pulse: "Low-speed driving",
      accel: "Accelerating to 110 km/h",
      approach: "Time-based camera alert ahead",
      warning: "Speed warning",
      overspeed: "Overspeed pass notice",
      decel: "",
    },
  };

  function currentPhaseName() {
    return ORDER[phaseIndex];
  }

  function applyCaption(name) {
    var lang = document.documentElement.lang === "en" ? "en" : "ko";
    var label = PHASE_LABELS[lang][name];
    // 진짜 빈 문자열을 넣으면 <p>가 줄 상자를 잃어 블루 링 위치가
    // 위아래로 움찔거린다(감속 단계 진입/탈출 시 신고된 버그) — 항상
    // non-breaking space(U+00A0)로 줄 높이를 유지하고 .is-blank로만
    // 지운다.
    captionEl.textContent = label === "" ? "\u00A0" : label;
    captionEl.classList.toggle("is-blank", label === "");
  }

  // 언어가 바뀌면(상단 언어 토글) 다음 단계 경계까지 기다리지 않고 지금
  // 재생 중인 단계의 캡션을 바로 새 언어로 다시 그린다.
  window.addEventListener("blueargos:langchange", function () {
    applyCaption(currentPhaseName());
  });

  function enterPhase(name, now) {
    applyCaption(name);
    // 방금까지 실제로 그려지고 있던 링 프레임에서 다음 단계의 자연 곡선으로
    // 크로스페이드를 시작한다(setRing 주석 참고) — 최초 진입(아직 한 번도
    // 안 그려짐)에는 lastRingFrame이 없어 블렌드 없이 바로 목표값을 쓴다.
    if (lastRingFrame) {
      ringBlendFrom = lastRingFrame;
      ringBlendStart = now;
    }
    phaseStart = now;
  }

  function tick(now) {
    if (!lastNow) lastNow = now;
    var dt = now - lastNow;
    lastNow = now;

    var name = ORDER[phaseIndex];
    var elapsed = now - phaseStart;
    var duration = DURATIONS[name];
    var t = clamp01(elapsed / duration);

    if (name === "pulse") {
      // 1. 시속 5km 정지 펄스 — 기존 breathe보다 변동 폭을 훨씬 크게(±24%
      // 크기, 불투명도도 0.72~1) 잡아 "더 잘 보이게" 해달라는 요청을 반영.
      var wave = Math.sin(2 * Math.PI * t * 2);
      setRing(now, 1 + 0.24 * wave, 0.72 + 0.28 * ((wave + 1) / 2), RING_BLUE, null, null);
      setSign(0, 0.2, -24, false);
      setFlash(FLASH_DARK, 0);
      setSpeed(5);
      expandPhase = 0;
    } else if (name === "accel") {
      // 2. 5 → 110km/h 가속(6초) — 링은 "고속 확산" 웨이브로 전환되고,
      // 속도가 오를수록 웨이브 주기가 짧아진다(더 자주 퍼진다). 110km/h에
      // 도달하면 실제 앱처럼 링이 레드로 바뀐다. 동시에 실제 앱의 전방
      // 회랑(corridor_angle.dart)처럼 밝은 호 자체도 속도가 빠를수록
      // 좁아진다(70°/110° 반각 → 110km/h에서 최소 14°/30°).
      var speed = lerp(5, 110, easeInOut(t));
      expandPhase = (expandPhase + dt / expandPeriodMsForSpeed(speed)) % 1;
      var frame = expandWaveFrame(expandPhase);
      setRing(
        now, frame.scale, frame.opacity, speed >= 110 ? RING_RED : RING_BLUE,
        blueRingInnerHalfDeg(speed), blueRingOuterHalfDeg(speed)
      );
      setSign(0, 0.2, -24, false);
      setSpeed(speed);
    } else if (name === "approach") {
      // 3. 전방 100km 카메라 접근 — 마커가 나타나면 블루 링은 꺼진다(원본
      // 주석: "전방 마커가 있으면 블루 링을 끔"). 표지가 전방(위)에서
      // 다가와 커지는 것처럼 작게+위로 치우친 채로 시작해 제자리·실물
      // 크기로 자란다.
      var speed = lerp(110, 116, t);
      expandPhase = (expandPhase + dt / expandPeriodMsForSpeed(speed)) % 1;
      var frame = expandWaveFrame(expandPhase);
      var ringOut = 1 - easeInOut(clamp01(t / 0.3));
      setRing(
        now, frame.scale, frame.opacity * ringOut, RING_RED,
        blueRingInnerHalfDeg(speed), blueRingOuterHalfDeg(speed)
      );
      var grow = easeOutCubic(t);
      setSign(easeOutCubic(clamp01(t / 0.35)), lerp(0.25, 1, grow), lerp(-26, 0, grow), false);
      setFlash(FLASH_DARK, 0);
      setSpeed(speed);
    } else if (name === "warning") {
      // 4. 100km 카메라 경고 — 표지는 자리 잡고, 배경만 흰/검으로 점멸한다
      // (실제 flashPeriod 667ms = 1.5Hz 그대로). 캡션은 배경 점멸과 무관하게
      // 항상 고정된 검정 알약+흰 글자라(.phone-caption CSS) 여기선 손대지
      // 않는다.
      setSign(1, 1, 0, false);
      var isLight = (elapsed % FLASH_PERIOD_MS) / FLASH_PERIOD_MS < 0.5;
      setFlash(isLight ? FLASH_LIGHT : FLASH_DARK, isLight ? 0.92 : 0.85);
      setSpeed(lerp(116, 120, t));
    } else if (name === "overspeed") {
      // 5. 100km 제한 구간을 120km/h로 통과 — 20km/h 초과. 표지가
      // OverspeedSign(빨간 바탕·흰 테두리·"+20")으로 반전되고, 배경은
      // 검정↔짙은 빨강으로 점멸한다.
      setSign(1, 1, 0, true);
      var isDark = (elapsed % FLASH_PERIOD_MS) / FLASH_PERIOD_MS < 0.5;
      setFlash(isDark ? FLASH_DARK : VERDICT_BG, 0.9);
      setSpeed(120);
    } else if (name === "decel") {
      // 6. 결과 화면이 사라지고 120 → 5km/h로 감속, 블루 링이 다시 켜진다.
      // 속도가 떨어질수록 회랑도 다시 넓어져(14°/30° → 70°/110°) 링이
      // 정지 상태의 원래 폭으로 돌아온다.
      var speed = lerp(120, 5, easeOutCubic(t));
      var dissolve = easeInOut(clamp01(t / 0.25));
      setSign(1 - dissolve, lerp(1, 0.7, dissolve), 0, true);
      setFlash(FLASH_DARK, (1 - dissolve) * 0.4);
      var ringIn = easeInOut(clamp01((t - 0.15) / 0.4));
      setRing(now, lerp(0.9, 1, ringIn), ringIn, RING_BLUE, blueRingInnerHalfDeg(speed), blueRingOuterHalfDeg(speed));
      setSpeed(speed);
    }

    if (t >= 1) {
      phaseIndex = (phaseIndex + 1) % ORDER.length;
      enterPhase(ORDER[phaseIndex], now);
    }

    requestAnimationFrame(tick);
  }

  enterPhase(ORDER[0], performance.now());
  requestAnimationFrame(tick);
})();
