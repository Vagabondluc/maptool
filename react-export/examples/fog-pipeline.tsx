import { useEffect, useRef } from "react";
import mitt from "mitt";

export type FogState = {
  hardMask: ImageBitmap;
  softMask: ImageBitmap;
  clearRegions: Path2D[];
  opacity: number;
};

type FogEventMap = {
  update: FogState;
};

const fogBus = mitt<FogEventMap>();

export function emitFogUpdate(state: FogState) {
  fogBus.emit("update", state);
}

export function applyFog(ctx: CanvasRenderingContext2D, fog: FogState) {
  const opacity = Math.min(Math.max(fog.opacity, 0), 1);
  ctx.globalAlpha = opacity;
  ctx.globalCompositeOperation = "source-over";
  ctx.drawImage(fog.hardMask, 0, 0);
  ctx.drawImage(fog.softMask, 0, 0);
  ctx.globalCompositeOperation = "destination-out";
  fog.clearRegions.forEach(region => ctx.fill(region));
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
}

export function FogPipeline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const handler = (fog: FogState) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      applyFog(ctx, fog);
    };
    fogBus.on("update", handler);
    return () => fogBus.off("update", handler);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none mix-blend-multiply"
    />
  );
}
