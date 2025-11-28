// src/config/salao.ts
export const SALAO_NOME = "Fino Detalhe Studio";

export const HORARIO_FUNCIONAMENTO = {
    dias: ["segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
    abre: "09:00",
    fecha: "19:00",
};

export const SERVICOS = [
    { codigo: "manicure", nome: "Manicure simples", duracaoMin: 60, preco: 30 },
    { codigo: "pedicure", nome: "Pedicure simples", duracaoMin: 60, preco: 35 },
    { codigo: "combo_maos_pes", nome: "Combo mãos + pés", duracaoMin: 90, preco: 60 },
    { codigo: "alongamento_em_fibra", nome: "Fibra de vidro", duracaoMin: 120, preco: 150 },
    { codigo: "manutencao_alongamento", nome: "Manutenção alongamento", duracaoMin: 90, preco: 110 },
    { codigo: "banho_de_gel", nome: "Banho de gel", duracaoMin: 60, preco: 90 },
    { codigo: "blindagem", nome: "Blindagem", duracaoMin: 60, preco: 70 },
    { codigo: "remocao_de_unha", nome: "Remoção de unha", duracaoMin: 60, preco: 70 },
    { codigo: "decoracao", nome: "Manicure em gel", duracaoMin: 60, preco: 50 },
    { codigo: "pedicure_em_gel", nome: "Pedicure em gel", duracaoMin: 60, preco: 55 },
];

export const PROFISSIONAIS = [
    { nome: "Beatriz", especialidades: ["manicure", "pedicure", "combo_maos_pes", "alongamento_em_fibra", "manutencao_alongamento", "banho_de_gel", "blindagem", "remocao_de_unha", "decoracao", "pedicure_em_gel"] },
];
