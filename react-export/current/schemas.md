# Schemas

## ZoneSchema
Capture layer enums, topology modes, fog paint, and defaults mirroring Zone model constants for layers, A* rounding, and fog paint.【F:src/main/java/net/rptools/maptool/model/Zone.java†L125-L320】

```ts
export const ZoneSchema={layers:["TOKEN","GM","OBJECT","BACKGROUND"],fog:"color"};
```

## TokenSchema
Include GUID, ownership flags, shape/type enums, update operations, and asset refs to align with Token fields.【F:src/main/java/net/rptools/maptool/model/Token.java†L73-L233】

## VisionSchema
Reflect token sight toggles and zone visibility maps built by ZoneView/PlayerView interactions.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L84-L115】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】
