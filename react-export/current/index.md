# MapToolFrame ➜ AppRoot

MapToolFrame assembles asset, connection, initiative, overlay, and toolbar panels before embedding the zone renderer between north toolbar and south status rail.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L139-L435】

## AppRoot.tsx
Hosts DockingLayout with canvas core, sidebar panes, and status rail; registers global event bus and restores preferences on mount.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L455-L466】

```tsx
function AppRoot(){return(<DockingLayout><CanvasHub/><SidePanes/></DockingLayout>);}
```

Tailwind: `min-h-screen bg-slate-900 grid grid-rows-[auto_1fr_auto]` maps Swing BorderLayout. Dockable regions mirror MapToolDockingManager slots for chat, initiative, tables, and asset explorer.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L633-L714】
