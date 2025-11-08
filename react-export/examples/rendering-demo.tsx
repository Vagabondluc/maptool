import { useEffect, useRef } from "react";
import mitt from "mitt";

type FrameEvent = { frame: number; timestamp: number };
const frameBus = mitt<{ frame: FrameEvent }>();
export const frameDebugBus = frameBus;

export interface LayerRenderer {
  id: string;
  render(ctx: CanvasRenderingContext2D, time: FrameEvent): void;
}

export interface DemoViewModel {
  layers: LayerRenderer[];
  frameRateCap: number;
}

export function RenderingDemo({ viewModel }: { viewModel: DemoViewModel }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let rafId: number;
    let lastFrame = 0;
    const targetDelta = 1000 / viewModel.frameRateCap;
    const loop = (time: number) => {
      if (time - lastFrame < targetDelta) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      lastFrame = time;
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      const evt: FrameEvent = { frame: Math.round(time), timestamp: time };
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      viewModel.layers.forEach(layer => layer.render(ctx, evt));
      frameBus.emit("frame", evt);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [viewModel]);

  return (
    <canvas
      ref={canvasRef}
      width={1024}
      height={768}
      className="w-full h-full bg-slate-900 rounded-lg shadow-inner"
    />
  );
}

export function useFrameDebug(listener: (evt: FrameEvent) => void) {
  useEffect(() => {
    frameBus.on("frame", listener);
    return () => frameBus.off("frame", listener);
  }, [listener]);
}
