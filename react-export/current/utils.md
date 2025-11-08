# Utilities

## debounce.ts
Wrap DebounceExecutor semantics: scheduled single-thread timer, delay setter, dispatch swallowing redundant calls.【F:src/main/java/net/rptools/maptool/client/DebounceExecutor.java†L34-L108】

```ts
export function createDebouncer(delay,fn){/* mirror atomic timer */}
```

## assetCache.ts
Expose helpers that flush cached images when zones swap, echoing ImageManager flush during renderer changes.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1659-L1670】

## labelCache.ts
Model labelRenderingCache invalidation hooks to rebuild buffered images per token update.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L103-L112】
