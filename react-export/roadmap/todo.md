# TODO

| Task | Dependency Modules (see `schema.md`) | Status | Target Release | Notes |
| --- | --- | --- | --- | --- |
| Detail rendering layer responsibilities (grid, halo, lights) by extracting renderer-specific behaviors from ZoneRenderer source.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L100-L221】 | Canvas pipeline → ZoneRenderer | Not Started | Phase 1 | Requires aligning with rendering test matrix once drafted. |
| Document asset pipeline handshake including AssetTransferManager usage from server side.【F:src/main/java/net/rptools/maptool/server/MapToolServer.java†L83-L190】 | Networking layer → MapToolServer | Not Started | Phase 2 | Pair with connection payload examples for full flow. |
| Map preference keys to React settings panels, covering fog/lighting/chat toggles for configurable UI.【F:src/main/java/net/rptools/maptool/client/AppPreferences.java†L30-L188】 | Token/Chat services + Preferences | In Progress | Phase 2 | Waiting on settings schema export from docs. |
| Outline macro execution stack including parser errors and recursion guard semantics.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L34-L170】 | Macro runtime ↔ Chat integration | Not Started | Phase 3 | Reference new macro runtime kit in specs. |
