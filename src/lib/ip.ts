import { headers } from "next/headers";

export async function getClientIp(): Promise<string> {
  try {
    const headersList = await headers();
    const cfConnectingIp = headersList.get("cf-connecting-ip");
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");

    if (cfConnectingIp) return cfConnectingIp.trim();
    if (forwardedFor) return forwardedFor.split(",")[0].trim();
    if (realIp) return realIp.trim();
    
    return "unknown";
  } catch (error) {
    return "unknown";
  }
}
