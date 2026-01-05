/**
 * Standalone Logger for Backend
 * No dependencies on express or other frameworks
 * Works in Next.js API routes
 */

export function log(message: string, source = "backend") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

