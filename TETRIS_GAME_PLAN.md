# 테트리스 게임 구현 계획서

## 1. 프로젝트 개요

### 1.1 목표
- 웹 브라우저에서 실행 가능한 클래식 테트리스 게임 구현
- HTML5 Canvas를 사용한 렌더링
- 반응형 디자인 및 모바일 지원

### 1.2 기술 스택
- **HTML5**: 게임 구조 및 Canvas 요소
- **CSS3**: 스타일링 및 레이아웃
- **JavaScript (Vanilla)**: 게임 로직 및 제어

---

## 2. 게임 요구사항

### 2.1 핵심 기능
1. **테트로미노 (블록) 시스템**
   - 7가지 기본 블록 타입 (I, O, T, S, Z, J, L)
   - 각 블록의 회전 기능
   - 랜덤 블록 생성

2. **게임 보드**
   - 10x20 크기의 게임 필드
   - 그리드 기반 좌표 시스템

3. **게임 제어**
   - 좌우 이동 (←, →)
   - 회전 (↑ 또는 스페이스바)
   - 빠른 낙하 (↓)
   - 즉시 낙하 (스페이스바)
   - 일시정지 (P)
   - 게임 재시작 (R)

4. **점수 시스템**
   - 줄 제거 시 점수 획득
   - 한 번에 여러 줄 제거 시 보너스
   - 레벨 시스템 (속도 증가)

5. **게임 상태 관리**
   - 시작, 진행 중, 일시정지, 게임 오버
   - 다음 블록 미리보기
   - 현재 점수, 레벨, 제거한 줄 수 표시

---

## 3. 아키텍처 설계

### 3.1 파일 구조
```
tetris/
├── index.html          # 메인 HTML 파일
├── css/
│   └── tetris.css     # 게임 스타일
├── js/
│   ├── tetris.js      # 메인 게임 로직
│   ├── blocks.js      # 테트로미노 정의
│   ├── board.js       # 게임 보드 관리
│   ├── controls.js    # 입력 제어
│   └── renderer.js    # Canvas 렌더링
└── assets/
    └── sounds/        # 효과음 (선택사항)
```

### 3.2 주요 클래스/모듈

#### 3.2.1 Block (테트로미노)
```javascript
class Block {
  constructor(type)
  - type: 블록 타입 (I, O, T, S, Z, J, L)
  - shape: 2D 배열로 블록 모양
  - color: 블록 색상
  - position: {x, y} 현재 위치
  - rotationState: 현재 회전 상태

  methods:
  - rotate(): 블록 회전
  - moveLeft(): 왼쪽 이동
  - moveRight(): 오른쪽 이동
  - moveDown(): 아래로 이동
}
```

#### 3.2.2 Board (게임 보드)
```javascript
class Board {
  constructor(width, height)
  - grid: 2D 배열 (10x20)
  - width: 10
  - height: 20

  methods:
  - isValidMove(block, position): 이동 가능 여부 확인
  - placeBlock(block): 블록을 보드에 고정
  - clearLines(): 완성된 줄 제거
  - getFullLines(): 완성된 줄 찾기
  - isGameOver(): 게임 오버 확인
  - reset(): 보드 초기화
}
```

#### 3.2.3 Game (게임 컨트롤러)
```javascript
class Game {
  constructor()
  - board: Board 인스턴스
  - currentBlock: 현재 블록
  - nextBlock: 다음 블록
  - score: 현재 점수
  - level: 현재 레벨
  - lines: 제거한 줄 수
  - gameState: 'playing', 'paused', 'gameOver'
  - dropInterval: 블록 낙하 속도

  methods:
  - start(): 게임 시작
  - pause(): 일시정지
  - resume(): 재개
  - restart(): 재시작
  - update(): 게임 상태 업데이트
  - spawnBlock(): 새 블록 생성
  - calculateScore(linesCleared): 점수 계산
  - increaseLevel(): 레벨 증가
}
```

#### 3.2.4 Renderer (렌더러)
```javascript
class Renderer {
  constructor(canvas, context)
  - canvas: Canvas 요소
  - ctx: Canvas 2D context
  - cellSize: 각 셀의 크기 (픽셀)

  methods:
  - drawBoard(board): 게임 보드 그리기
  - drawBlock(block): 현재 블록 그리기
  - drawNextBlock(block): 다음 블록 미리보기
  - drawGrid(): 그리드 라인 그리기
  - drawGameOver(): 게임 오버 화면
  - clear(): 화면 지우기
}
```

#### 3.2.5 InputController (입력 제어)
```javascript
class InputController {
  constructor(game)
  - game: Game 인스턴스
  - keyMap: 키 매핑

  methods:
  - handleKeyDown(event): 키 입력 처리
  - handleTouchStart(event): 터치 시작
  - handleTouchMove(event): 터치 이동
  - handleTouchEnd(event): 터치 종료
}
```

---

## 4. 구현 단계

### Phase 1: 기본 구조 설정 (2-3시간)
1. HTML 구조 생성
   - Canvas 요소
   - UI 요소 (점수, 레벨, 다음 블록)
   - 버튼 (시작, 일시정지, 재시작)

2. CSS 스타일링
   - 레이아웃 구성
   - 반응형 디자인
   - 색상 스키마

3. 기본 JavaScript 구조
   - 파일 생성 및 연결
   - 상수 정의 (보드 크기, 색상 등)

### Phase 2: 테트로미노 구현 (3-4시간)
1. 블록 타입 정의
   - 7가지 블록 모양 2D 배열로 정의
   - 각 블록의 색상 지정
   - 회전 상태 배열 정의

2. Block 클래스 구현
   - 생성자 및 속성
   - 이동 메서드
   - 회전 로직 (4방향 또는 SRS 시스템)

3. 블록 렌더링
   - Canvas에 블록 그리기
   - 그림자 표시 (선택사항)

### Phase 3: 게임 보드 구현 (3-4시간)
1. Board 클래스 구현
   - 2D 그리드 초기화
   - 충돌 감지 로직
   - 줄 제거 로직

2. 보드 렌더링
   - 그리드 그리기
   - 고정된 블록 표시
   - 테두리 및 배경

### Phase 4: 게임 로직 구현 (4-5시간)
1. Game 클래스 구현
   - 게임 루프 설정
   - 블록 생성 시스템
   - 자동 낙하 타이머

2. 점수 시스템
   - 점수 계산 로직
   - 레벨 진행 시스템
   - 속도 조절

3. 게임 상태 관리
   - 시작/일시정지/재시작
   - 게임 오버 감지
   - 상태 전환

### Phase 5: 입력 제어 (2-3시간)
1. 키보드 입력
   - 화살표 키 처리
   - 회전 키 처리
   - 특수 키 (일시정지, 재시작)

2. 터치 입력 (모바일)
   - 스와이프 제스처
   - 탭 제스처
   - 가상 버튼

### Phase 6: UI 및 UX 개선 (2-3시간)
1. 정보 표시
   - 점수, 레벨, 줄 수
   - 다음 블록 미리보기
   - 홀드 기능 (선택사항)

2. 시각 효과
   - 줄 제거 애니메이션
   - 블록 배치 효과
   - 레벨업 알림

3. 사운드 (선택사항)
   - 블록 이동 소리
   - 줄 제거 소리
   - 배경 음악

### Phase 7: 테스트 및 최적화 (2-3시간)
1. 버그 수정
   - 충돌 감지 오류
   - 회전 버그
   - 경계 처리

2. 성능 최적화
   - 렌더링 최적화
   - 메모리 관리
   - FPS 안정화

3. 크로스 브라우저 테스트
   - Chrome, Firefox, Safari
   - 모바일 브라우저

---

## 5. 상세 구현 가이드

### 5.1 블록 정의 예시
```javascript
const BLOCKS = {
  I: {
    shape: [
      [[0,0,0,0],
       [1,1,1,1],
       [0,0,0,0],
       [0,0,0,0]]
    ],
    color: '#00FFFF'
  },
  O: {
    shape: [
      [[1,1],
       [1,1]]
    ],
    color: '#FFFF00'
  },
  T: {
    shape: [
      [[0,1,0],
       [1,1,1],
       [0,0,0]]
    ],
    color: '#800080'
  },
  // S, Z, J, L도 유사하게 정의
};
```

### 5.2 회전 알고리즘
```javascript
// 시계방향 90도 회전
function rotateMatrix(matrix) {
  const N = matrix.length;
  const result = Array(N).fill(null).map(() => Array(N).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      result[j][N - 1 - i] = matrix[i][j];
    }
  }

  return result;
}
```

### 5.3 충돌 감지
```javascript
function isValidMove(board, block, newX, newY) {
  const shape = block.shape;

  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col]) {
        const boardX = newX + col;
        const boardY = newY + row;

        // 경계 체크
        if (boardX < 0 || boardX >= board.width ||
            boardY < 0 || boardY >= board.height) {
          return false;
        }

        // 다른 블록과 충돌 체크
        if (board.grid[boardY][boardX]) {
          return false;
        }
      }
    }
  }

  return true;
}
```

### 5.4 줄 제거 로직
```javascript
function clearLines(board) {
  let linesCleared = 0;

  for (let row = board.height - 1; row >= 0; row--) {
    if (board.grid[row].every(cell => cell !== 0)) {
      // 줄 제거
      board.grid.splice(row, 1);
      board.grid.unshift(new Array(board.width).fill(0));
      linesCleared++;
      row++; // 같은 행 다시 체크
    }
  }

  return linesCleared;
}
```

### 5.5 점수 계산
```javascript
function calculateScore(linesCleared, level) {
  const baseScores = {
    1: 100,   // Single
    2: 300,   // Double
    3: 500,   // Triple
    4: 800    // Tetris
  };

  return (baseScores[linesCleared] || 0) * level;
}
```

### 5.6 게임 루프
```javascript
class Game {
  constructor() {
    this.lastTime = 0;
    this.dropCounter = 0;
    this.dropInterval = 1000; // 1초
  }

  gameLoop(time = 0) {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    if (this.gameState === 'playing') {
      this.dropCounter += deltaTime;

      if (this.dropCounter > this.dropInterval) {
        this.moveBlockDown();
        this.dropCounter = 0;
      }

      this.renderer.render();
    }

    requestAnimationFrame((time) => this.gameLoop(time));
  }
}
```

---

## 6. 추가 기능 (선택사항)

### 6.1 고급 기능
1. **홀드 기능**
   - 현재 블록을 보관하고 나중에 사용
   - 한 번만 사용 가능 (블록 배치 후 재사용 가능)

2. **하드 드롭**
   - 블록을 즉시 바닥으로 떨어뜨림
   - 추가 점수 획득

3. **고스트 블록**
   - 블록이 떨어질 위치 미리 표시
   - 반투명 블록으로 표시

4. **콤보 시스템**
   - 연속으로 줄 제거 시 보너스
   - 콤보 카운터 표시

### 6.2 UI 개선
1. **테마 변경**
   - 다크 모드 / 라이트 모드
   - 클래식 / 모던 스타일

2. **모바일 최적화**
   - 터치 제어
   - 화면 크기 자동 조정
   - 가로/세로 모드 지원

3. **설정 메뉴**
   - 난이도 조절
   - 사운드 On/Off
   - 키 바인딩 변경

### 6.3 소셜 기능
1. **순위표**
   - 로컬 스토리지에 최고 점수 저장
   - 순위 표시

2. **공유 기능**
   - 점수 공유
   - 스크린샷 저장

---

## 7. 테스트 체크리스트

### 7.1 기능 테스트
- [ ] 모든 블록이 올바르게 생성되는가?
- [ ] 블록 회전이 정상 작동하는가?
- [ ] 좌우 이동이 올바르게 작동하는가?
- [ ] 블록이 자동으로 떨어지는가?
- [ ] 줄 제거가 정상 작동하는가?
- [ ] 점수가 올바르게 계산되는가?
- [ ] 레벨이 증가하는가?
- [ ] 게임 오버가 올바르게 감지되는가?
- [ ] 일시정지/재시작이 작동하는가?

### 7.2 UI/UX 테스트
- [ ] 모든 정보가 올바르게 표시되는가?
- [ ] 다음 블록 미리보기가 작동하는가?
- [ ] 애니메이션이 부드러운가?
- [ ] 버튼이 모두 작동하는가?
- [ ] 반응형 디자인이 작동하는가?

### 7.3 성능 테스트
- [ ] FPS가 60으로 안정적인가?
- [ ] 메모리 누수가 없는가?
- [ ] 긴 플레이 시간 후에도 정상 작동하는가?

### 7.4 브라우저 호환성
- [ ] Chrome에서 작동하는가?
- [ ] Firefox에서 작동하는가?
- [ ] Safari에서 작동하는가?
- [ ] 모바일 브라우저에서 작동하는가?

---

## 8. 배포

### 8.1 최적화
1. 코드 압축 (Minification)
2. 이미지 최적화
3. 캐싱 전략

### 8.2 호스팅
- GitHub Pages
- Netlify
- Vercel
- 또는 다른 정적 호스팅 서비스

---

## 9. 참고 자료

### 9.1 테트리스 가이드라인
- Official Tetris Guideline (회전 시스템, 점수 등)
- SRS (Super Rotation System)

### 9.2 유용한 리소스
- HTML5 Canvas API 문서
- JavaScript 게임 개발 가이드
- 테트리스 알고리즘 설명

---

## 10. 예상 개발 시간

- **Phase 1**: 2-3시간
- **Phase 2**: 3-4시간
- **Phase 3**: 3-4시간
- **Phase 4**: 4-5시간
- **Phase 5**: 2-3시간
- **Phase 6**: 2-3시간
- **Phase 7**: 2-3시간

**총 예상 시간**: 18-25시간

---

## 11. 다음 단계

1. 이 계획서 검토 및 수정
2. 개발 환경 설정
3. Phase 1부터 순차적으로 구현 시작
4. 각 Phase 완료 후 테스트
5. 최종 배포

---

**작성일**: 2025-11-04
**버전**: 1.0
