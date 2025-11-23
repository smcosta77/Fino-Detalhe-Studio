// src/app/api/ai/agenda/route.ts
import { NextResponse } from "next/server";
import { agendaSalaoSystemPrompt } from "../../../../ai/agendaSalaoPrompt";

export const runtime = "nodejs";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function GET() {
    return NextResponse.json({
        ok: true,
        message: "GET /api/ai/agenda (Groq) está a responder ✅",
    });
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as { messages?: ChatMessage[] };

        if (!body.messages || body.messages.length === 0) {
            return NextResponse.json(
                { error: "Nenhuma mensagem enviada." },
                { status: 400 }
            );
        }

        const { messages } = body;

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            console.error("GROQ_API_KEY não definida");
            return NextResponse.json(
                {
                    error:
                        "Configuração de IA ausente. Defina GROQ_API_KEY nas variáveis de ambiente.",
                },
                { status: 500 }
            );
        }

        // Monta mensagens no formato do Groq/OpenAI-compatible
        const payload = {
            model: "llama-3.1-8b-instant", // modelo rápido e barato para chat
            messages: [
                { role: "system", content: agendaSalaoSystemPrompt },
                ...messages.map((m) => ({
                    role: m.role,
                    content: m.content,
                })),
            ],
            temperature: 0.4,
        };

        const groqRes = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!groqRes.ok) {
            const errorText = await groqRes.text();
            console.error("[AI_AGENDA_GROQ_ERROR]", groqRes.status, errorText);
            return NextResponse.json(
                {
                    error:
                        "O assistente de agenda teve um problema ao contactar o serviço de IA (Groq).",
                },
                { status: 502 }
            );
        }

        const data = (await groqRes.json()) as any;

        const reply: string =
            data.choices?.[0]?.message?.content?.trim() ??
            "Desculpa, não consegui gerar uma resposta agora.";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("[AI_AGENDA_ERROR]", error);
        return NextResponse.json(
            { error: "Erro ao falar com o agente de agenda." },
            { status: 500 }
        );
    }
}
