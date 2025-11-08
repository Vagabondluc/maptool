# Renderer & Service Wiring

MapToolFrame swaps ZoneRenderer instances, posts ZoneLoading/Activated events, and retargets toolbars; mirror with renderer hub context and focus management.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1706】

## useRendererHub.ts
Encapsulate current zone id, focus restoration, and status updates triggered when renderer changes.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1682-L1705】

```ts
export function useRendererHub(){return useContext(RendererContext);}
```

## EventBridge.ts
Main event bus subscribes at frame construction and posts zone lifecycle events; replicate via mitt emitter bound to React effects.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L455-L466】【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1693-L1698】

## Bootstrap Checklist (shared with `current/index.md`)
1. **Register Providers** — Mount `PreferencesProvider`, `EventBridgeProvider`, then `RendererHubProvider` so preference hydration completes before renderer subscriptions fire; mirrors Swing order of `MapToolPreferences → EventDispatcher → ZoneRenderer` construction.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L139-L220】
2. **Hydrate Stores** — Await campaign + zone stores before revealing the canvas to avoid stale tool state; Swing frame blocks until `ClientMessageHandler` seeds zone data.【F:src/main/java/net/rptools/maptool/client/ClientMessageHandler.java†L369-L941】
3. **Attach Global Listeners** — Register keybinds, focus handlers, and window resize callbacks once providers exist to ensure emitter references resolve.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L420-L466】
4. **Kick Off Handshake** — Initiate connection bridge after providers mount so activity metrics dispatch into the correct contexts.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L45-L115】

```ts
export async function bootstrapApp(root: HTMLElement) {
  const prefs = await loadPreferences();
  const campaign = await hydrateCampaign();
  createRoot(root).render(
    <PreferencesProvider value={prefs}>
      <EventBridgeProvider>
        <RendererHubProvider initialCampaign={campaign}>
          <AppRoot />
        </RendererHubProvider>
      </EventBridgeProvider>
    </PreferencesProvider>
  );
  await startConnection();
}
```
