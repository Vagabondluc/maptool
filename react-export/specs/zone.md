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
- Layer visibility toggles correspond to disabledLayers and player visibility checks.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L134-L170】

## Events
- `zone:activated` payload: `{ zoneId: string }` when new renderer mounts.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1668-L1706】
- `zone:deactivated` includes previous zone for cleanup.
- `zone:fog-updated` triggered when fog pipeline flushes or edits occur.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】

## Persistence
- Stored in Campaign export with GUID key matching `Campaign.zones` map order.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L41-L188】
