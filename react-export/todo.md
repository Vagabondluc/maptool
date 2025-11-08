# React Export Documentation TODOs

These tasks are derived from the file audit to ensure each guide, spec, and example remains current and implementation-ready.

- [ ] Align `current/app.md` and `current/index.md` by drafting a shared bootstrap checklist that documents provider registration order and startup side effects.
- [ ] Expand `current/components.md` with prop tables for every shared component referenced in the examples directory.
- [ ] Add lifecycle diagrams to `systems/chat/index.md` and `specs/chat.md` that clarify command parsing flow.
- [ ] Update `systems/fog/index.md` with current shader or canvas optimization techniques mentioned in `examples/fog-pipeline.tsx`.
- [ ] Cross-link `specs/macro.md` to the runtime and tests described in `tests/macro.spec.ts` so implementers can jump from theory to validation.
- [ ] Provide concrete API payload examples in `specs/connection.md` and sync them with `examples/websocket-bridge.ts`.
- [ ] Enrich `prd/user-stories.md` with acceptance criteria references from `prd/acceptance-criteria.md` to close the traceability gap.
- [ ] Add deployment checklist items to `infrastructure/runtime.md` that reference monitoring hooks outlined in `infrastructure/testing.md`.
- [ ] Create example test matrices in `tdd/rendering.md` that mirror the assertions already present in `tests/rendering.spec.ts`.
- [ ] Document data fixtures used in `tests/chat.spec.ts` and expose them through `tdd/networking.md` for reuse.
- [ ] Append status metadata columns to `roadmap/todo.md` matching the schema defined in `roadmap/schema.md`.
