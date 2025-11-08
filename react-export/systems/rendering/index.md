# Rendering System

ZoneRenderer owns view model, selection model, overlay stack, and drawable renderers; convert into CanvasView orchestrating layer renderers and caches.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L84-L181】

```tsx
function CanvasView(){renderLayers();renderOverlays();}
```

Grid, halo, token, light, darkness, lumens, fog, and debug renderers execute sequentially with DebounceExecutor gating repaint cadence.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L103-L105】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L883-L1049】

FogRenderer buffers hard/soft fog, clears visible area, and outlines boundaries with dynamic opacity; port to composited canvas layers.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L33-L104】

Noise toggles, mini-map snapshots, and selectionSetMap drive auxiliary buffers for tokens under mouse and path previews; maintain as memoized textures.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L86-L240】

See the [Zone layer contract](../../specs/zone.md#layer-responsibilities-map) for the data flags that feed each rendering phase.

## Layer breakdown

### Grid pass
- **Inputs**: Uses `zoneView` visibility and the active grid instance to compute cell outlines before drawing coordinates.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L860-L944】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1028-L1035】
- **Draw order**: Renders after background/object drawables but before stamp tokens so that terrain art sits below the grid while stamps appear above it.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L883-L944】
- **Toggles**: Subject to player/GM visibility through `shouldRenderLayer` and coordinates drawing, matching the `showGrid` contract flag.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L786-L808】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1028-L1035】

### Lighting stack
- **Inputs**: Consumes the token vision-derived `PlayerView`, `ZoneView`, and `Zone` lighting definitions via `lightsRenderer`, `lumensRenderer`, and `darknessRenderer`.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L172-L180】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L919-L930】
- **Draw order**: Executes immediately after object-layer stamps and before token overlays so that illumination masks blend under fog and post-token overlays.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L910-L987】
- **Toggles**: Skips when token layer visibility is disabled, mirroring the `lightPasses` flag that combines light, darkness, and aura passes.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L786-L808】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L919-L930】

### Halo overlays
- **Inputs**: Operates per token inside `renderTokens`, using halo renderer caches keyed by token position and AppState halo preferences.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L172-L181】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1760-L1825】
- **Draw order**: Runs before the final token image draw so glow effects composite beneath label overlays but above aura fills.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1760-L1825】
- **Toggles**: Guarded by `AppState.isShowTokenHalos()` while still respecting layer visibility, mapping to the `enableHalos` flag.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L786-L808】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1760-L1825】

### Vision and fog overlays
- **Inputs**: `fogRenderer` and `visionOverlayRenderer` consume the updated `viewModel` and `ZoneView` caches to draw FoW, VBL, and mouse-hover overlays.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L786-L808】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L986-L1049】
- **Draw order**: Fog renders after token overlays, followed by re-rendered always-visible tokens and vision overlays to keep silhouettes visible through fog.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L986-L1049】
- **Toggles**: Bound to zone fog settings (`Zone.hasFog`) and the `lightPasses`/vision flags exposed in the data spec.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L986-L1049】【F:src/main/java/net/rptools/maptool/model/Zone.java†L817-L933】

### Debug and auxiliary overlays
- **Inputs**: Overlay list items, light-source icons, and debug shapes pull from `overlayList`, `AppState`, and cached geometry populated earlier in the frame.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L86-L240】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1018-L1049】
- **Draw order**: Paints after fog and vision to avoid obstructing gameplay, with coordinate rendering preceding optional debug wireframes.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1018-L1049】
- **Toggles**: Controlled through overlay registration, GM-only light-source toggles, and debug instrumentation matching optional spec flags.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1036-L1049】
