import prisma from "@/lib/prisma";

/**
 * Checks if the user's points have expired (last updated in a previous year)
 * If expired, resets points to 0 and records a transaction.
 */
export async function checkAndResetExpiredPoints(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true, pointsUpdatedAt: true }
    });

    if (!user || user.points === 0) return user;

    const currentYear = new Date().getFullYear();
    const lastUpdatedYear = user.pointsUpdatedAt.getFullYear();

    if (lastUpdatedYear < currentYear) {
      // Points have expired (it is a new year)
      const expiredAmount = user.points;
      
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          points: 0,
          pointsUpdatedAt: new Date(),
          pointTransactions: {
            create: {
              amount: -expiredAmount,
              type: 'EXPIRE',
              description: `Điểm hết hạn của năm ${lastUpdatedYear}`
            }
          }
        }
      });
      return updatedUser;
    }
    
    return user;
  } catch (error) {
    console.error("Error in checkAndResetExpiredPoints:", error);
    return null;
  }
}
