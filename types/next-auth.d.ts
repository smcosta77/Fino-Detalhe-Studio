// src/types/next-auth.d.ts
import type { DefaultSession, DefaultUser } from "next-auth";
import type { UserRole } from "@prisma/client";

declare module "next-auth" {
    interface User extends DefaultUser {
        id: string;
        role: UserRole;

        stripe_customer_id?: string | null;
        times?: string[];
        address?: string;
        phone?: string;
        status?: boolean;
        timeZone?: string | null;

        createdAt?: string | Date;
        updatedAt?: string | Date;
    }
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            role: UserRole;
            stripe_customer_id?: string | null;
            times?: string[];
            address?: string;
            phone?: string;
            status?: boolean;
            timeZone?: string | null;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: UserRole;
        stripe_customer_id?: string | null;
    }
}
