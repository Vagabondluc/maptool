# Fog of War

FogRenderer composites fog paint, soft overlays, and clear regions using buffered render helper; replicate via offscreen canvas pipeline.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L33-L104】

```ts
function renderFog(ctx,view){fillHard();applySoft();clearVisible();outline();}
```

ZoneView visibility supplies softFogArea/clearArea, while GM view toggles opacity; mirror with memoized geometry + GM overrides.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L54-L104】

Exposure updates triggered by selection + movement feed from ZoneRenderer showPathList and event bus posts; integrate with zone store listeners.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L231-L305】
