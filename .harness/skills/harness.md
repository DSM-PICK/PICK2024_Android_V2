# Harness

## Workflow

```
사용자 요청
    │
    v
1. Context Load ─── docs/ 참조
    │
    v
2. Developer ────── 코드 생성 (one-shot)
    │
    v
3. Critic ───────── 설계 검토
    │
    v
4. Reviewer ─────── 컨벤션 검증
    │
    v
5. GC ───────────── lint + format + 정리
    │
    v
사용자 보고
```

## Agent Management

- subagent를 만들고 각 단계에서 해당하는 `.harness/agents/*.md` 파일과 문서를 첨부하여 인계합니다.
- "작업한거 문제 없는지 확인해봐" → `reviewer.md`와 `critic.md` 로드 → 검토 수행
- "이 기능 개발해줘" → `developer.md` 참조 → 수정 및 이후 검토 수행

## Definition of Done

- [ ] lint 통과 (`yarn lint`)
- [ ] format 적용 (`yarn format`)
- [ ] 기존 패턴과 일관성 유지
- [ ] 불필요한 코드 제거됨

## Error Handling

| 상황 | 대응 |
|------|------|
| lint 실패 | GC가 자동 수정 후 재확인 |
| 새 패키지 필요 | 사용자 승인 요청 |
| 구조적 변경 필요 | 사용자에게 제안 |
