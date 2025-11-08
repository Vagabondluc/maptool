# Runtime Behavior

Repaint throttling depends on DebounceExecutor scheduling to merge rapid updates; mirror via requestAnimationFrame scheduler with adjustable delay.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L219-L305】【F:src/main/java/net/rptools/maptool/client/DebounceExecutor.java†L34-L108】

Profiling uses CodeTimer stacks gated by AppState flag and posts results to profiling frame; provide dev-only timers logging to console/panel.【F:src/main/java/net/rptools/lib/CodeTimer.java†L28-L158】

Event bus posts ZoneLoading/Activated and chat typing notifications to coordinate UI updates; replicate with typed mitt channels and suspense-friendly React context.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1706】【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L309-L347】
