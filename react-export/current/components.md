# Dockable Components

## ToolbarPanel.tsx
Wraps tool selection row akin to Swing toolbarPanel; floats over canvas top border with action buttons.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L420-L435】

```tsx
export function ToolbarPanel(){return(<header className="flex gap-2">...</header>);}
```

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| `tools` | `{ id: string; icon: string; label: string; }[]` | Ordered tool manifest rendered as toggle buttons, mirroring Swing toolbar population. | `[]` |
| `activeToolId` | `string` | Currently selected tool id to highlight active state and drive renderer mode. | first entry in `tools`
| `onSelect` | `(toolId: string) => void` | Callback triggered when user selects a tool; should update renderer hub context. | required |

```ts
export interface ToolbarPanelProps {
  tools: { id: string; icon: string; label: string }[];
  activeToolId: string;
  onSelect: (toolId: string) => void;
}
```

## CommandPanel.tsx
Chat composer keeps identity stack, installs smiley translations, and listens for chat events; port to controlled rich text area with macro triggers.【F:src/main/java/net/rptools/maptool/client/ui/commandpanel/CommandPanel.java†L31-L179】

```tsx
export function CommandPanel(){return(<section className="grid">...</section>);}
```

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| `value` | `string` | Controlled chat composer text, trimmed prior to macro expansion as shown in `examples/chat-macro.tsx`. | `""` |
| `onChange` | `(next: string) => void` | Emits chat input mutations while preserving selection history stack. | required |
| `onSubmit` | `(payload: { body: string; impersonatedId?: string }) => void` | Dispatches processed command body and optional impersonation target. | required |
| `macros` | `{ id: string; label: string }[]` | Macro shortcuts bound to slash commands; displayed below composer. | `[]` |
| `onMacroClick` | `(macroId: string) => void` | Trigger macro execution pipeline; hooks into macro runtime described in `examples/chat-macro.tsx`. | optional |

```ts
export interface CommandPanelProps {
  value: string;
  onChange: (next: string) => void;
  onSubmit: (payload: { body: string; impersonatedId?: string }) => void;
  macros?: { id: string; label: string }[];
  onMacroClick?: (macroId: string) => void;
}
```

## StatusRail.tsx
Aggregates cache, zoom, connection, memory, and activity indicators similar to StatusPanel stack.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L396-L407】

Tailwind: `grid grid-flow-col auto-cols-max items-center gap-3 bg-slate-800 px-3 py-1 text-xs` mimics bevelled status strip.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L396-L407】

| Prop | Type | Description | Default |
| --- | --- | --- | --- |
| `metrics` | `{ fps: number; memory: string; network: { sent: number; received: number } }` | Aggregated runtime stats surfaced via `examples/rendering-demo.tsx` and `examples/websocket-bridge.ts`. | `{ fps: 0, memory: "", network: { sent: 0, received: 0 } }` |
| `status` | `{ mode: "connected" | "connecting" | "offline"; message?: string }` | Connection state for players mirroring MapTool status indicators. | `{ mode: "offline" }` |
| `onToggleProfiler` | `() => void` | Enables dev overlay described in infrastructure docs. | optional |

```ts
export interface StatusRailProps {
  metrics: {
    fps: number;
    memory: string;
    network: { sent: number; received: number };
  };
  status: { mode: "connected" | "connecting" | "offline"; message?: string };
  onToggleProfiler?: () => void;
}
```
