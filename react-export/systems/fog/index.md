# Fog of War

FogRenderer composites fog paint, soft overlays, and clear regions using buffered render helper; replicate via offscreen canvas pipeline.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L33-L104】

```ts
function renderFog(ctx,view){fillHard();applySoft();clearVisible();outline();}
```

ZoneView visibility supplies softFogArea/clearArea, while GM view toggles opacity; mirror with memoized geometry + GM overrides.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L54-L104】

Exposure updates triggered by selection + movement feed from ZoneRenderer showPathList and event bus posts; integrate with zone store listeners.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L231-L305】

### React Pipeline Enhancements
- `examples/fog-pipeline.tsx` demonstrates precomputed `ImageBitmap` masks for hard/soft fog plus `Path2D` clear regions to minimize draw cost; reuse by caching bitmaps per zone load.
- Use `globalCompositeOperation = "destination-out"` then restore to `source-over` to mimic Swing clear operations while preserving WebGL fallbacks.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L64-L104】
- Apply `mix-blend-multiply` (see example canvas class) for dramatic overlays during GM previews without disturbing player viewports.

```ts
export function useFogPipeline(bus = fogBus) {
  useEffect(() => bus.on("update", drawFog), [bus]);
  return { emit: emitFogUpdate };
}
```
