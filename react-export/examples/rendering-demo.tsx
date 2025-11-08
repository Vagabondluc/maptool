import { useEffect, useMemo, useRef } from "react";
import mitt from "mitt";

export const LayerResponsibilities = {
  grid: {
    showGrid: true,
    rendererCalls: ["gridRenderer.renderGrid", "gridRenderer.renderCoordinates"],
    linkedDocs: "../systems/rendering/index.md#grid-pass",
  },
  lighting: {
    lightPasses: { lights: true, darkness: true, auras: true },
    rendererCalls: [
      "lightsRenderer.renderLights",
      "lumensRenderer.render",
      "lightsRenderer.renderAuras",
      "darknessRenderer.render",
    ],
    linkedDocs: "../systems/rendering/index.md#lighting-stack",
  },
  halos: {
    enableHalos: true,
    rendererCalls: ["haloRenderer.renderHalos"],
    linkedDocs: "../systems/rendering/index.md#halo-overlays",
  },
  visionAndFog: {
    fogEnabled: "hasFog",
    rendererCalls: ["fogRenderer.render", "visionOverlayRenderer.render"],
    linkedDocs: "../systems/rendering/index.md#vision-and-fog-overlays",
  },
  overlays: {
    overlayStack: true,
    rendererCalls: [
      "overlay.paintOverlay",
      "gridRenderer.renderCoordinates",
      "debugRenderer.renderShapes",
    ],
    linkedDocs: "../systems/rendering/index.md#debug-and-auxiliary-overlays",
  },
} as const;

export type LayerResponsibilitiesMap = typeof LayerResponsibilities;
export type LayerKey = keyof LayerResponsibilitiesMap;

export type FrameTick = { frame: number; timestamp: number };
export type FrameEvent = FrameTick & { layerId: string; call: string };

const frameBus = mitt<{ frame: FrameEvent }>();
export const frameDebugBus = frameBus;

export interface LayerRenderer {
  id: string;
  render(
    ctx: CanvasRenderingContext2D,
    tick: FrameTick,
    emit: (call: string) => void,
  ): void;
}

export type LayerPassToggles = {
  [K in LayerKey]?: Partial<
    Record<LayerResponsibilitiesMap[K]["rendererCalls"][number], boolean>
  >;
};

export type NormalizedLayerPassToggles = {
  [K in LayerKey]: Record<
    LayerResponsibilitiesMap[K]["rendererCalls"][number],
    boolean
  >;
};

function defaultEnabledForCall(
  _layer: LayerKey,
  responsibility: LayerResponsibilitiesMap[LayerKey],
  call: string,
): boolean {
  if ("lightPasses" in responsibility) {
    if (call === "lightsRenderer.renderLights" || call === "lumensRenderer.render") {
      return responsibility.lightPasses.lights;
    }
    if (call === "lightsRenderer.renderAuras") {
      return responsibility.lightPasses.auras;
    }
    if (call === "darknessRenderer.render") {
      return responsibility.lightPasses.darkness;
    }
  }
  if ("showGrid" in responsibility) {
    return responsibility.showGrid;
  }
  if ("enableHalos" in responsibility) {
    return responsibility.enableHalos;
  }
  return true;
}

export function createDefaultLayerPassToggles(
  responsibilities: LayerResponsibilitiesMap,
): NormalizedLayerPassToggles {
  const result: Partial<NormalizedLayerPassToggles> = {};
  for (const layerKey of Object.keys(responsibilities) as LayerKey[]) {
    const layerResp = responsibilities[layerKey];
    const passes: Record<string, boolean> = {};
    layerResp.rendererCalls.forEach(call => {
      passes[call] = defaultEnabledForCall(layerKey, layerResp, call);
    });
    result[layerKey] = passes as NormalizedLayerPassToggles[LayerKey];
  }
  return result as NormalizedLayerPassToggles;
}

export function normalizeLayerPassToggles(
  responsibilities: LayerResponsibilitiesMap,
  overrides?: LayerPassToggles,
): NormalizedLayerPassToggles {
  const toggles = createDefaultLayerPassToggles(responsibilities);
  if (!overrides) {
    return toggles;
  }
  for (const layerKey of Object.keys(overrides) as LayerKey[]) {
    const layerOverrides = overrides[layerKey];
    if (!layerOverrides) continue;
    const target = toggles[layerKey];
    for (const [call, enabled] of Object.entries(layerOverrides)) {
      if (call in target && typeof enabled === "boolean") {
        target[call as keyof typeof target] = enabled;
      }
    }
  }
  return toggles;
}

export interface DemoViewModel {
  frameRateCap: number;
  responsibilities: LayerResponsibilitiesMap;
  createLayers(toggles: NormalizedLayerPassToggles): LayerRenderer[];
}

export class GridLayerRenderer implements LayerRenderer {
  readonly id = "grid";

  constructor(
    private readonly responsibility: LayerResponsibilitiesMap["grid"],
    private readonly toggles: NormalizedLayerPassToggles["grid"],
  ) {}

  render(
    ctx: CanvasRenderingContext2D,
    _tick: FrameTick,
    emit: (call: string) => void,
  ) {
    if (!this.responsibility.showGrid) {
      return;
    }

    const { width, height } = ctx.canvas;
    const spacing = 64;

    if (this.toggles["gridRenderer.renderGrid"]) {
      ctx.save();
      ctx.fillStyle = "rgba(148, 163, 184, 0.25)";
      for (let x = 0; x <= width; x += spacing) {
        ctx.fillRect(x, 0, 1, height);
      }
      for (let y = 0; y <= height; y += spacing) {
        ctx.fillRect(0, y, width, 1);
      }
      ctx.restore();
      emit("gridRenderer.renderGrid");
    }

    if (this.toggles["gridRenderer.renderCoordinates"]) {
      ctx.save();
      ctx.fillStyle = "rgba(226, 232, 240, 0.85)";
      ctx.font = "12px monospace";
      ctx.textBaseline = "top";
      const columns = Math.min(Math.floor(width / spacing), 6);
      const rows = Math.min(Math.floor(height / spacing), 6);
      for (let col = 0; col < columns; col += 1) {
        for (let row = 0; row < rows; row += 1) {
          const label = String.fromCharCode(65 + col) + (row + 1);
          ctx.fillText(
            label,
            col * spacing + 6,
            row * spacing + 4,
          );
        }
      }
      ctx.restore();
      emit("gridRenderer.renderCoordinates");
    }
  }
}

export class HaloLayerRenderer implements LayerRenderer {
  readonly id = "halos";

  constructor(
    private readonly responsibility: LayerResponsibilitiesMap["halos"],
    private readonly toggles: NormalizedLayerPassToggles["halos"],
  ) {}

  render(
    ctx: CanvasRenderingContext2D,
    _tick: FrameTick,
    emit: (call: string) => void,
  ) {
    if (!this.responsibility.enableHalos) {
      return;
    }

    if (!this.toggles["haloRenderer.renderHalos"]) {
      return;
    }

    const cx = ctx.canvas.width / 2;
    const cy = ctx.canvas.height / 2;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
    ctx.shadowColor = "rgba(56, 189, 248, 0.65)";
    ctx.shadowBlur = 16;
    ctx.arc(cx, cy, Math.min(cx, cy) / 1.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    emit("haloRenderer.renderHalos");
  }
}

type LightingCall =
  LayerResponsibilitiesMap["lighting"]["rendererCalls"][number];

export class LightingLayerRenderer implements LayerRenderer {
  readonly id = "lighting";

  constructor(
    private readonly responsibility: LayerResponsibilitiesMap["lighting"],
    private readonly toggles: NormalizedLayerPassToggles["lighting"],
  ) {}

  private isEnabled(call: LightingCall): boolean {
    return Boolean(this.toggles[call]);
  }

  render(
    ctx: CanvasRenderingContext2D,
    _tick: FrameTick,
    emit: (call: string) => void,
  ) {
    const { width, height } = ctx.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    if (this.isEnabled("lightsRenderer.renderLights")) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = "rgba(250, 204, 21, 0.6)";
      ctx.fillRect(centerX - 120, centerY - 120, 240, 240);
      ctx.restore();
      emit("lightsRenderer.renderLights");
    }

    if (this.isEnabled("lumensRenderer.render")) {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.min(centerX, centerY),
      );
      gradient.addColorStop(0, "rgba(252, 211, 77, 0.8)");
      gradient.addColorStop(1, "rgba(30, 41, 59, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(centerX, centerY), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      emit("lumensRenderer.render");
    }

    if (this.isEnabled("lightsRenderer.renderAuras")) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = "rgba(14, 165, 233, 0.75)";
      ctx.lineWidth = 12;
      ctx.setLineDash([12, 10]);
      ctx.arc(centerX, centerY, Math.min(centerX, centerY) / 1.8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      emit("lightsRenderer.renderAuras");
    }

    if (this.isEnabled("darknessRenderer.render")) {
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
      emit("darknessRenderer.render");
    }
  }
}

export function createDefaultDemoViewModel(): DemoViewModel {
  return {
    frameRateCap: 30,
    responsibilities: LayerResponsibilities,
    createLayers: toggles => [
      new GridLayerRenderer(LayerResponsibilities.grid, toggles.grid),
      new HaloLayerRenderer(LayerResponsibilities.halos, toggles.halos),
      new LightingLayerRenderer(LayerResponsibilities.lighting, toggles.lighting),
    ],
  };
}

export interface RenderingDemoProps {
  viewModel: DemoViewModel;
  passes?: LayerPassToggles;
}

export function RenderingDemo({ viewModel, passes }: RenderingDemoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const normalizedPasses = useMemo(
    () => normalizeLayerPassToggles(viewModel.responsibilities, passes),
    [viewModel.responsibilities, passes],
  );

  const layers = useMemo(
    () => viewModel.createLayers(normalizedPasses),
    [viewModel, normalizedPasses],
  );

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
      const tick: FrameTick = { frame: Math.round(time), timestamp: time };
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      layers.forEach(layer => {
        const emit = (call: string) => {
          frameBus.emit("frame", { ...tick, layerId: layer.id, call });
        };
        layer.render(ctx, tick, emit);
      });
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [layers, viewModel.frameRateCap]);

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
