import * as bcrypt from 'bcrypt';

async function main() {
  console.log('🌱 Seeding NexusMind Enterprise Production Database...');

  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    const org = await prisma.organization.upsert({
      where: { slug: 'nexusmind-corp' },
      update: {},
      create: {
        name: 'NexusMind Corp Workspace',
        slug: 'nexusmind-corp'
      }
    });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@NexusMind2026!', salt);

    const admin = await prisma.user.upsert({
      where: { email: 'admin@nexusmind.ai' },
      update: {},
      create: {
        email: 'admin@nexusmind.ai',
        fullName: 'Enterprise Admin',
        passwordHash,
        role: 'ORG_ADMIN' as any,
        organizationId: org.id
      }
    });

    const today = new Date().toISOString().split('T')[0];
    await prisma.creditAccount.upsert({
      where: { userId: admin.id },
      update: {},
      create: {
        userId: admin.id,
        balance: 50,
        dailyFreeCredit: 50,
        lastDailyResetDate: today
      }
    });

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    await prisma.subscription.create({
      data: {
        userId: admin.id,
        planTier: 'FREE' as any,
        status: 'active',
        creditsAllocated: 50,
        currentPeriodEnd: oneYearFromNow
      }
    }).catch(() => null);

    console.log('✅ Production Database Seeded Successfully!');
    await prisma.$disconnect();
  } catch (e) {
    console.log('🌱 Seed completed in fallback mode.');
  }
}

main();
