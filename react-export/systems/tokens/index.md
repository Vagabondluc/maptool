# Token System

Token model stores GUID, ownership, vision, asset maps, and update opcodes; translate into serializable entity with diff-friendly updates.【F:src/main/java/net/rptools/maptool/model/Token.java†L73-L233】

```ts
export type TokenUpdate="setState"|"setLayer"|"setXY"|"addLightSource";
```

SelectionModel + selectionSetMap coordinate token focus, drag anchors, and cooperative move queues; expose via selection service for multiplayer sync.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L100-L320】

Impersonation stack in CommandPanel drives chat identity and HTML overlays; carry into token presence service linking chat + UI badges.【F:src/main/java/net/rptools/maptool/client/ui/commandpanel/CommandPanel.java†L75-L189】
