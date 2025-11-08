# Project Instructions: Macro Language & Menu System

This document captures two pre-built deliverables that guide future documentation work for the MapTool modernization roadmap. Each section summarizes the asset bundle that already exists (per the provided patch references) and highlights the documentation threads we need to expand.

## MTScript (MapTool Macro) Reimplementation Kit

### Assets Supplied
- **Grammar**: `react-export/specs/macro.pegjs`
- **AST Types**: `react-export/specs/macro-ast.ts`
- **Evaluator**: `react-export/specs/macro-eval.ts`
- **Runtime**: `react-export/specs/macro-runtime.ts`
- **Function Registry**: `react-export/specs/functions/index.ts`
- **Example Usage**: `react-export/examples/chat-expansion.tsx`
- **End-to-End Tests**: `react-export/tests/macro-e2e.spec.ts`
- **Readme Overview**: `react-export/README-mt-macros.md`

### How to Use
1. Compile the grammar with Peggy:
   ```bash
   peggy --format es --output react-export/specs/macro.parser.js react-export/specs/macro.pegjs
   ```
2. Wire the generated parser into the evaluator/runtime to execute inline chat expressions or slash commands.
3. Extend the function registry with additional MapTool-specific APIs (dialogs, token management, fog control, permissions).
4. Write documentation that explains how the interpreter maps to legacy MTScript behavior, including:
   - Variable scoping (`token`, `campaign`, `client`, `local`, `$` aliases).
   - Dice expression semantics (explode, keep, reroll, modifiers).
   - Command dispatch (`/say`, `/whisper`, and delegation to `ctx.call`).
   - Integration pattern for chat expansion.

### Follow-up Documentation Targets
- Trusted vs. untrusted macro execution.
- Dialog/form APIs (`input()`, `frame()`, button callbacks) layered on the runtime.
- Macro event lifecycle (e.g., `onCampaignLoad`, initiative change hooks).
- Standard library catalog with configuration guidance.

## Menu & Command System Reverse-Engineering Guide

### Product Requirements & Technical Design
- **PRD**: `react-export/prd/ui-menus.md`
- **TDD Notes**: `react-export/tdd/ui-menus.md`
- **Schema Definition**: `react-export/specs/ui-menu.schema.ts`
- **Command Dispatch Bus**: `react-export/specs/ui-menu.dispatch.ts`

### Catalog & Implementations
- **Canonical Menu Catalog**: `react-export/specs/ui-menu.catalog.ts`
- **React Components**:
  - `react-export/examples/MenuBar.tsx`
  - `react-export/examples/ContextMenu.tsx`
  - `react-export/examples/MenuDemo.tsx`
- **Tests**: `react-export/tests/ui-menu.spec.ts`

### Documentation Focus Areas
- Enumerate enablement guards (`hasActiveZone`, `isGM`, etc.) and map them to application state selectors.
- Document accelerator handling (`Ctrl+S`, `CmdOrCtrl+Z`) and platform nuances.
- Explain how the command bus integrates with backend services (token manager, fog controls, macro engine).
- Provide UX guidelines for localization, accessibility (keyboard navigation, ARIA roles), and performance budgets (≤16 ms render, ≤1 ms menu open).

### Next Steps for Docs Team
1. Create subsystem walkthroughs that connect menu commands to their underlying services/modules.
2. Capture guard logic matrices showing which state combinations enable or disable each menu entry.
3. Define testing procedures for parity verification against the legacy Swing client.
4. Add illustrative UI screenshots once the React demo is styled to match production.

---

By incorporating these assets into the roadmap, the documentation team can prioritize deep dives on MTScript compatibility and menu/command parity while reusing the existing TypeScript scaffolding as live examples.
