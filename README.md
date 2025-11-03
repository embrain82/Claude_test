# ETF 설명 웹페이지

ETF(상장지수펀드)에 대한 종합 설명을 제공하는 교육용 웹페이지입니다.

## 로컬에서 실행하기

1. 이 저장소를 클론합니다:
```bash
git clone <repository-url>
cd Claude_test
```

2. `index.html` 파일을 브라우저로 엽니다:
```bash
# 또는 간단한 HTTP 서버를 실행:
python -m http.server 8000
# 또는
python3 -m http.server 8000
```

3. 브라우저에서 `http://localhost:8000`에 접속합니다.

## GitHub Pages로 배포하기

### 방법 1: GitHub 웹 인터페이스 사용

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - Branch: `claude/etf-explanation-webpage-011CUkC3yq2wmPK73vycb5pG` 선택
   - Folder: `/ (root)` 선택
5. **Save** 버튼 클릭
6. 몇 분 후 `https://<username>.github.io/<repository-name>/` 에서 접속 가능

### 방법 2: 파일을 main 브랜치로 복사

```bash
# main 브랜치가 없다면 생성
git checkout --orphan main
git add index.html style.css README.md
git commit -m "Deploy ETF explanation webpage"
git push origin main

# 그 후 GitHub Settings > Pages에서 main 브랜치 선택
```

## Netlify로 배포하기 (추천)

가장 빠르고 쉬운 방법:

1. [Netlify](https://www.netlify.com)에 회원가입
2. "Add new site" > "Import an existing project" 선택
3. GitHub 저장소 연결
4. 브랜치 선택: `claude/etf-explanation-webpage-011CUkC3yq2wmPK73vycb5pG`
5. Deploy 클릭
6. 자동으로 URL이 생성됩니다 (예: `https://random-name.netlify.app`)

## Vercel로 배포하기

1. [Vercel](https://vercel.com)에 회원가입
2. "New Project" 클릭
3. GitHub 저장소 import
4. 브랜치 선택 및 Deploy
5. 자동으로 URL이 생성됩니다

## 웹페이지 내용

- **ETF 개념 설명**: 상장지수펀드의 정의와 특징
- **주요 특징**: 실시간 거래, 낮은 비용, 분산투자, 투명성
- **장점**: 소액 투자, 세금 효율성, 다양한 선택 등
- **ETF 종류**: 주식형, 채권형, 글로벌, 섹터/테마 등
- **투자 방법**: 5단계 투자 가이드
- **유의사항**: 추적오차, 거래 비용, 위험 요소
- **투자 팁**: 장기 투자, 비용 비교, 정기 적립식 등

## 기술 스택

- HTML5
- CSS3 (반응형 디자인)
- 순수 JavaScript (프레임워크 없음)

## 라이선스

교육 목적으로 제공되며, 투자 권유가 아닙니다.
