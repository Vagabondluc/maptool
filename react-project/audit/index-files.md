# React Export Project File Audit

This audit captures every document and code sample living under `react-export/` and explains what guidance or implementation slice it provides for the MapTool React export initiative. Each entry pairs a natural-language summary with a small TypeScript literal that encodes the intent of the file.

```ts
type FileSynopsis = {
  path: string;
  focus: string;
  deliverables: string[];
};
```

## Current Architecture Guides

### react-export/current/app.md
Outlines how the application shell is composed, covering layout slots, providers, and lifecycle glue for the React export front end.
```ts
const currentAppMd: FileSynopsis = {
  path: "react-export/current/app.md",
  focus: "Application shell structure and lifecycle hooks",
  deliverables: ["layout blueprint", "provider stacking order", "boot sequence notes"],
};
```

### react-export/current/components.md
Describes shared component families, styling conventions, and the expected props contracts for reusable UI elements.
```ts
const currentComponentsMd: FileSynopsis = {
  path: "react-export/current/components.md",
  focus: "Reusable component catalog with styling guidance",
  deliverables: ["component families", "props contract guidance", "styling conventions"],
};
```

### react-export/current/hooks.md
Documents custom hooks, their responsibilities, and how they integrate with external services or state stores.
```ts
const currentHooksMd: FileSynopsis = {
  path: "react-export/current/hooks.md",
  focus: "Custom React hooks inventory",
  deliverables: ["hook responsibilities", "usage patterns", "integration notes"],
};
```

### react-export/current/index.md
Provides the high-level entry point overview, including environment bootstrapping, routing handshake, and feature toggles.
```ts
const currentIndexMd: FileSynopsis = {
  path: "react-export/current/index.md",
  focus: "Application entrypoint responsibilities",
  deliverables: ["bootstrap steps", "feature toggle list", "startup dependencies"],
};
```

### react-export/current/routing.md
Explains the client-side routing map, guard rules, and deep-link handling for the exported React app.
```ts
const currentRoutingMd: FileSynopsis = {
  path: "react-export/current/routing.md",
  focus: "Routing topology and guards",
  deliverables: ["route tree", "navigation guards", "deep-link strategies"],
};
```

### react-export/current/schemas.md
Details shared schema definitions used across the documentation, including interfaces and validation expectations.
```ts
const currentSchemasMd: FileSynopsis = {
  path: "react-export/current/schemas.md",
  focus: "Domain schema catalog",
  deliverables: ["data model descriptions", "validation notes", "cross-module references"],
};
```

### react-export/current/services.md
Catalogs service modules, data flow boundaries, and how network or persistence layers are accessed from React.
```ts
const currentServicesMd: FileSynopsis = {
  path: "react-export/current/services.md",
  focus: "Service layer responsibilities",
  deliverables: ["service catalogue", "I/O boundaries", "integration pipelines"],
};
```

### react-export/current/stores.md
Defines the approach for managing state, covering store shapes, update patterns, and interop between stores and hooks.
```ts
const currentStoresMd: FileSynopsis = {
  path: "react-export/current/stores.md",
  focus: "State store organization",
  deliverables: ["store taxonomy", "update flows", "coordination notes"],
};
```

### react-export/current/tailwind.md
Summarizes Tailwind usage guidelines, including configuration knobs and utility class recipes shared in the project.
```ts
const currentTailwindMd: FileSynopsis = {
  path: "react-export/current/tailwind.md",
  focus: "Tailwind CSS strategy",
  deliverables: ["config expectations", "utility class recipes", "styling guardrails"],
};
```

### react-export/current/types.md
Lists TypeScript type strategy, strictness goals, and shared typing helpers to maintain consistency.
```ts
const currentTypesMd: FileSynopsis = {
  path: "react-export/current/types.md",
  focus: "TypeScript posture",
  deliverables: ["strictness goals", "shared helper types", "linting expectations"],
};
```

### react-export/current/utils.md
Outlines utility helpers, cross-cutting helper functions, and how they are organized for reuse.
```ts
const currentUtilsMd: FileSynopsis = {
  path: "react-export/current/utils.md",
  focus: "Utility helper catalogue",
  deliverables: ["helper groupings", "reusability guidance", "extension notes"],
};
```

## Systems Blueprints

### react-export/systems/chat/index.md
Describes the chat subsystem, including rendering pipeline, command parsing, and extensibility points.
```ts
const systemsChatIndexMd: FileSynopsis = {
  path: "react-export/systems/chat/index.md",
  focus: "Chat subsystem specification",
  deliverables: ["rendering pipeline", "command parsing steps", "extension hooks"],
};
```

### react-export/systems/fog/index.md
Maps the fog-of-war system, its rendering heuristics, and integration with token vision.
```ts
const systemsFogIndexMd: FileSynopsis = {
  path: "react-export/systems/fog/index.md",
  focus: "Fog-of-war system design",
  deliverables: ["visibility algorithm", "token vision linkage", "performance considerations"],
};
```

### react-export/systems/networking/index.md
Explains the networking layer, session synchronization, and protocol expectations.
```ts
const systemsNetworkingIndexMd: FileSynopsis = {
  path: "react-export/systems/networking/index.md",
  focus: "Networking architecture",
  deliverables: ["session sync strategy", "protocol mapping", "resilience tactics"],
};
```

### react-export/systems/rendering/index.md
Details the rendering stack, canvas usage, layering, and performance tricks for large maps.
```ts
const systemsRenderingIndexMd: FileSynopsis = {
  path: "react-export/systems/rendering/index.md",
  focus: "Rendering stack blueprint",
  deliverables: ["canvas layering", "performance tactics", "render loop flow"],
};
```

### react-export/systems/scripting/index.md
Defines the scripting integration, macro execution model, and security considerations.
```ts
const systemsScriptingIndexMd: FileSynopsis = {
  path: "react-export/systems/scripting/index.md",
  focus: "Scripting bridge design",
  deliverables: ["macro execution model", "security posture", "extensibility notes"],
};
```

### react-export/systems/tokens/index.md
Covers token lifecycle, state synchronization, and UI affordances for manipulation.
```ts
const systemsTokensIndexMd: FileSynopsis = {
  path: "react-export/systems/tokens/index.md",
  focus: "Token system design",
  deliverables: ["lifecycle steps", "state sync", "UI affordances"],
};
```

### react-export/systems/ui/index.md
Summarizes the UI shell, layout regions, and accessibility goals across the interface.
```ts
const systemsUiIndexMd: FileSynopsis = {
  path: "react-export/systems/ui/index.md",
  focus: "UI shell overview",
  deliverables: ["layout regions", "accessibility goals", "interaction guidelines"],
};
```

## Specifications

### react-export/specs/chat.md
Provides the chat domain specification, message schemas, and formatting rules required for parity.
```ts
const specsChatMd: FileSynopsis = {
  path: "react-export/specs/chat.md",
  focus: "Chat domain specification",
  deliverables: ["message schema", "formatting rules", "parity requirements"],
};
```

### react-export/specs/connection.md
Defines connection lifecycle, including handshake sequences and heartbeat expectations.
```ts
const specsConnectionMd: FileSynopsis = {
  path: "react-export/specs/connection.md",
  focus: "Connection lifecycle spec",
  deliverables: ["handshake sequences", "heartbeat timing", "error handling"],
};
```

### react-export/specs/fog.md
Specifies fog rendering, data structures, and API endpoints needed for the front-end to operate.
```ts
const specsFogMd: FileSynopsis = {
  path: "react-export/specs/fog.md",
  focus: "Fog API specification",
  deliverables: ["data structures", "rendering rules", "API requirements"],
};
```

### react-export/specs/macro.md
Documents macro language goals, integration checkpoints, and references to grammar/runtime assets.
```ts
const specsMacroMd: FileSynopsis = {
  path: "react-export/specs/macro.md",
  focus: "Macro language objectives",
  deliverables: ["language scope", "runtime integration", "reference assets"],
};
```

### react-export/specs/token.md
Outlines token data model, synchronization methods, and editing affordances.
```ts
const specsTokenMd: FileSynopsis = {
  path: "react-export/specs/token.md",
  focus: "Token specification",
  deliverables: ["data model", "sync rules", "editing affordances"],
};
```

### react-export/specs/zone.md
Details zone (map) structure, layering, and serialization expectations.
```ts
const specsZoneMd: FileSynopsis = {
  path: "react-export/specs/zone.md",
  focus: "Zone structure spec",
  deliverables: ["layering", "serialization", "performance notes"],
};
```

## Product Requirement Documents

### react-export/prd/overview.md
Summarizes the product vision, key personas, and success metrics for the React export initiative.
```ts
const prdOverviewMd: FileSynopsis = {
  path: "react-export/prd/overview.md",
  focus: "Product vision overview",
  deliverables: ["personas", "success metrics", "vision statement"],
};
```

### react-export/prd/functional-matrix.md
Maps features to user roles, highlighting coverage and dependencies between modules.
```ts
const prdFunctionalMatrixMd: FileSynopsis = {
  path: "react-export/prd/functional-matrix.md",
  focus: "Feature-to-role matrix",
  deliverables: ["role coverage", "dependency mapping", "gap highlights"],
};
```

### react-export/prd/non-functional.md
Enumerates non-functional requirements like performance, reliability, and security baselines.
```ts
const prdNonFunctionalMd: FileSynopsis = {
  path: "react-export/prd/non-functional.md",
  focus: "Non-functional requirements",
  deliverables: ["performance targets", "reliability goals", "security needs"],
};
```

### react-export/prd/user-stories.md
Lists user stories across personas with acceptance criteria to drive backlog planning.
```ts
const prdUserStoriesMd: FileSynopsis = {
  path: "react-export/prd/user-stories.md",
  focus: "User stories and acceptance criteria",
  deliverables: ["persona stories", "acceptance clauses", "backlog seeds"],
};
```

### react-export/prd/acceptance-criteria.md
Consolidates acceptance tests and success conditions tied to major epics.
```ts
const prdAcceptanceCriteriaMd: FileSynopsis = {
  path: "react-export/prd/acceptance-criteria.md",
  focus: "Acceptance test catalogue",
  deliverables: ["epic success conditions", "test checkpoints", "validation notes"],
};
```

## Infrastructure Notes

### react-export/infrastructure/environment.md
Sets expectations for local, staging, and production environments plus tooling prerequisites.
```ts
const infrastructureEnvironmentMd: FileSynopsis = {
  path: "react-export/infrastructure/environment.md",
  focus: "Environment prerequisites",
  deliverables: ["environment tiers", "tooling requirements", "configuration notes"],
};
```

### react-export/infrastructure/frontend.md
Explains the front-end build pipeline, asset strategy, and deployment workflow.
```ts
const infrastructureFrontendMd: FileSynopsis = {
  path: "react-export/infrastructure/frontend.md",
  focus: "Frontend infrastructure",
  deliverables: ["build pipeline", "asset strategy", "deployment workflow"],
};
```

### react-export/infrastructure/backend.md
Covers backend services required to support the export, including APIs and hosting considerations.
```ts
const infrastructureBackendMd: FileSynopsis = {
  path: "react-export/infrastructure/backend.md",
  focus: "Backend service landscape",
  deliverables: ["service catalogue", "API dependencies", "hosting notes"],
};
```

### react-export/infrastructure/runtime.md
Describes runtime operations, monitoring hooks, and recovery procedures.
```ts
const infrastructureRuntimeMd: FileSynopsis = {
  path: "react-export/infrastructure/runtime.md",
  focus: "Runtime operations",
  deliverables: ["monitoring hooks", "incident response", "recovery procedures"],
};
```

### react-export/infrastructure/testing.md
Details testing infrastructure, automation tools, and coverage goals.
```ts
const infrastructureTestingMd: FileSynopsis = {
  path: "react-export/infrastructure/testing.md",
  focus: "Testing infrastructure",
  deliverables: ["automation tools", "coverage targets", "CI expectations"],
};
```

## TDD Playbooks

### react-export/tdd/architecture.md
Gives test-driven development guidance for architecture-level decisions and scaffolding.
```ts
const tddArchitectureMd: FileSynopsis = {
  path: "react-export/tdd/architecture.md",
  focus: "Architecture TDD guidance",
  deliverables: ["scaffolding sequence", "test focus", "design checkpoints"],
};
```

### react-export/tdd/networking.md
Explains how to apply TDD to networking components, covering mocks and integration suites.
```ts
const tddNetworkingMd: FileSynopsis = {
  path: "react-export/tdd/networking.md",
  focus: "Networking TDD guide",
  deliverables: ["mock strategies", "integration suites", "failure scenarios"],
};
```

### react-export/tdd/persistence.md
Describes persistence-focused TDD tactics, including database fixtures and migration checks.
```ts
const tddPersistenceMd: FileSynopsis = {
  path: "react-export/tdd/persistence.md",
  focus: "Persistence TDD guidance",
  deliverables: ["fixture planning", "migration checks", "data integrity tests"],
};
```

### react-export/tdd/rendering.md
Covers rendering-layer TDD, snapshot strategies, and performance regression testing.
```ts
const tddRenderingMd: FileSynopsis = {
  path: "react-export/tdd/rendering.md",
  focus: "Rendering TDD guidance",
  deliverables: ["snapshot strategy", "performance regression plan", "visual diff tooling"],
};
```

### react-export/tdd/ux-interaction.md
Guides interaction-focused TDD, including accessibility assertions and input permutations.
```ts
const tddUxInteractionMd: FileSynopsis = {
  path: "react-export/tdd/ux-interaction.md",
  focus: "UX interaction TDD",
  deliverables: ["accessibility assertions", "input permutations", "usability probes"],
};
```

## Examples

### react-export/examples/chat-macro.tsx
Shows how to embed macro evaluation into a chat panel, wiring commands to UI.
```ts
const examplesChatMacroTsx: FileSynopsis = {
  path: "react-export/examples/chat-macro.tsx",
  focus: "Chat macro UI example",
  deliverables: ["macro wiring", "chat panel scaffold", "interaction flow"],
};
```

### react-export/examples/fog-pipeline.tsx
Demonstrates fog rendering pipeline stages and how state feeds into drawing layers.
```ts
const examplesFogPipelineTsx: FileSynopsis = {
  path: "react-export/examples/fog-pipeline.tsx",
  focus: "Fog rendering example",
  deliverables: ["pipeline stages", "state inputs", "render layering"],
};
```

### react-export/examples/rendering-demo.tsx
Offers a miniature map renderer illustrating layer composition and performance optimizations.
```ts
const examplesRenderingDemoTsx: FileSynopsis = {
  path: "react-export/examples/rendering-demo.tsx",
  focus: "Rendering demonstration",
  deliverables: ["layer composition", "performance techniques", "interaction hooks"],
};
```

### react-export/examples/token-selection.tsx
Walks through token selection mechanics, including marquee selection and inspector updates.
```ts
const examplesTokenSelectionTsx: FileSynopsis = {
  path: "react-export/examples/token-selection.tsx",
  focus: "Token selection example",
  deliverables: ["marquee logic", "selection state", "inspector linkage"],
};
```

### react-export/examples/websocket-bridge.ts
Illustrates a websocket bridge for synchronizing state between the client and server.
```ts
const examplesWebsocketBridgeTs: FileSynopsis = {
  path: "react-export/examples/websocket-bridge.ts",
  focus: "Websocket bridge example",
  deliverables: ["connection lifecycle", "message routing", "error handling"],
};
```

## Tests

### react-export/tests/chat.spec.ts
Defines unit tests for chat message formatting and command execution paths.
```ts
const testsChatSpecTs: FileSynopsis = {
  path: "react-export/tests/chat.spec.ts",
  focus: "Chat subsystem tests",
  deliverables: ["formatting assertions", "command execution tests", "error handling coverage"],
};
```

### react-export/tests/fog.spec.ts
Contains tests verifying fog rendering calculations and state transitions.
```ts
const testsFogSpecTs: FileSynopsis = {
  path: "react-export/tests/fog.spec.ts",
  focus: "Fog system tests",
  deliverables: ["visibility calculations", "state transition checks", "performance guards"],
};
```

### react-export/tests/macro.spec.ts
Covers macro evaluation behavior, including parsing, execution, and error handling.
```ts
const testsMacroSpecTs: FileSynopsis = {
  path: "react-export/tests/macro.spec.ts",
  focus: "Macro system tests",
  deliverables: ["parsing cases", "execution scenarios", "error assertions"],
};
```

### react-export/tests/rendering.spec.ts
Tests rendering pipeline integration and ensures layer ordering remains stable.
```ts
const testsRenderingSpecTs: FileSynopsis = {
  path: "react-export/tests/rendering.spec.ts",
  focus: "Rendering pipeline tests",
  deliverables: ["integration checks", "layer ordering", "performance thresholds"],
};
```

## Roadmap Assets

### react-export/roadmap/decisions.md
Captures architectural decisions, trade-offs, and their rationale for posterity.
```ts
const roadmapDecisionsMd: FileSynopsis = {
  path: "react-export/roadmap/decisions.md",
  focus: "Decision log",
  deliverables: ["architectural trade-offs", "rationale", "status tracking"],
};
```

### react-export/roadmap/index.md
Acts as the index into roadmap documents, pointing to instructions, schema, and todo artifacts.
```ts
const roadmapIndexMd: FileSynopsis = {
  path: "react-export/roadmap/index.md",
  focus: "Roadmap entry point",
  deliverables: ["document links", "navigation hints", "context summary"],
};
```

### react-export/roadmap/project-instructions.md
Aggregates project instructions, referencing macro and menu guidance for the docs team.
```ts
const roadmapProjectInstructionsMd: FileSynopsis = {
  path: "react-export/roadmap/project-instructions.md",
  focus: "Documentation project instructions",
  deliverables: ["macro roadmap", "menu roadmap", "documentation guidance"],
};
```

### react-export/roadmap/schema.md
Defines roadmap metadata schema so updates remain structured and machine readable.
```ts
const roadmapSchemaMd: FileSynopsis = {
  path: "react-export/roadmap/schema.md",
  focus: "Roadmap metadata schema",
  deliverables: ["field definitions", "validation rules", "usage examples"],
};
```

### react-export/roadmap/todo.md
Lists high-level roadmap todos for maintaining documentation coverage.
```ts
const roadmapTodoMd: FileSynopsis = {
  path: "react-export/roadmap/todo.md",
  focus: "Roadmap task list",
  deliverables: ["maintenance tasks", "documentation gaps", "prioritization cues"],
};
```

## Summary

The React export documentation set is covered end-to-end: current architecture primers, subsystem specs, PRDs, infrastructure guides, TDD playbooks, runnable examples, validation tests, and roadmap assets. The TypeScript literals above double as structured metadata should you need to ingest this audit programmatically.
