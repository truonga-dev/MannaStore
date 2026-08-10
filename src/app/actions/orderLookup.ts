"use server";

import prisma from "@/lib/prisma";

export async function lookupOrder(formData: FormData) {
  const orderCode = formData.get("orderCode")?.toString();
  const phone = formData.get("phone")?.toString();

  if (!orderCode || !phone) {
    return { error: "Vui lòng nhập đầy đủ Mã đơn hàng và Số điện thoại." };
  }

  try {
    const searchTerm = orderCode.trim().replace(/^#/, ''); // Remove # if user typed it

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { orderCode: searchTerm },
          { id: { endsWith: searchTerm.toLowerCase() } },
          { id: { endsWith: searchTerm } }
        ],
        shippingPhone: phone.trim()
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });

    if (!order) {
      return { error: "Không tìm thấy đơn hàng. Vui lòng kiểm tra lại Mã đơn hàng hoặc Số điện thoại." };
    }

    return { success: true, order };
  } catch (error) {
    console.error("Order lookup error:", error);
    return { error: "Có lỗi xảy ra khi tra cứu. Vui lòng thử lại sau." };
  }
}
