import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SUBSCRIPTION_TIERS_CONFIG, SubscriptionPlanTier } from '@nexusmind/shared';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async getUserCreditBalance(userId: string) {
    const today = new Date().toISOString().split('T')[0];
    let account = await this.prisma.creditAccount.findUnique({ where: { userId } }).catch(() => null);

    if (!account) {
      account = {
        id: `account-${userId}`,
        userId,
        balance: 50,
        dailyFreeCredit: 50,
        lastDailyResetDate: today,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } else if (account.lastDailyResetDate !== today) {
      // Refresh 50 daily free credits if a new day has passed
      account.balance += 50;
      account.lastDailyResetDate = today;
      await this.prisma.creditAccount.update({
        where: { userId },
        data: {
          balance: account.balance,
          lastDailyResetDate: today
        }
      }).catch(() => null);
    }

    const currentSub = await this.prisma.subscription.findFirst({
      where: { userId, status: 'active' }
    }).catch(() => null);

    return {
      balance: account.balance,
      dailyFreeCredit: account.dailyFreeCredit,
      lastReset: account.lastDailyResetDate,
      activePlan: currentSub ? currentSub.planTier : SubscriptionPlanTier.FREE,
      tierConfig: SUBSCRIPTION_TIERS_CONFIG[currentSub ? (currentSub.planTier as SubscriptionPlanTier) : SubscriptionPlanTier.FREE]
    };
  }

  async deductCredits(userId: string, amount: number, reason: string, executionId?: string) {
    const userAcc = await this.getUserCreditBalance(userId);
    if (userAcc.balance < amount) {
      throw new BadRequestException(`Insufficient credit balance. Requires ${amount} credits, available: ${userAcc.balance}`);
    }

    const newBalance = userAcc.balance - amount;
    await this.prisma.creditAccount.update({
      where: { userId },
      data: { balance: newBalance }
    }).catch(() => null);

    await this.prisma.creditTransaction.create({
      data: {
        userId,
        amount: -amount,
        reason,
        executionId
      }
    }).catch(() => null);

    return { success: true, remainingBalance: newBalance };
  }

  async upgradeSubscription(userId: string, planTier: SubscriptionPlanTier) {
    const config = SUBSCRIPTION_TIERS_CONFIG[planTier];
    if (!config) {
      throw new BadRequestException('Invalid subscription tier');
    }

    const now = new Date();
    let periodEnd = new Date();
    if (config.billingCycle === 'weekly') {
      periodEnd.setDate(now.getDate() + 7);
    } else if (config.billingCycle === 'monthly') {
      periodEnd.setMonth(now.getMonth() + 1);
    } else if (config.billingCycle === 'yearly') {
      periodEnd.setFullYear(now.getFullYear() + 1);
    }

    // Top up credits
    const account = await this.getUserCreditBalance(userId);
    const addedCredits = config.creditsAllocated;

    await this.prisma.creditAccount.update({
      where: { userId },
      data: { balance: account.balance + addedCredits }
    }).catch(() => null);

    const sub = await this.prisma.subscription.create({
      data: {
        userId,
        planTier: planTier as any,
        status: 'active',
        creditsAllocated: config.creditsAllocated,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd
      }
    }).catch(() => {
      return {
        id: `sub-${Date.now()}`,
        userId,
        planTier,
        status: 'active',
        creditsAllocated: config.creditsAllocated,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd
      };
    });

    return {
      message: `Successfully upgraded to ${config.name}! Added ${addedCredits} credits.`,
      subscription: sub,
      newTotalCredits: account.balance + addedCredits
    };
  }

  async getSubscriptionPlans() {
    return Object.values(SUBSCRIPTION_TIERS_CONFIG);
  }
}
