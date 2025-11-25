// prisma/seed-roles.ts
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // 👇 AJUSTE ESTES EMAILS PARA OS QUE JÁ EXISTEM NO SEU BD
    const adminEmail = "admin@example.com";
    const clientEmail = "cliente@example.com";

    // ADMIN
    const admin = await prisma.user.update({
        where: { email: adminEmail },
        data: { role: UserRole.ADMIN },
    });

    // CLIENT
    const client = await prisma.user.update({
        where: { email: clientEmail },
        data: { role: UserRole.CLIENT },
    });

    console.log("✅ Usuário ADMIN configurado:", admin.email, admin.role);
    console.log("✅ Usuário CLIENT configurado:", client.email, client.role);
}

main()
    .catch((err) => {
        console.error("Erro ao configurar roles:", err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
