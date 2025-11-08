# Rendering Design

## Layer Modules
| Layer | Source Behavior | React Strategy |
| --- | --- | --- |
| Grid | Renders scaled lines per zone scale and snap prefs.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L135-L179】 | Canvas2D module drawing batched paths using zone scale state.
| Token | Renders sprites, facing arrows, selection halos.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L135-L179】 | Pixi.js scene with texture atlas + selection overlay canvas.
| Lighting | Combines light, darkness, lumens, vision overlays.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L135-L145】 | Offscreen composition per light pass, merges to screen.
| Fog | Hard/soft masks, clear outlines.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】 | Offscreen canvas using `globalCompositeOperation` sequences.
| Overlay | Debug, measurements, cursors.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L137-L145】 | React DOM overlay using portals for accessibility.

## Frame Scheduling
- DebounceExecutor throttles repaint to `frameRateCap`; React uses `requestAnimationFrame` loop with configurable FPS guard.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L182-L200】
- Frame input state pulled from `ZoneViewModel` and `SelectionModel` analog stores.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L129-L176】

## Data Flow
```
zoneStore → viewModel → frameState
frameState → [GridLayer, TokenLayer, FogLayer, LightingLayer]
FogLayer → applyFog()
LightingLayer → blendLights()
```

## Asset Management
- Zone switch flushes ImageManager cache before mounting renderer, ensuring textures reload or reuse as needed.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1704】
- Texture noise toggles mirror noise filter flags for background tiles.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L86-L133】

## Diagnostics
- `CodeTimer` instrumentation mirrored by React dev tools logger capturing render phases (grid, fog, lighting).【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】

## Test Matrix (see `tests/rendering.spec.ts`)
| Scenario | Given | Expectation | Related Layer |
| --- | --- | --- | --- |
| Frame bus emits single event | `frameDebugBus.emit("frame", { frame: 1, timestamp: 16 })` | Subscriber counts exactly one emission (`testFrameBusEmission`) | Scheduler |
| Layer render order stable | Deterministic `viewModel.layers` array | Capture emitted frames and assert draw order via debug logs | Grid/Token/Fog |
| FPS clamp honored | `frameRateCap = 30` | Adjacent timestamps differ by ≥33ms in recorded events | Scheduler |

```ts
test("frame bus emits events", () => {
  testFrameBusEmission();
});
```
