import { useEffect, useMemo, useState } from "react";
import mitt from "mitt";
import { v4 as uuid } from "uuid";

type Scope = "CLIENT" | "CAMPAIGN" | "ADDON";

interface MacroDefinition {
  id: string;
  name: string;
  command: string;
  scope: Scope;
}

export interface ChatMessage {
  id: string;
  author: string;
  body: string;
  channel: "public" | "gm" | "whisper";
}

type ChatEvents = {
  message: ChatMessage;
};

const chatBus = mitt<ChatEvents>();

const macroRegistry = new Map<string, MacroDefinition>();
const aliasMap = new Map<string, string>();

export function registerMacro(def: MacroDefinition) {
  macroRegistry.set(def.id, def);
}

export function setAlias(alias: string, targetId: string) {
  aliasMap.set(alias, targetId);
}

export function resetMacroRegistry() {
  macroRegistry.clear();
  aliasMap.clear();
}

function executeMacro(name: string): string | null {
  const targetId = macroRegistry.has(name) ? name : aliasMap.get(name);
  if (!targetId) return null;
  const macro = macroRegistry.get(targetId);
  if (!macro) return null;
  if (macro.command.startsWith("/say")) {
    return macro.command.replace("/say", "").trim();
  }
  return macro.command;
}

export function executeMacroCommand(name: string) {
  return executeMacro(name);
}

const translators = [
  (msg: ChatMessage) => ({ ...msg, body: msg.body.replace(/\s+/g, " ") }),
];

export function processChatMessage(msg: ChatMessage) {
  return translators.reduce((acc, fn) => fn(acc), msg);
}

export function ChatMacroPanel({ author }: { author: string }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const handler = (message: ChatMessage) => {
      setHistory(prev => [message, ...prev].slice(0, 100));
    };
    chatBus.on("message", handler);
    return () => chatBus.off("message", handler);
  }, []);

  const macroNames = useMemo(() => Array.from(macroRegistry.values()).map(m => m.name), []);

  const submit = () => {
    if (!input.trim()) return;
    const macroOutput = input.startsWith("/") ? executeMacro(input.slice(1)) : null;
    const body = macroOutput ?? input;
    const message = processChatMessage({
      id: uuid(),
      author,
      body,
      channel: "public",
    });
    chatBus.emit("message", message);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col gap-3 rounded-lg border border-slate-700 bg-slate-900 p-4 text-slate-100">
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-500">
        <span>Chat</span>
        <span>{macroNames.length} macros</span>
      </div>
      <div className="flex-1 space-y-2 overflow-auto rounded bg-slate-950 p-3 text-sm">
        {history.map(msg => (
          <div key={msg.id} className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-slate-500">{msg.author}</span>
            <span>{msg.body}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="Type or run /macro"
          className="flex-1 rounded bg-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="button"
          onClick={submit}
          className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}
