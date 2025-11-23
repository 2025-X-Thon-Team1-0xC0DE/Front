# 🎨 gAIde Frontend Architecture
## React Component-Based Design System

> **핵심 철학**: "재사용 가능한 컴포넌트를 통해 일관성 있고 확장 가능한 UI를 구축"



## 📐 아키텍처 개요 (Architecture Overview)

gAIde의 프론트엔드는 **React의 컴포넌트 단위 설계**를 핵심으로 하고 있습니다. 
각 컴포넌트는 독립적인 책임을 가지며, Props와 State를 통해 데이터를 주고받습니다.

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── Header.jsx      # 모든 페이지의 헤더
│   ├── Background.css   # 글로벌 배경 스타일
│   └── ...
├── pages/              # 페이지 단위 컴포넌트
│   ├── LoginPage.jsx   # 로그인 화면
│   ├── MainPage.jsx    # 메인 화면
│   ├── MyPage.jsx      # 내 글 목록 화면
│   └── WritingPage.jsx # 에디터 화면
├── hooks/              # 커스텀 React 훅 (상태 로직 재사용)
├── utils/              # 공통 유틸 함수
└── api/                # 백엔드 API 호출 함수
```



## 🧩 핵심 컴포넌트 분석 (Core Components)

### 1️⃣ **Background Component** - 전역 배경 스타일
```
역할: 모든 페이지에서 사용되는 그라데이션 배경 제공
재사용성: 높음 (CSS 변수 활용으로 중앙 관리)
위치: src/components/Background.css
```

**특징:**
- CSS 변수(`--gradient-bg`)를 통해 한 곳에서만 색상 관리
- `.gradient-background` 클래스: 특정 div에 적용 가능
- `body.gradient-body`: 전체 페이지 배경으로 적용
- 반응형: 모든 기기에서 100vh(전체 높이) 보장

**사용 사례:**
```jsx
// 특정 컴포넌트에만 배경 적용
<div className="gradient-background">
  <YourContent />
</div>

// MyPage처럼 전체 페이지 배경으로 사용
document.body.classList.add('gradient-body', 'my-page-body');
```



### 2️⃣ **Header Component** - 네비게이션 & 사용자 정보
```
역할: 모든 페이지의 상단 네비게이션 바 제공
재사용성: 높음 (로고, 프로필 아이콘 등 일관성 있는 UI)
위치: src/components/Header.jsx & Header.css
```

**특징:**
- **Glassmorphism 디자인**: `backdrop-filter: blur(10px)`로 반투명 유리 효과
- **Flexbox 레이아웃**: 좌측(로고) ↔ 우측(프로필)으로 균형 있는 배치
- **마이크로 인터랙션**: `:hover` 상태에서 부드러운 색상/배경 변화
- **일관성**: 모든 페이지에서 동일한 헤더 제공

**구조:**
```
Header
├── brand-name (gAIde 로고)
└── profile-icon (사용자 프로필)
    └── hover 상태: 배경색 변화 + 색상 강조
```

**재사용 흐름:**
```jsx
// 모든 페이지에서 동일하게 import
import Header from '../components/Header';

// 각 페이지 최상단에 배치
<Header />
<MainContent />
```



## 💡 주요 설계 원칙

### ✅ Single Responsibility Principle (단일 책임 원칙)
각 컴포넌트는 **하나의 역할**만 수행
- Header: 네비게이션만
- DocumentItem: 글 아이템 표시만

### ✅ DRY (Don't Repeat Yourself)
중복 코드 제거 → 유지보수성 ⬆️
- Header 중복 제거
- 카테고리 맵 함수로 동적 생성

### ✅ Composition Over Inheritance
작은 컴포넌트를 조합하여 큰 기능 구성
- Header + MyPageContent = MyPage
- CategorySection + DocumentItem = DocumentsContainer



## 📦 기술 스택 (Frontend)

| 계층 | 기술 | 이유 |
|------|------|------|
| **UI Framework** | React 18+ | 컴포넌트 기반 설계 및 상태 관리 |
| **스타일링** | CSS + CSS 변수 | 중앙화된 색상 관리 및 반응형 디자인 |
| **라우팅** | React Router | 페이지 간 네비게이션 |
| **상태관리** | useState/useEffect | 로컬 상태 관리 (복잡도 낮음) |
| **비동기 처리** | async/await | API 호출 및 데이터 로드 |



## ✨ 최종 정리

gAIde 프론트엔드의 강점:
- **컴포넌트 재사용성**: Header, Background 등 여러 페이지에서 재사용
- **데이터 기반 렌더링**: categories 배열로 동적 UI 생성
- **상태 관리**: 로딩/에러 상태로 사용자 피드백 제공
- **유지보수성**: 한 곳 수정 = 전체 반영
- **확장성**: 새 기능 추가 시 기존 코드 최소 변경
