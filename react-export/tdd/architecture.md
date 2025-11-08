# Technical Architecture

## Application Shell
MapToolFrame coordinates menu, toolbar, status, and zone renderer surfaces; React shell mirrors via `<AppRoot>` grid, event bus, and provider stack.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L431-L1706】

```
<AppRoot>
  <ShellProviders>
    <DockingLayout>
      <Toolbar />
      <CanvasHub />
      <Sidebars />
      <StatusRail />
    </DockingLayout>
  </ShellProviders>
</AppRoot>
```

## State & Data
- Campaign store caches zones, macros, and fog metadata cloned from campaign serialization rules.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L41-L188】
- Zone renderer view model holds selection model, caches, and layer renderers similar to ZoneRenderer’s composition.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L129-L200】

## Messaging
- Event bus replicates MapToolEventBus usage for zone activation/deactivation and UI updates during renderer swaps.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1700】
- Multiplayer bridge mirrors handshake callbacks and activity monitor wiring.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L45-L115】

## Rendering Pipeline
- Layered renderer modules: Grid, Token, Lighting, Fog, Overlay; share frame scheduler derived from DebounceExecutor semantics.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L129-L200】
- Fog pipeline replays hard fill → soft overlay → clear cuts ordering.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】

## Automation
- Macro subsystem exposes slash command registry, alias scopes, and macro execution contexts akin to MacroManager.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L45-L165】
- Chat pipeline composes translation rule groups prior to render.【F:src/main/java/net/rptools/maptool/client/ui/chat/ChatProcessor.java†L20-L42】
