# Token Specification

## Data Contract
```ts
export interface TokenModel {
  id: string;
  name: string;
  type: "PC" | "NPC";
  shape: "TOP_DOWN" | "CIRCLE" | "SQUARE" | "FIGURE";
  layer: string;
  position: { x: number; y: number };
  facing: number;
  snapToGrid: boolean;
  bars: Record<string, number>;
  macros: MacroBinding[];
}
```
- Fields map to Token enums/types, including type, shape, and layer settings.【F:src/main/java/net/rptools/maptool/model/Token.java†L131-L200】
- Position/facing align with update enumerations for deterministic network merges.【F:src/main/java/net/rptools/maptool/model/Token.java†L166-L200】

```ts
export interface MacroBinding {
  id: string;
  label: string;
  command: string;
  color?: string;
}
```
- Macro bindings correspond to token macro storage persisted alongside campaign macros.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L71-L188】

## Events
- `token:updated` event carries `{ id, updateType, payload }` mirroring update enum semantics.【F:src/main/java/net/rptools/maptool/model/Token.java†L166-L200】
- `token:selection-changed` ties into selection model transitions for UI focus.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L129-L200】

## Persistence Rules
- Tokens embedded within zone exports maintain GUID identity and macro metadata.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L161-L188】
