// src/components/AssistantChat.tsx
import React, { useEffect, useRef, useState } from "react";
import supabase from "../lib/supabaseClient";

type Msg = { role: "user" | "assistant"; content: string };

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AssistantChat({ open, onClose }: Props) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Salut! Întreabă-mă despre produse, livrare sau personalizare." },
  ]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
  }, [msgs, open]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setSending(true);
    setMsgs((m) => [...m, { role: "user", content: text }]);
    setInput("");

    try {
      // caută în FAQ (dacă există tabelul)
      let answer = "Nu am găsit un răspuns imediat. Scrie-ne din formularul de contact și revenim rapid. 😊";
      try {
        const { data, error } = await supabase
          .from("faqs")
          .select("answer")
          .textSearch("search", text, { type: "websearch" })
          .limit(1);
        if (!error && data && data.length > 0) answer = data[0].answer;
      } catch { /* dacă nu există faqs, continuăm */ }

      setMsgs((m) => [...m, { role: "assistant", content: answer }]);

      // loghează în messages
      await supabase.from("messages").insert([
        { message: text,  source: "assistant:user" },
        { message: answer, source: "assistant:bot"  }
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div className="absolute right-4 bottom-4 w-[92vw] max-w-md bg-white rounded-2xl shadow-2xl border flex flex-col">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <div className="font-semibold">Asistent VinArt</div>
          <button onClick={onClose} className="rounded-md px-2 py-1 hover:bg-gray-100" aria-label="Închide">×</button>
        </div>

        <div ref={boxRef} className="p-3 space-y-2 overflow-auto max-h-[60vh]">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-xl max-w-[85%] ${m.role === "user" ? "bg-yellow-100 ml-auto" : "bg-gray-100 mr-auto"}`}
            >
              {m.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
          <input
            className="flex-1 border rounded-xl px-3 py-2"
            placeholder="Scrie întrebarea…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={sending}
          />
          <button
            disabled={sending}
            className="rounded-xl px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold disabled:opacity-60"
          >
            {sending ? "..." : "Trimite"}
          </button>
        </form>
      </div>
    </div>
  );
}
