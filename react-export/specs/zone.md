# Zone Specification

## Data Contract
```ts
export interface ZoneModel {
  id: string;
  name: string;
  hasFog: boolean;
  visionType: "DAY" | "NIGHT" | "OFF";
  gridSize: number;
  unitsPerCell: number;
  scale: number;
  layers: Record<string, LayerSettings>;
}
```
- `hasFog` mirrors `Zone.hasFog()` flag controlling fog renderer eligibility.【F:src/main/java/net/rptools/maptool/model/Zone.java†L817-L933】
- `visionType` maps to zone vision configuration driving lighting overlays.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L135-L145】

```ts
export interface LayerSettings {
  visible: boolean;
  opacity: number;
  locked: boolean;
}
```
- Layer visibility toggles correspond to disabledLayers and player visibility checks.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L786-L808】

See the [rendering layer breakdown](../systems/rendering/index.md#layer-breakdown) for narrative details on the pipeline order.

## Layer Responsibilities Map
```ts
export const LayerResponsibilities = {
  grid: {
    showGrid: true,
    rendererCalls: ["gridRenderer.renderGrid", "gridRenderer.renderCoordinates"],
    linkedDocs: "../systems/rendering/index.md#grid-pass",
  },
  lighting: {
    lightPasses: { lights: true, darkness: true, auras: true },
    rendererCalls: [
      "lightsRenderer.renderLights",
      "lumensRenderer.render",
      "lightsRenderer.renderAuras",
      "darknessRenderer.render",
    ],
    linkedDocs: "../systems/rendering/index.md#lighting-stack",
  },
  halos: {
    enableHalos: true,
    rendererCalls: ["haloRenderer.renderHalos"],
    linkedDocs: "../systems/rendering/index.md#halo-overlays",
  },
  visionAndFog: {
    fogEnabled: "hasFog",
    rendererCalls: ["fogRenderer.render", "visionOverlayRenderer.render"],
    linkedDocs: "../systems/rendering/index.md#vision-and-fog-overlays",
  },
  overlays: {
    overlayStack: true,
    rendererCalls: ["overlay.paintOverlay", "gridRenderer.renderCoordinates", "debugRenderer.renderShapes"],
    linkedDocs: "../systems/rendering/index.md#debug-and-auxiliary-overlays",
  },
} as const satisfies Record<string, {
  rendererCalls: readonly string[];
  linkedDocs: string;
  [flag: string]: unknown;
}>;
```
- `showGrid` flag drives `gridRenderer.renderGrid` and `renderCoordinates` calls when layer visibility permits.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L883-L944】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1028-L1035】
- `lightPasses` bundle covers light, lumens, aura, and darkness calls executed under token-layer visibility checks.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L786-L808】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L919-L930】
- `enableHalos` aligns with `AppState.isShowTokenHalos()` gating halo rendering within `renderTokens`.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1760-L1825】
- `fogEnabled` ties to zone fog state before invoking fog and vision overlays.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L986-L1049】【F:src/main/java/net/rptools/maptool/model/Zone.java†L817-L933】
- `overlayStack` captures optional overlays, coordinate ticks, and debug shapes painted after fog.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L1018-L1049】

## Events
- `zone:activated` payload: `{ zoneId: string }` when new renderer mounts.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1668-L1706】
- `zone:deactivated` includes previous zone for cleanup.
- `zone:fog-updated` triggered when fog pipeline flushes or edits occur.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】

## Persistence
- Stored in Campaign export with GUID key matching `Campaign.zones` map order.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L41-L188】
