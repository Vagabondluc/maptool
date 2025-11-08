# Tailwind Translation

Canvas container uses `relative` stacking for overlays akin to PositionalLayout centering pointer + HTML overlays.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L411-L430】

Status rail -> `bg-slate-800/90 border-t border-slate-700 grid grid-flow-col gap-2` to mirror StatusPanel stacking of meters and spacers.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L396-L407】

Docked frames translate to responsive `grid-cols-[minmax(16rem,1fr)_minmax(24rem,1.5fr)]` plus resizable handles to emulate MapToolDockingManager panes.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L633-L714】
