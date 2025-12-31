import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Modify DATABASE_URL to disable prepared statements if needed
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) return url;

  // Add pgbouncer=true to disable prepared statements when using connection pooler
  // Required for Supabase pooler in both development and production
  if (!url.includes("pgbouncer=true")) {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}pgbouncer=true`;
  }

  return url;
};

export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
});

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;