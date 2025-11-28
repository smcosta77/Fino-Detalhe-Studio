// src/app/(panel)/dashboard/assistente-agenda/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function AssistenteAgendaPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // auto-scroll sempre que messages mudar
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    // detectar se esta mensagem do cliente é uma confirmação final
    const lower = text.toLowerCase();
    const isConfirmation =
      /^sim\b/.test(lower) ||
      /^confirmo\b/.test(lower) ||
      /^pode marcar\b/.test(lower) ||
      /^pode confirmar\b/.test(lower) ||
      /^pode agendar\b/.test(lower);

    const newMessage: ChatMessage = { role: "user", content: text };
    const nextMessages = [...messages, newMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Erro ao chamar /api/ai/agenda:", res.status, errorText);
        throw new Error("Falha ao chamar o agente de IA");
      }

      const data = (await res.json()) as {
        reply?: string;
        error?: string;
        completed?: boolean;
        date?: string;
      };

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          data.reply ??
          data.error ??
          "Tive um problema ao responder agora. Pode tentar outra vez?",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // 🔁 regra de saída:
      // 1) Se a API disser que completou (completed = true), redireciona
      // 2) OU se a mensagem do cliente foi claramente uma confirmação ("sim", "confirmo", etc.), redireciona
      if (data.completed || isConfirmation) {
        const target = data.date
          ? `/dashboard/agenda?date=${data.date}`
          : "/dashboard/agenda";

        setTimeout(() => {
          router.push(target);
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Ocorreu um erro ao contactar o assistente. Tenta novamente daqui a pouco.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background py-8 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-5">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Assistente de Agenda</h1>
          <p className="text-sm md:text-base text-slate-600">
            Fale com o assistente para marcar, reagendar ou cancelar horários.
          </p>
        </header>

        {/* container com ref para auto-scroll */}
        <div
          ref={chatRef}
          className="border rounded-md p-4 h-[28rem] md:h-[32rem] overflow-y-auto bg-slate-50"
        >
          {messages.length === 0 && (
            <p className="text-sm md:text-base text-slate-500">
              Olá! 👋 Sou Bia, assistente de agenda do Fino Detalhe Studio. Como posso
              ajudar hoje?
            </p>
          )}

          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${m.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm md:text-base whitespace-pre-wrap ${m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-slate-900"
                  }`}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-3 pt-1">
          <input
            type="text"
            className="flex-1 border rounded-md px-3 py-2.5 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex.: Quero marcar combo mãos + pés amanhã às 14h..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 text-sm md:text-base rounded-md bg-blue-600 text-white disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </main>
  );
}
