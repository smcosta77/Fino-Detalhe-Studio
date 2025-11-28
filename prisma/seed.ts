// prisma/seed.ts
import prisma from "../src/lib/prisma";
import { SERVICOS, PROFISSIONAIS } from "../src/config/salao";

async function main() {
    const user = await prisma.user.findFirst();

    if (!user) {
        throw new Error(
            "Nenhum usuário encontrado. Crie um User antes de rodar o seed."
        );
    }

    const userId = user.id;
    console.log("[SEED] Usando userId:", userId);

    // --- SERVIÇOS -------------------------------------------------
    for (const s of SERVICOS) {
        await prisma.service.upsert({
            where: { code: s.codigo },
            update: {
                name: s.nome,
                price: s.preco,       // usa o preço da config
                duration: s.duracaoMin,
                status: true,
                userId,
            },
            create: {
                code: s.codigo,
                name: s.nome,
                price: s.preco,
                duration: s.duracaoMin,
                status: true,
                userId,
            },
        });
    }

    const validCodes = SERVICOS.map((s) => s.codigo);
    await prisma.service.updateMany({
        where: {
            userId,
            code: { notIn: validCodes },
        },
        data: {
            status: false,
        },
    });

    console.log("[SEED] Serviços sincronizados a partir de config/salao.ts");

    // --- PROFISSIONAIS --------------------------------------------
    for (const p of PROFISSIONAIS) {
        await prisma.professional.upsert({
            where: { name: p.nome },
            update: {
                specialties: p.especialidades,
                status: true,
                userId,
            },
            create: {
                name: p.nome,
                specialties: p.especialidades,
                status: true,
                userId,
            },
        });
    }

    const validNames = PROFISSIONAIS.map((p) => p.nome);
    await prisma.professional.updateMany({
        where: {
            userId,
            name: { notIn: validNames },
        },
        data: {
            status: false,
        },
    });

    console.log("[SEED] Profissionais sincronizados a partir de config/salao.ts");
}

main()
    .then(async () => {
        console.log("[SEED] Finalizado com sucesso ✅");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error("[SEED] Erro ❌", e);
        await prisma.$disconnect();
        process.exit(1);
    });
