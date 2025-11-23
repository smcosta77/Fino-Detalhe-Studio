// src/config/salao.ts
export const SALAO_NOME = "NailsPro Studio";

export const HORARIO_FUNCIONAMENTO = {
    dias: ["segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
    abre: "09:00",
    fecha: "19:00",
};

export const SERVICOS = [
    { codigo: "manicure_simples", nome: "Manicure simples", duracaoMin: 40 },
    { codigo: "pedicure_simples", nome: "Pedicure simples", duracaoMin: 40 },
    { codigo: "combo_maos_pes", nome: "Combo mãos + pés", duracaoMin: 80 },
    { codigo: "gel_na_tips", nome: "Gel na tips", duracaoMin: 90 },
    { codigo: "manutencao_gel", nome: "Manutenção de gel", duracaoMin: 70 },
    { codigo: "spa_das_maos", nome: "Spa das mãos", duracaoMin: 60 },
];

export const PROFISSIONAIS = [
    { nome: "Ana", especialidades: ["manicure", "gel", "nail art"] },
    { nome: "Bruna", especialidades: ["manicure", "pedicure"] },
    { nome: "Carla", especialidades: ["manicure", "gel"] },
    { nome: "Beatriz", especialidades: ["manicure", "gel"] },
];
