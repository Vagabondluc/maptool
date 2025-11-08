# Dockable Components

## ToolbarPanel.tsx
Wraps tool selection row akin to Swing toolbarPanel; floats over canvas top border with action buttons.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L420-L435】

```tsx
export function ToolbarPanel(){return(<header className="flex gap-2">...</header>);}
```

## CommandPanel.tsx
Chat composer keeps identity stack, installs smiley translations, and listens for chat events; port to controlled rich text area with macro triggers.【F:src/main/java/net/rptools/maptool/client/ui/commandpanel/CommandPanel.java†L31-L179】

```tsx
export function CommandPanel(){return(<section className="grid">...</section>);}
```

## StatusRail.tsx
Aggregates cache, zoom, connection, memory, and activity indicators similar to StatusPanel stack.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L396-L407】

Tailwind: `grid grid-flow-col auto-cols-max items-center gap-3 bg-slate-800 px-3 py-1 text-xs` mimics bevelled status strip.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L396-L407】
