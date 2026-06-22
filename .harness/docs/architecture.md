# Architecture

## Tech Stack

| 계층 | 기술 |
|------|------|
| Framework | Expo SDK 54 (Managed) |
| Language | TypeScript ~5.9.2 |
| UI | React 19.1.0 / React Native 0.81.5 |
| Navigation | React Navigation 6 (Stack + Bottom Tabs) |
| Client State | Zustand 5 |
| Server State | TanStack React Query 5 |
| HTTP | Axios 1.7.7 (interceptor 기반 auth) |
| Animation | react-native-reanimated 4.1.3 |
| Storage | AsyncStorage |
| Push | Firebase Cloud Messaging |

## 디렉토리 구조

```
app/
├── apis/           # Axios 인스턴스, API 타입 정의
│   ├── index.ts    # Axios instance + interceptors
│   └── types.ts    # API request/response 타입
├── assets/         # 폰트, 아이콘(SVG), 이미지
├── Components/     # 재사용 가능한 UI 컴포넌트
│   ├── Common/     # Button, Text, TextInput, Layout 등
│   └── Headers/    # Header, PrevHeader
├── constants/      # color, text(font), paths, date 등
├── hooks/          # Custom hooks (Zustand stores + Query wrappers)
├── Navigation/     # Stack Navigator + Bottom Tab Navigator
├── Screens/        # 화면 단위 디렉토리
├── types/          # 타입 선언 파일
└── utils/          # 유틸리티 함수 (storage, date, notification)
```

## 레이어 의존성 규칙

```
Screens ─→ Components ─→ hooks ─→ apis ─→ 외부
               ↕
            constants
```

- 각 레이어는 자신보다 상위 레이어만 참조할 수 있습니다.
- `Screens`는 `Components`, `hooks`, `apis`를 참조할 수 있습니다.
- `Components`는 `hooks`, `constants`를 참조할 수 있습니다.
- `hooks`는 `apis`, `constants`, `utils`를 참조할 수 있습니다.
- `apis`는 외부 라이브러리와 `constants`만 참조합니다.
- `Navigation`은 `Screens`를 참조합니다.

## 네비게이션 구조

```
Stack Navigator (Root)
├── 온보딩 (Onboard)
├── 로그인 (Login)
├── 비번변경이메일 (ChangePWEmail)
├── 비번변경비밀번호 (ChangePWPassword)
├── 회원가입이메일 (RegisterEmail)
├── 회원가입비밀번호 (RegisterPassword)
├── 회원가입아이디 (RegisterID)
├── 메인 → Bottom Tab Navigator
│   ├── 홈 (Home)
│   ├── 급식 (Meal)
│   ├── 신청 (Apply)
│   ├── 일정 (Schedule)
│   └── 전체 (All)
├── 알림 (Alert)
├── 주말급식 (WeekendMeal)
├── 교실이동 (Move)
├── 외출 (Out)
├── 조기귀가 (EarlyReturn)
├── 공지사항 (Notice)
├── 상세보기 (NoticeDetail)
├── 마이페이지 (My)
├── 커스텀 (Custom)
├── 알림설정 (AlertConfig)
├── 버그제보 (Bug)
└── 자습감독 (SelfStudy)
```

## 상태 관리

### Client State (Zustand)
- `useTheme`: 테마 (light/dark) + animated color interpolation
- `useToast`: 토스트 알림 (success, error, wait, update, close)
- `useModal`: 모달 관리 (open, close)
- `useBottomSheet`: BottomSheet 관리 (open, close)
- `useMenu`: 슬라이드 메뉴 상태
- `useOptions`: 사용자 옵션 (mainType, periodType)
- `usePwChangeState`: 비밀번호 변경 플로우 상태
- `useSignupState`: 회원가입 플로우 상태

### Server State (TanStack Query)
- `useMyQuery<T>` wrapper: 자동 재시도 3회, staleTime 2분
- `useMyMutation<T,K>` wrapper: HTTP method + 에러 핸들링

### Persistent Storage (AsyncStorage)
- Access/Refresh token (5분 TTL 캐싱)
- 테마 설정
- 사용자 옵션

## 테마 시스템

```typescript
const { color } = useTheme();
color("main", 500);       // animated (기본)
color("main", 500, true); // static (no animation)
```

카테고리: `main`, `gray`, `normal`, `bg`, `error`

## API 통신

- Axios instance: `apis/index.ts`
- Request interceptor: Bearer token 자동 첨부
- Response interceptor: 401 → refresh → 실패 시 로그인 화면 이동
- Error status code 처리: 500(서버), 502/503(인프라), 기타(클라이언트)
