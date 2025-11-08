# Macro Specification

## Data Structures
```ts
export interface MacroDefinition {
  id: string;
  name: string;
  command: string;
  description?: string;
  scope: "CLIENT" | "CAMPAIGN" | "ADDON";
  tags?: string[];
}
```
- Scope options mirror MacroManager.Scope enum for alias validity.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L57-L120】

## API
```ts
export interface MacroRegistry {
  register(def: MacroDefinition): void;
  remove(id: string): void;
  setAlias(alias: string, targetId: string, scope: MacroDefinition["scope"]): void;
  resolve(name: string): MacroDefinition | undefined;
}
```
- `setAlias` semantics copy aliasMap behavior with scope filtering.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L130-L165】

## Execution Context
```ts
export interface MacroContext {
  tokenId?: string;
  campaignId: string;
  sender: string;
  vars: Record<string, unknown>;
}
```
- Execution attaches to token/campaign to mimic MapToolMacroContext usage.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L21-L37】

## Events
- `macro:executed` carries `{ id, context, output }` for chat integration.
- `macro:alias-changed` triggers persistence sync for campaign exports.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L71-L188】
