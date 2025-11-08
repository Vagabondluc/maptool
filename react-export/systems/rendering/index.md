# Rendering System

ZoneRenderer owns view model, selection model, overlay stack, and drawable renderers; convert into CanvasView orchestrating layer renderers and caches.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L84-L169】

```tsx
function CanvasView(){renderLayers();renderOverlays();}
```

Grid, halo, token, light, darkness, lumens, fog, and debug renderers execute sequentially with DebounceExecutor gating repaint cadence.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L103-L221】

FogRenderer buffers hard/soft fog, clears visible area, and outlines boundaries with dynamic opacity; port to composited canvas layers.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L33-L104】

Noise toggles, mini-map snapshots, and selectionSetMap drive auxiliary buffers for tokens under mouse and path previews; maintain as memoized textures.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L86-L240】
