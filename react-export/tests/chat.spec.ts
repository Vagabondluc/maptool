import { processChatMessage, registerMacro, resetMacroRegistry, setAlias, type ChatMessage } from "../examples/chat-macro";

export function testChatTranslationTrimsWhitespace() {
  resetMacroRegistry();
  registerMacro({ id: "say", name: "say", command: "/say hello", scope: "CLIENT" });
  setAlias("wave", "say");
  const message: ChatMessage = {
    id: "1",
    author: "GM",
    body: "Hello    world",
    channel: "public",
  };
  const processed = processChatMessage(message);
  if (processed.body !== "Hello world") {
    throw new Error(`Expected condensed whitespace, received '${processed.body}'`);
  }
}

if (import.meta.vitest) {
  test("chat translation condenses whitespace", () => {
    testChatTranslationTrimsWhitespace();
  });
}
