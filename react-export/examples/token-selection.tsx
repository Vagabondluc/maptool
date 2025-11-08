import { useCallback, useEffect, useMemo, useState } from "react";
import mitt from "mitt";

export interface TokenSummary {
  id: string;
  name: string;
  x: number;
  y: number;
}

type SelectionEvents = {
  change: { ids: string[] };
};

const selectionBus = mitt<SelectionEvents>();

export function emitSelection(ids: string[]) {
  selectionBus.emit("change", { ids });
}

export function TokenSelectionList({ tokens }: { tokens: TokenSummary[] }) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = useCallback(
    (id: string) => {
      setSelected(prev => {
        const next = prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id];
        selectionBus.emit("change", { ids: next });
        return next;
      });
    },
    []
  );

  const sorted = useMemo(() => tokens.slice().sort((a, b) => a.name.localeCompare(b.name)), [tokens]);

  return (
    <ul className="space-y-1">
      {sorted.map(token => (
        <li key={token.id}>
          <button
            type="button"
            onClick={() => toggle(token.id)}
            className={`flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition ${
              selected.includes(token.id)
                ? "bg-emerald-600 text-white"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
          >
            <span>{token.name}</span>
            <span className="text-xs opacity-70">{Math.round(token.x)}, {Math.round(token.y)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export function useSelectionListener(listener: (ids: string[]) => void) {
  useEffect(() => {
    const handler = ({ ids }: { ids: string[] }) => listener(ids);
    selectionBus.on("change", handler);
    return () => selectionBus.off("change", handler);
  }, [listener]);
}
