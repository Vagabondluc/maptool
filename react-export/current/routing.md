# Routing & Workspace

Zone switching posts ZoneLoading/Activated events, flushes caches, reattaches renderer component, and retitles window; treat as workspace router keyed by zone id.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1730】

```ts
function useZoneRouter(){return {current,select:setCurrentRenderer}};
```

MiniMap + selection panels follow current renderer state to update initiative and zoom widgets, mirroring swing callbacks.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1682-L1706】【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1546-L1556】
