# State Stores

## zoneStore.ts
Mirror ZoneRenderer state buckets: view model, selection model, active layer, zoom scale, and caches for label rendering.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L84-L121】

```ts
const zoneStore={activeLayer:"TOKEN",scale:1,selections:new Map()};
```

Persist disabled layers and move queues to keep parity with selectionSetMap + showPathList for multiplayer previews.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L103-L240】

## frameStore.ts
Track zoneRendererList, currentRenderer, status message, and progress flags similar to frame fields.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L169-L175】【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1513-L1705】
