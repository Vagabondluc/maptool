# UI Shell

Docking layout recreates toolbar north, status south, and layered canvas center with overlays (HTML + pointer) driven by PositionalLayout; translate to CSS grid + absolute overlays.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L411-L430】

```tsx
function DockingLayout(){return(<main className="grid">...</main>);}
```

MapToolDockingManager builds frames for chat, asset library, initiative, lookup tables, and macro panels; reimagine as resizable React panes with persisted layout config.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L633-L714】

GlassPane composite stacks drag image + pointer capture atop base glass pane; mimic using portals with pointer overlay container.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L436-L448】
