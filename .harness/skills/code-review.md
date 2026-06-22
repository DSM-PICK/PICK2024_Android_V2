# Code Review

## Critical

### 아키텍처 경계
- [ ] 레이어 간 의존성이 올바른가? (`Components` → `hooks` → `apis` → 외부)
- [ ] 순환 의존성이 없는가?
- [ ] `@/` alias가 올바르게 사용되었는가?

### 파일 구조 및 네이밍
- [ ] 화면 파일은 `app/Screens/FeatureName/`에 위치하는가?
- [ ] 컴포넌트 파일은 `app/Components/Common/` 또는 `app/Components/Headers/`에 위치하는가?
- [ ] 파일명이 PascalCase (컴포넌트) 또는 camelCase (유틸/상수)를 따르는가?
- [ ] barrel export (`index.ts`)가 존재하는가?

## High

### Zustand Store
- [ ] `I` prefix interface로 타입이 정의되었는가?
- [ ] `create<IStore>((set, get) => ({...}))` 패턴을 따르는가?
- [ ] store hook이 `use` prefix로 시작하는가?

### TanStack Query
- [ ] `useMyQuery` / `useMyMutation` 래퍼를 사용하는가?
- [ ] query key가 적절히 구성되었는가?
- [ ] mutation 에러 핸들링이 되어 있는가?

### TypeScript
- [ ] Props에 `IProp` 인터페이스가 정의되었는가?
- [ ] `any` 사용을 최소화했는가?
- [ ] API 응답 타입이 `apis/types.ts`에 정의되었는가?

### 테마/컬러
- [ ] `useTheme()` + `color()` 패턴을 사용하는가?
- [ ] 하드코딩된 hex color가 없는가?
- [ ] `colorTable`에 정의된 색상만 사용하는가?

## Medium

### Import
- [ ] `@/` alias import를 사용하는가? (상대 경로 지양)
- [ ] 사용하지 않는 import가 없는가?

### Props
- [ ] Props 인터페이스에 `I` prefix가 있는가?
- [ ] `React.FC` 사용을 피했는가?

## 판정

- `APPROVED`: 모든 Critical/High 항목 통과
- `NEEDS_REVISION`: Critical 또는 High 항목 위반 발견
