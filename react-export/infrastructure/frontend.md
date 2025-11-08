# Frontend Infrastructure

Swing MapToolFrame constructs toolbars, status rails, overlays, and docking panes around ZoneRenderer; translate to module federation of React components with persisted layout config.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L368-L714】

Canvas stack relies on ZoneRenderer orchestrating drawables, overlays, and DebounceExecutor-driven paints; use Pixi.js or Canvas2D modules with throttled animation frame scheduler.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L81-L221】

Event bus registration at frame bootstrap ensures chat and zone events propagate globally; implement mitt-based singleton with context providers.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L455-L466】【F:src/main/java/net/rptools/maptool/client/ui/commandpanel/CommandPanel.java†L94-L107】
