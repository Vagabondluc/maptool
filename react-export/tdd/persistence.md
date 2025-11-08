# Persistence Design

## Storage Targets
- **CampaignStore** — Dexie database keyed by campaign GUID, storing serialized zones, macro button props, fog flags, and landing map metadata.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L41-L188】
- **AssetCache** — IndexedDB store referencing asset MD5 keys to mirror ImageManager expectations.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1704】

## Zone Document
```
interface StoredZone {
  id: string;
  name: string;
  hasFog: boolean;
  visionType: string;
  tokenIds: string[];
}
```
- `hasFog` and per-vision data derived from Zone flags and visibility calculations.【F:src/main/java/net/rptools/maptool/model/Zone.java†L817-L933】
- Token ordering persists to maintain initiative sync with selection sets.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L129-L180】

## Macro Persistence
- Macro aliases stored per scope (client/campaign/addon) with metadata for import/export parity.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L57-L145】
- Campaign exports bundle macro button arrays and counters; Dexie tables replicate index tracking for deterministic layouts.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L71-L189】

## Migration Strategy
- Import path reads legacy ZIPs, transforms protobuf DTOs into JSON records aligning with React schema.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L161-L188】
- Version table logs migrations for fog opacity tweaks and token schema additions.
