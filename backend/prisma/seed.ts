import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create test user
    const passwordHash = await bcrypt.hash('nexura123', 12);

    const user = await prisma.user.upsert({
        where: { email: 'admin@nexura.com' },
        update: {},
        create: {
            email: 'admin@nexura.com',
            passwordHash,
            name: 'Alex Chen',
            age: 28,
            userId: 'ALEX-01',
            timezone: 'Asia/Kolkata',
            currency: 'INR',
            emailVerified: true,
            settings: {
                create: {
                    assistantName: 'NEXURA AI',
                    aiPersonality: 'balanced',
                },
            },
            onboarding: {
                create: {
                    wellnessScore: 7,
                    productivityScore: 8,
                    financeScore: 6,
                    relationshipsScore: 7,
                    learningScore: 9,
                    sleepScore: 6,
                    primaryGoals: JSON.stringify([
                        'Improve daily exercise routine',
                        'Better financial management',
                        'Enhance work productivity',
                    ]),
                    currentHabits: JSON.stringify([
                        'Morning meditation',
                        'Daily reading',
                        'Expense tracking',
                    ]),
                    monthlyBudget: 15000,
                    wakeTime: '07:00',
                    bedTime: '23:00',
                },
            },
        },
    });

    console.log('✅ Created test user:', user.email);
    console.log('📧 Email: admin@nexura.com');
    console.log('🔑 Password: nexura123');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
