import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import * as cookieParser from 'cookie-parser';

describe('Auth (e2e)', () => {
    let app: INestApplication;
    let prisma: PrismaService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.use(cookieParser());
        app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
        app.setGlobalPrefix('api');

        await app.init();

        prisma = app.get<PrismaService>(PrismaService);
        await prisma.cleanDatabase();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('/api/auth/signup (POST)', () => {
        it('should create a new user', () => {
            return request(app.getHttpServer())
                .post('/api/auth/signup')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'Password123',
                    age: 25,
                    onboarding: {
                        lifeAreas: {
                            wellness: 7,
                            productivity: 8,
                            finance: 6,
                            relationships: 7,
                            learning: 9,
                            sleep: 6,
                        },
                        primaryGoals: ['Goal 1', 'Goal 2', 'Goal 3'],
                        currentHabits: ['Habit 1', 'Habit 2'],
                        budget: 15000,
                        wakeTime: '07:00',
                        bedTime: '23:00',
                    },
                })
                .expect(201)
                .expect((res) => {
                    expect(res.body).toHaveProperty('user');
                    expect(res.body).toHaveProperty('accessToken');
                    expect(res.body.user.email).toBe('test@example.com');
                    expect(res.body.user.userId).toMatch(/^TEST-\d{2}$/);
                });
        });

        it('should reject duplicate email', () => {
            return request(app.getHttpServer())
                .post('/api/auth/signup')
                .send({
                    name: 'Test User',
                    email: 'test@example.com',
                    password: 'Password123',
                    age: 25,
                    onboarding: {
                        lifeAreas: {
                            wellness: 7,
                            productivity: 8,
                            finance: 6,
                            relationships: 7,
                            learning: 9,
                            sleep: 6,
                        },
                        primaryGoals: ['Goal 1', 'Goal 2', 'Goal 3'],
                        currentHabits: ['Habit 1'],
                        budget: 15000,
                        wakeTime: '07:00',
                        bedTime: '23:00',
                    },
                })
                .expect(409);
        });

        it('should reject weak password', () => {
            return request(app.getHttpServer())
                .post('/api/auth/signup')
                .send({
                    name: 'Test User 2',
                    email: 'test2@example.com',
                    password: 'weak',
                    age: 25,
                    onboarding: {
                        lifeAreas: {
                            wellness: 7,
                            productivity: 8,
                            finance: 6,
                            relationships: 7,
                            learning: 9,
                            sleep: 6,
                        },
                        primaryGoals: ['Goal 1', 'Goal 2', 'Goal 3'],
                        currentHabits: [],
                        budget: 15000,
                        wakeTime: '07:00',
                        bedTime: '23:00',
                    },
                })
                .expect(400);
        });
    });

    describe('/api/auth/login (POST)', () => {
        it('should login with valid credentials', () => {
            return request(app.getHttpServer())
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'Password123',
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body).toHaveProperty('user');
                    expect(res.body).toHaveProperty('accessToken');
                    expect(res.headers['set-cookie']).toBeDefined();
                });
        });

        it('should reject invalid credentials', () => {
            return request(app.getHttpServer())
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'WrongPassword',
                })
                .expect(401);
        });
    });

    describe('/api/auth/me (GET)', () => {
        let accessToken: string;

        beforeAll(async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'Password123',
                });

            accessToken = response.body.accessToken;
        });

        it('should get current user with valid token', () => {
            return request(app.getHttpServer())
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.email).toBe('test@example.com');
                });
        });

        it('should reject without token', () => {
            return request(app.getHttpServer())
                .get('/api/auth/me')
                .expect(401);
        });
    });

    describe('/api/auth/logout (POST)', () => {
        let accessToken: string;

        beforeAll(async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'Password123',
                });

            accessToken = response.body.accessToken;
        });

        it('should logout successfully', () => {
            return request(app.getHttpServer())
                .post('/api/auth/logout')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200)
                .expect((res) => {
                    expect(res.body.message).toBe('Logged out successfully');
                });
        });
    });
});
