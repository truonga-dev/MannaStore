"use server";

import prisma from "@/lib/prisma";

export async function getStoreSettings() {
  try {
    const settings = await prisma.storeSetting.findMany();
    
    // Default fallback values
    const config: Record<string, any> = {
      baseShippingFee: 30000,
      freeShippingThreshold: 500000,
      enableCod: true,
      enableBankTransfer: true,
      sepayBankId: process.env.SEPAY_BANK_ID || "MB",
      sepayAccountNo: process.env.SEPAY_ACCOUNT_NO || "0123456789",
    };

    settings.forEach((s) => {
      if (s.key === "baseShippingFee") config.baseShippingFee = Number(s.value);
      if (s.key === "freeShippingThreshold") config.freeShippingThreshold = Number(s.value);
      if (s.key === "enableCod") config.enableCod = s.value === "true";
      if (s.key === "enableBankTransfer") config.enableBankTransfer = s.value === "true";
      if (s.key === "sepayBankId") config.sepayBankId = s.value;
      if (s.key === "sepayAccountNo") config.sepayAccountNo = s.value;
    });

    return config;
  } catch (error) {
    console.error("Error fetching store settings:", error);
    return {
      baseShippingFee: 30000,
      freeShippingThreshold: 500000,
      enableCod: true,
      enableBankTransfer: true,
      sepayBankId: process.env.SEPAY_BANK_ID || "MB",
      sepayAccountNo: process.env.SEPAY_ACCOUNT_NO || "0123456789",
    };
  }
}
