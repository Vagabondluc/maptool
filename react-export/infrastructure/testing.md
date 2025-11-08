# Testing & Diagnostics

CodeTimer instrumentation plus ActivityMonitorPanel expose performance metrics and network traffic; port to dev overlay showing frame timing + transport heartbeat.【F:src/main/java/net/rptools/lib/CodeTimer.java†L28-L158】【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L20-L115】

ChatNotificationTimers + typing duration preference drive UX timers; ensure Jest/Playwright checks validate countdown + visibility toggles.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L309-L347】【F:src/main/java/net/rptools/maptool/client/AppPreferences.java†L176-L188】

ZoneRenderer repaint debouncer and selection flows demand integration tests to confirm throttled renders and selection propagation under heavy updates.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L81-L316】
