// src/types/agenda.ts
export type AgendaAction = "criar" | "reagendar" | "cancelar" | "nenhuma";

export type AgendaCommandBase = {
    action: AgendaAction;
};

export type AgendaCriarCommand = AgendaCommandBase & {
    action: "criar";
    nomeCliente: string;
    servicoCodigo: string;
    data: string; // "YYYY-MM-DD"
    hora: string; // "HH:mm"
    profissional?: string;
};

export type AgendaReagendarCommand = AgendaCommandBase & {
    action: "reagendar";
    agendamentoId?: string;
    nomeCliente: string;
    dataAntiga?: string;
    horaAntiga?: string;
    novaData: string;
    novaHora: string;
};

export type AgendaCancelarCommand = AgendaCommandBase & {
    action: "cancelar";
    agendamentoId?: string;
    nomeCliente: string;
    data: string;
    hora: string;
};

export type AgendaNenhumaCommand = AgendaCommandBase & {
    action: "nenhuma";
    motivo?: string;
};

export type AgendaCommand =
    | AgendaCriarCommand
    | AgendaReagendarCommand
    | AgendaCancelarCommand
    | AgendaNenhumaCommand;
