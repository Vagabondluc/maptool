# MapToolFrame ➜ AppRoot

MapToolFrame assembles asset, connection, initiative, overlay, and toolbar panels before embedding the zone renderer between north toolbar and south status rail.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L139-L435】

## AppRoot.tsx
Hosts DockingLayout with canvas core, sidebar panes, and status rail; registers global event bus and restores preferences on mount.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L455-L466】

```tsx
function AppRoot(){return(<DockingLayout><CanvasHub/><SidePanes/></DockingLayout>);}
```

Tailwind: `min-h-screen bg-slate-900 grid grid-rows-[auto_1fr_auto]` maps Swing BorderLayout. Dockable regions mirror MapToolDockingManager slots for chat, initiative, tables, and asset explorer.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L633-L714】

## Bootstrap Checklist (shared with `current/app.md`)
1. **Register Providers** — Wrap `AppRoot` with preferences, event bridge, and renderer hub providers in that order so context hydration precedes renderer subscriptions.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L139-L220】
2. **Hydrate Stores** — Block rendering until campaign + zone data load, matching Swing’s wait for `ClientMessageHandler` zone seeding before showing the frame.【F:src/main/java/net/rptools/maptool/client/ClientMessageHandler.java†L369-L941】
3. **Attach Global Listeners** — Install keyboard accelerators, window focus, and resize hooks after providers exist to reuse shared mitt emitters.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L420-L466】
4. **Kick Off Handshake** — Start the connection bridge once UI scaffolding mounts so activity + error events surface through initialized contexts.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L45-L115】

```ts
async function start() {
  const root = document.getElementById("root")!;
  await bootstrapApp(root); // delegates to provider + connection order defined above
}
```
