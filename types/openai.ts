// src/lib/openai.ts
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error("OPENAI_API_KEY não está definida nas variáveis de ambiente.");
}

export const openai = new OpenAI({
    apiKey,
});
