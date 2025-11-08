# Scripting & Macros

MacroManager registers slash macros, manages alias scopes, and limits recursion; convert into command registry with per-campaign namespaces.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L34-L170】

```ts
registerMacro({name:"/say",handler:ctx=>speak(ctx)});
```

Aliases persist across client/campaign/addon scopes; store in IndexedDB buckets keyed by scope and add validation mirroring aliasMap checks.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L52-L170】

Integration with CommandPanel ensures impersonation context and chat pipeline execute macros before dispatch; keep API for UI injection.【F:src/main/java/net/rptools/maptool/client/ui/commandpanel/CommandPanel.java†L75-L189】
