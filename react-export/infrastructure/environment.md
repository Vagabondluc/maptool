# Environment & Configuration

AppPreferences persists numerous toggles (selection fill, chat logging, fog opacity, typing duration) via java.util.prefs store; emulate with localStorage/IndexedDB schema for runtime toggles.【F:src/main/java/net/rptools/maptool/client/AppPreferences.java†L30-L200】

Initial layout XML + docking profile names guide frame restoration; translate to JSON layout snapshots seeded at boot.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L121-L235】

Credits/version assets loaded at startup through resource manager; replace with fetchable markdown + metadata served via CDN.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L382-L394】
