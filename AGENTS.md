# PiCK Android

대덕소프트웨어마이스터고등학교 통합 플랫폼 PiCK의 Android (React Native) 클라이언트입니다.

작업 전에 `.harness/` 디렉토리를 읽고 프로젝트 구조와 규칙을 파악하세요.

상황과 상관없이 일단 `.harness/skills/harness.md`를 읽고 적용하십시오.

## 규칙

- `node_modules/`, `.expo/`, `android/`, `ios/`는 건드리지 않을 것
- `app.json`, `eas.json`, `metro.config.js`, `babel.config.js`, `eslint.config.mjs`, `.prettierrc`, `tsconfig.json`, `yarn.lock`는 수정하지 말 것
- `credentials/` 디렉토리와 `.env`, `credentials.json`, `google-services.json`는 절대 읽거나 수정하지 말 것
- 새 패키지 설치나 환경 변경(chore 작업)이 필요하면 사용자에게 먼저 물어볼 것
