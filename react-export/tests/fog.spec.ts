import { applyFog, type FogState } from "../examples/fog-pipeline";

function createMockContext() {
  const calls: string[] = [];
  const ctx = {
    globalAlpha: 0,
    globalCompositeOperation: "source-over",
    canvas: { width: 1024, height: 768 },
    drawImage: (..._args: unknown[]) => {
      calls.push("drawImage");
    },
    fill: (..._args: unknown[]) => {
      calls.push("fill");
    },
  } as unknown as CanvasRenderingContext2D;
  return { ctx, calls };
}

export function testApplyFogClampsOpacity() {
  const { ctx, calls } = createMockContext();
  const fog: FogState = {
    hardMask: {} as ImageBitmap,
    softMask: {} as ImageBitmap,
    clearRegions: [new Path2D()],
    opacity: 2,
  };
  applyFog(ctx, fog);
  if (ctx.globalAlpha !== 1) {
    throw new Error(`Expected opacity clamp to 1, received ${ctx.globalAlpha}`);
  }
  if (calls.filter(name => name === "drawImage").length !== 2) {
    throw new Error("Expected hard and soft masks to be drawn");
  }
}

if (import.meta.vitest) {
  test("applyFog clamps opacity and draws masks", () => {
    testApplyFogClampsOpacity();
  });
}
