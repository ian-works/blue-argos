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
