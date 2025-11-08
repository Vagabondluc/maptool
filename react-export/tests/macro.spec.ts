import { executeMacroCommand, registerMacro, resetMacroRegistry, setAlias } from "../examples/chat-macro";

export function testExecuteMacroCommand() {
  resetMacroRegistry();
  registerMacro({ id: "greet", name: "greet", command: "/say hello world", scope: "CLIENT" });
  setAlias("hello", "greet");
  const result = executeMacroCommand("hello");
  if (result !== "hello world") {
    throw new Error(`Expected macro output to be \"hello world\", received ${result}`);
  }
}

if (import.meta.vitest) {
  test("executeMacroCommand resolves aliases", () => {
    testExecuteMacroCommand();
  });
}
