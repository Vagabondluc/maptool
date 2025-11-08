# Fog Specification

## Data Structures
```ts
export interface FogState {
  hardMask: ImageBitmap;
  softMask: ImageBitmap;
  clearRegions: Path2D[];
  opacity: number; // 0..1
}
```
- Hard/soft masks map to FogRenderer fill + overlay passes.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】
- Clear regions align with visibility clear areas per player view.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L63-L104】

## Functions
```ts
export function applyFog(ctx:CanvasRenderingContext2D,f:FogState){
  ctx.globalAlpha=Math.min(Math.max(f.opacity,0),1);
  ctx.drawImage(f.hardMask,0,0);
  ctx.globalCompositeOperation="source-over";
  ctx.drawImage(f.softMask,0,0);
  ctx.globalCompositeOperation="destination-out";
  f.clearRegions.forEach(r=>{ctx.fill(r);});
  ctx.globalCompositeOperation="source-over";
}
```
- Mirrors hard fill, soft overlay, clear cutout, outline order; outlines rendered separately via DOM overlay for resolution independence.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L69-L104】

## Events
- `fog:updated` triggered after applyFog flush; includes `{ zoneId, timestamp }` for caches.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】
