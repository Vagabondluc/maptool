import { frameDebugBus } from "../examples/rendering-demo";

export function testFrameBusEmission() {
  let count = 0;
  const handler = () => {
    count += 1;
  };
  frameDebugBus.on("frame", handler);
  frameDebugBus.emit("frame", { frame: 1, timestamp: 16 });
  frameDebugBus.off("frame", handler);
  if (count !== 1) {
    throw new Error(`Expected 1 frame event, received ${count}`);
  }
}

if (import.meta.vitest) {
  test("frame bus emits events", () => {
    testFrameBusEmission();
  });
}
