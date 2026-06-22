# Conventions

## 파일 네이밍

| 유형 | 규칙 | 예시 |
|------|------|------|
| Screen | PascalCase 디렉토리 + 컴포넌트명 | `Screens/Login/` |
| Component | PascalCase | `Button.tsx`, `TextInput.tsx` |
| Hook | camelCase + `use` prefix | `useTheme.ts`, `useToast.ts` |
| Util | camelCase | `storage.ts`, `date.ts` |
| Constant | camelCase | `color.ts`, `text.ts`, `paths.ts` |
| Type definition | PascalCase (interface: I prefix) | `IUserLogin`, `scheduleType` |
| API 타입 | `apis/types.ts`에 I prefix | `IUserLoginIn`, `IUserLoginOut` |

## 코드 스타일

| 규칙 | 값 |
|------|-----|
| Quotes | Double (`"`) |
| Semicolons | Required |
| Trailing commas | All |
| Indentation | 2 spaces |
| Import alias | `@/` → `app/` |

## 컴포넌트 규칙

- Named export 사용 (default export 지양)
- Props는 컴포넌트 상단에 `interface IProp`으로 정의
- `React.FC` 사용 지양 (명시적 children 타입 사용)
- 스타일은 `StyleSheet.create()`로 파일 하단에 정의 (동적 스타일은 inline 허용)

## Zustand Store 규칙

- Store interface는 `I` prefix
- `create<IStore>((set, get) => ({...}))` 패턴
- Store hook은 `use` prefix로 export
- 다중 화면에 걸친 Form 상태는 전용 Store로 분리

## API 규칙

- Query는 `useMyQuery<T>` wrapper 사용
- Mutation은 `useMyMutation<T,K>` wrapper 사용
- API path는 `constants/paths.ts`에 정의
- API 타입은 `apis/types.ts`에 통합 관리
- 한국어 에러 메시지 사용

## 컴포넌트 Import 순서

```typescript
// 1. React
import { useState } from "react";

// 2. Libraries
import { useQuery } from "@tanstack/react-query";

// 3. Internal components
import { Button, Text } from "@/Components";

// 4. Hooks
import { useTheme, useToast } from "@/hooks";

// 5. API
import { instance } from "@/apis";

// 6. Constants
import { paths } from "@/constants";

// 7. Types
import { IType } from "@/apis/types";

// 8. Utils
import { formatDate } from "@/utils/date";
```

## 네비게이션 화면명

- 한국어 route name 사용
- Stack.Screen: `name="화면명"`
- Tab.Screen: `name="홈"`, `name="급식"`, `name="신청"`, `name="일정"`, `name="전체"`
- 새 화면 추가 시 Navigation 두 파일 모두 업데이트

## 커밋 메시지

```
<type>: <description>
```

Types: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `perf`
