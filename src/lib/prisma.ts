import { PrismaClient } from "@prisma/client";

// Declare global prisma property
declare global {
  var prisma: PrismaClient | undefined;
}

// Check if we're in a client-side or server-side context
const isServerSide = typeof window === "undefined";

export const db = isServerSide
  ? globalThis.prisma || new PrismaClient()  // Instantiate only on server-side (SSR)
  : (globalThis.prisma || new PrismaClient());  // On the client side, avoid this entirely if needed

if (process.env.NODE_ENV !== "production" && isServerSide) {
  // In development, preserve the Prisma client instance to avoid multiple instances
  globalThis.prisma = db;
}

// Export db for use in other parts of the application
export default db;
