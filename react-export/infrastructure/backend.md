# Backend Infrastructure

MapToolServer boots Router, ServerMessageHandler, asset producer thread, and UPnP-aware connection factory while cloning campaign data for isolation; mirror with Node service exposing WebSocket hub + asset chunk streaming.【F:src/main/java/net/rptools/maptool/server/MapToolServer.java†L65-L126】

Player/session maps track connections, drive asset transfer managers, and release links on disconnect; port to shared Map of clientId→player metadata for RTC/WebSocket sync.【F:src/main/java/net/rptools/maptool/server/MapToolServer.java†L83-L190】

Asset chunk size defaults to 5KB; replicate streaming using fetch range slices + IndexedDB staging for offline caching.【F:src/main/java/net/rptools/maptool/server/MapToolServer.java†L68-L89】
