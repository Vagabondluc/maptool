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

## Acceptance Tables (see `tests/rendering.spec.ts`)

### Grid Alignment
| Scenario | Given | Expectation | LayerResponsibilities reference |
| --- | --- | --- | --- |
| Snap-to-scale grid | `viewModel.layers` injects a mock grid renderer that reads `zone.scale = 1.25` | Recorded draw calls align canvas transforms to scaled unit grid | `LayerResponsibilities.grid.rendererCalls` drive verification of grid and coordinate passes.【F:react-export/specs/zone.md†L32-L52】 |
| Coordinate overlay toggled | `LayerResponsibilities.grid.showGrid` flag flipped off in fixture | Debug capture shows no `gridRenderer.renderCoordinates` marker for the frame | `LayerResponsibilities.grid.showGrid` documents toggle gating draw markers.【F:react-export/specs/zone.md†L32-L52】 |

### Halo Visibility Toggles
| Scenario | Given | Expectation | LayerResponsibilities reference |
| --- | --- | --- | --- |
| Halos enabled | Mocked `viewModel.layers` includes halo renderer while `enableHalos = true` | Frame debug log records `haloRenderer.renderHalos` before token compositing | `LayerResponsibilities.halos.rendererCalls` enumerates the halo pass order.【F:react-export/specs/zone.md†L53-L66】 |
| Halos suppressed | `enableHalos = false` via deterministic fixture | No halo debug marker and draw order skips halo renderer | `LayerResponsibilities.halos.enableHalos` guides expectation for toggle coverage.【F:react-export/specs/zone.md†L53-L66】 |

### Layered Light Composition
| Scenario | Given | Expectation | LayerResponsibilities reference |
| --- | --- | --- | --- |
| Full lighting stack | Mock lighting view model seeds lights, lumens, auras, darkness arrays | Captured draw order logs four passes in `lights → lumens → auras → darkness` sequence | `LayerResponsibilities.lighting.rendererCalls` lists the composed order to assert.【F:react-export/specs/zone.md†L33-L65】 |
| Darkness only | Fixture empties light/auras arrays and toggles darkness true | Debug markers show only `darknessRenderer.render` before fog blend | `LayerResponsibilities.lighting.lightPasses` constrains which passes should execute.【F:react-export/specs/zone.md†L33-L65】 |

## Deterministic Test Hooks
- Mocked `viewModel` objects feed `RenderingDemo` layers array so each pass emits labelled renderers into the shared `frameDebugBus`, enabling assertions on draw order markers and FPS cadence.【F:react-export/examples/rendering-demo.tsx†L5-L47】【F:react-export/tests/rendering.spec.ts†L1-L19】
- Tests subscribe to the `frameDebugBus` and flip `LayerResponsibilities` flags in fixtures to guarantee deterministic pass visibility and marker emission per scenario above.【F:react-export/examples/rendering-demo.tsx†L5-L47】【F:react-export/specs/zone.md†L32-L66】

## Fixture Sources
- `examples/rendering-demo.tsx` exposes the frame scheduler stub and bus used across alignment and halo acceptance checks.【F:react-export/examples/rendering-demo.tsx†L1-L47】
- `examples/fog-pipeline.tsx` provides a canvas fixture for fog/vision blending that layers on top of lighting assertions when extending composition suites.【F:react-export/examples/fog-pipeline.tsx†L1-L48】
- `specs/zone.md` and `specs/fog.md` codify the `LayerResponsibilities` map and fog contract referenced by the acceptance tables, keeping test toggles synchronized with spec updates.【F:react-export/specs/zone.md†L32-L67】【F:react-export/specs/fog.md†L1-L32】
