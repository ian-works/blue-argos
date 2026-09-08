# git-page-blue-argos

BlueArgos(이 저장소 코드명 "no-mad-max"의 정식 앱 이름) 소개 웹사이트 소스입니다. 프레임워크 없이 순수 HTML/CSS/JS로만 작성했고, 외부 런타임 의존성은 Google Fonts(Pretendard) 하나뿐입니다.

## 로컬 미리보기

빌드 과정이 없습니다. 아무 정적 파일 서버로 열면 됩니다, 예:

```bash
cd git-page-blue-argos
python3 -m http.server 8080
# http://localhost:8080 접속
```

## 배포

정적 파일 그대로이므로 GitHub Pages(`Settings → Pages → Deploy from a branch`, 이 폴더를 루트로 지정하거나 별도 브랜치로 이동), Netlify, Cloudflare Pages 등 어디에든 올릴 수 있습니다.

## 브랜드 자산 출처

- 색상(`styles.css`의 `--ring` 등)은 `lib/features/driving/view/driving_visual_tuning.dart`의 실제 앱 색상값(`blueRingColor = 0xFF5EA8FF` 등)과 동일하게 맞췄습니다.
- 블루 링 C자 지오메트리(6시 방향 165°~195° 개구부)는 `docs/UI_SPEC.md` §2.1 확정 사양을 CSS `conic-gradient`로 근사한 것입니다 — 앱 실제 렌더러(`blue_ring_shape.dart`)와 픽셀 단위로 동일하지는 않습니다.
- "BlueArgos" 작명 근거와 차별점(개인정보 없음/광고 없음/통신·배터리 최소화)은 프로젝트 메모리 `app-official-name-bluewargos`를 따랐습니다.
- 앱 아이콘은 `assets/icon/app_icon.png`를 그대로 복사해 `assets/app_icon.png`로 넣었습니다.

## 현재 상태

앱이 아직 스토어에 정식 출시되지 않은 상태를 반영해 "현재 개발 중" 배지만 두고, 스토어 링크나 다운로드 버튼은 넣지 않았습니다. 출시 시점에 `index.html`의 `.hero-badges`와 `.footer-inner`에 실제 스토어 링크를 추가하면 됩니다.

## 릴리즈 노트 페이지(`releases.html`)

no-mad-max 앱의 "앱 정보" 패널이 가리키는 링크입니다(`lib/features/settings/state/app_release_notes.dart`의 `kReleaseNotesUrl`). 앱 내부에 변경사항을 ko/en 두 벌로 유지하는 대신, 이 페이지 하나로 옮겼습니다(2026-09-09 결정).

- **데이터**: `releases.json`(배열, 최신이 맨 앞) — 항목마다 `tag`/`version`/`date`/`ko`(문자열 배열)/`en`(문자열 배열). `releases.js`는 이 파일을 fetch해서 그리기만 합니다.
- **언어**: 토글 없이 한국어/영어를 **항상 함께**(병기) 보여줍니다.
- **콘텐츠 출처(중요)**: 매 릴리즈마다 no-mad-max 저장소의 `tool/generate_release_notes.sh <이전_태그> <새_태그>`로 그 사이 커밋 로그를 뽑아 근거로 삼되, `releases.json`에 적는 문장은 **반드시 사용자가 화면/음성으로 체감할 수 있는 변화만, 일반적인 표현으로** 씁니다. **앱 내부 로직이나 서버(Cloudflare Worker/D1) 동작을 유추할 수 있는 내용(임계값, 판정 알고리즘, 내부 상태 이름 등)은 절대 적지 않습니다** — 이 저장소는 public입니다. 커밋 메시지 원문을 그대로 옮기지 말고, 위 기준으로 다시 쓴 요약만 올립니다.
- 사용자 눈에 아무 변화가 없는 릴리즈(내부 리팩토링, 서버/텔레메트리 전용 변경, 진단용 재빌드 등)는 이 페이지에 항목을 추가하지 않습니다.
