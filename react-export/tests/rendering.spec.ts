import {
  FrameEvent,
  GridLayerRenderer,
  HaloLayerRenderer,
  LayerPassToggles,
  LayerResponsibilities,
  LightingLayerRenderer,
  frameDebugBus,
  normalizeLayerPassToggles,
} from "../examples/rendering-demo";

function createStubContext(): CanvasRenderingContext2D {
  const gradient = { addColorStop: () => {} };
  return {
    canvas: { width: 512, height: 384 } as HTMLCanvasElement,
    save: () => {},
    restore: () => {},
    clearRect: () => {},
    fillRect: () => {},
    beginPath: () => {},
    arc: () => {},
    stroke: () => {},
    fill: () => {},
    fillText: () => {},
    setLineDash: () => {},
    createRadialGradient: () => gradient,
    globalAlpha: 1,
    globalCompositeOperation: "source-over",
    lineWidth: 1,
    strokeStyle: "#000000",
    fillStyle: "#000000",
    font: "10px sans-serif",
    textBaseline: "alphabetic",
    shadowBlur: 0,
    shadowColor: "#000000",
  } as unknown as CanvasRenderingContext2D;
}

export function collectRenderingDemoFrameEvents(
  overrides?: LayerPassToggles,
): FrameEvent[] {
  const toggles = normalizeLayerPassToggles(LayerResponsibilities, overrides);
  const grid = new GridLayerRenderer(LayerResponsibilities.grid, toggles.grid);
  const halos = new HaloLayerRenderer(LayerResponsibilities.halos, toggles.halos);
  const lighting = new LightingLayerRenderer(
    LayerResponsibilities.lighting,
    toggles.lighting,
  );
  const ctx = createStubContext();
  const tick = { frame: 1, timestamp: 16 };
  const events: FrameEvent[] = [];
  const handler = (evt: FrameEvent) => events.push(evt);
  frameDebugBus.on("frame", handler);
  const emitFor = (layerId: string) => (call: string) => {
    frameDebugBus.emit("frame", { ...tick, layerId, call });
  };
  [grid, halos, lighting].forEach(layer => {
    layer.render(ctx, tick, emitFor(layer.id));
  });
  frameDebugBus.off("frame", handler);
  return events;
}

if (import.meta.vitest) {
  test("rendering demo emits pass-level frame events", () => {
    const events = collectRenderingDemoFrameEvents({
      grid: { "gridRenderer.renderCoordinates": false },
      lighting: { "darknessRenderer.render": false },
    });

    expect(events).toHaveLength(5);

    const calls = events.map(evt => evt.call);
    expect(calls).toEqual([
      "gridRenderer.renderGrid",
      "haloRenderer.renderHalos",
      "lightsRenderer.renderLights",
      "lumensRenderer.render",
      "lightsRenderer.renderAuras",
    ]);

    const lightingEvents = events.filter(evt => evt.layerId === "lighting");
    expect(lightingEvents).toHaveLength(3);
    expect(lightingEvents.map(evt => evt.call)).not.toContain(
      "darknessRenderer.render",
    );

    const gridEvents = events.filter(evt => evt.layerId === "grid");
    expect(gridEvents).toHaveLength(1);
    expect(gridEvents[0]?.call).toBe("gridRenderer.renderGrid");

    const haloEvents = events.filter(evt => evt.layerId === "halos");
    expect(haloEvents).toHaveLength(1);
  });
}
