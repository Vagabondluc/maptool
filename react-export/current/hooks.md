# Hooks

## useCanvasInteractions.ts
Replicate ZoneRenderer focus + mouse tracking by wiring pointer updates and focus requests on mouse events.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L197-L215】

```ts
export function useCanvasInteractions(ref){/* bind mousemove -> setPoint */}
```

## useZoomScale.ts
Expose Scale listeners that invalidate caches and dispatch repaint debouncer when zoom changes.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L271-L287】

## useFrameRateCap.ts
Allow runtime control of repaint throttling mirroring setFrameRateCap delegating to DebounceExecutor delay tweaks.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L219-L221】【F:src/main/java/net/rptools/maptool/client/DebounceExecutor.java†L73-L108】
