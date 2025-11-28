// src/server/appointments/createAppointment.ts
"use server";

import prisma from "@/lib/prisma";
import type { CreateAppointmentDTO } from "@/dtos/appointment";

export async function createAppointment(dto: CreateAppointmentDTO) {
  const {
    userId,
    clientName,
    clientEmail,
    clientPhone,
    serviceId,
    serviceIds,
    professionalId,
    date,
    time,
  } = dto;

  const appointmentDate = new Date(`${date}T${time}:00`);

  // validamos conflito por horário exato + profissional (mesmo comportamento anterior)
  const conflict = await prisma.appointment.findFirst({
    where: {
      professionalId,
      appointmentDate,
    },
  });

  if (conflict) {
    throw new Error("Já existe um agendamento para esse horário/profissional.");
  }

  // garante que temos uma lista de serviços (pelo menos o principal)
  const allServiceIds = serviceIds && serviceIds.length > 0
    ? serviceIds
    : [serviceId];

  // cria o agendamento principal
  const appointment = await prisma.appointment.create({
    data: {
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      appointmentDate,
      time,
      userId,
      serviceId,        // principal
      professionalId,
      services: {       // 🆕 cria as linhas na tabela de junção
        create: allServiceIds.map((sid) => ({ serviceId: sid })),
      },
    },
    include: {
      service: true,
      professional: true,
      services: {
        include: { service: true },
      },
    },
  });

  return appointment;
}
