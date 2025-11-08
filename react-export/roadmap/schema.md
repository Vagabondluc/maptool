# Module Relationships

Canvas pipeline consumes Zone schema (layers, topology) to configure ZoneRenderer overlays and FogRenderer composites.【F:src/main/java/net/rptools/maptool/model/Zone.java†L125-L320】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L84-L221】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L33-L104】

Token entities feed selection + impersonation flows across renderer and chat subsystems; maintain shared token service bridging CommandPanel + selection model.【F:src/main/java/net/rptools/maptool/model/Token.java†L73-L233】【F:src/main/java/net/rptools/maptool/client/ui/commandpanel/CommandPanel.java†L75-L189】

Networking layer syncs tokens/zones via MapToolConnection + MapToolServer, while macros + preferences define player behaviors; ensure consistent schemas for transport + storage.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L32-L115】【F:src/main/java/net/rptools/maptool/server/MapToolServer.java†L65-L190】【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L85-L170】【F:src/main/java/net/rptools/maptool/client/AppPreferences.java†L30-L188】
