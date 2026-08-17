# 내일내과의원 금천점 홈페이지

서울 금천구 내일내과의원 금천점 정적 홈페이지입니다. GitHub Pages로 배포됩니다.

## 구조

| 파일 | 페이지 |
| --- | --- |
| `index.html` | 메인 |
| `about.html` | 병원소개 |
| `services.html` | 진료과목 |
| `doctors.html` | 의료진 |
| `endoscopy.html` | 내시경센터 |
| `imaging.html` | CT·영상의학센터 |
| `checkup.html` | 종합검진센터 (공단건강검진) |
| `faq.html` | FAQ |

- `assets/` — 이미지 43개
- `support.js` — 페이지 템플릿 런타임 (dc-runtime). React 18과 Babel을 unpkg에서 불러오므로 **페이지 표시에 인터넷 연결이 필요합니다**
- `image-slot.js` — 의료진 사진 슬롯 컴포넌트
- `.image-slots.state.json` — 사진 슬롯 위치 보정값 (박준용 원장 사진 offset). 지우면 사진 크롭이 틀어집니다

## 배포

`main` 브랜치에 push하면 `.github/workflows/deploy.yml` 이 GitHub Pages로 배포합니다.
배포 전 `.github/scripts/check-links.js` 가 모든 내부 링크와 이미지 경로를 검사하며,
깨진 참조가 하나라도 있으면 배포를 중단합니다.

로컬 확인:

```bash
node .github/scripts/check-links.js   # 링크 검사
npx serve .                           # 아무 정적 서버로 미리보기
```

## SEO

- 8개 페이지 모두 `<title>` 과 `<meta name="description">` 을 정적 `<head>` 에 작성
- `MedicalClinic` JSON-LD (진료시간·주소·좌표·우수내시경실 인증·서비스 11종·SNS 6곳)
- `faq.html` 에 `FAQPage` JSON-LD — **본문 Q&A에서 생성했으므로 문구 수정 시 함께 갱신해야 합니다**

## 도메인 연결 시 남은 작업

1. 저장소 Settings → Pages → Custom domain 에 도메인 입력 (`CNAME` 파일 자동 생성)
2. DNS: `www` → `<계정>.github.io` CNAME, apex 는 GitHub Pages A/AAAA 레코드
3. Enforce HTTPS 체크
4. JSON-LD 의 `@id` / `image` 를 절대 URL로 전환
5. 각 페이지 `<link rel="canonical">` 추가
6. `sitemap.xml`, `robots.txt` 추가
7. Open Graph 태그 (카카오톡·블로그 공유 미리보기)
8. [리치 결과 테스트](https://search.google.com/test/rich-results)로 구조화 데이터 검증
