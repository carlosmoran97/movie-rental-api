const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../app');
const { set } = require('../config/redis');

describe('Routes test', () => {
    it('should login', async () => {
        const res = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'carlosmoran.97cr@gmail.com',
                password: 'admin'
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should not login', async () => {
        const res = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'carlosmoran.97cr@gmail.com',
                password: 'Wrong password'
            });
        expect(res.statusCode).toEqual(400);
    });

    it('should register a new user', async () => {
        // Will have id 3
        const res = await request(app)
            .post('/api/v1/register')
            .send({
                name: 'Carlos 1',
                email: 'carlosmoran.dev@outlook.com',
                password: '1234'
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should not register a duplicated email', async () => {
        const res = await request(app)
            .post('/api/v1/register')
            .send({
                name: 'Carlos 2',
                email: 'carlosmoran.dev@outlook.com',
                password: '1234'
            });
        expect(res.statusCode).toEqual(400);
    });

    it('should logout', async () => {
        let res = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'carlosmoran.dev@outlook.com',
                password: '1234'
            });
        const token = res.body.token
        res = await request(app)
            .post('/api/v1/logout')
            .set({
                Authorization: `Bearer ${token}`
            });

        expect(res.statusCode).toEqual(200);
    });

    it('should change user role', async () => {

        let res = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'carlosmoran.97cr@gmail.com',
                password: 'admin'
            });
        const token = res.body.token
        res = await request(app)
            .put('/api/v1/users/3/change-role')
            .send({
                role: 'Admin'
            })
            .set({
                Authorization: `Bearer ${token}`
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should send password recovery', async () => {
        const res = await request(app)
            .post('/api/v1/users/carlosmoran.dev@outlook.com/send-password-recovery');
        expect(res.statusCode).toEqual(200);
    });

    it('should create movie', async () => {
        let res = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'carlosmoran.97cr@gmail.com',
                password: 'admin'
            });
        const token = res.body.token;
        res = await request(app)
            .post('/api/v1/movies')
            .send({
                title: "Avengers: Endgame",
                description: "Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos, el malvado que diezmó el planeta y el universo.",
                rentalPrice: 6.99,
                salePrice: 19.99,
                availability: true,
                stock: 25
            })
            .set({
                Authorization: `Bearer ${token}`
            });
        expect(res.statusCode).toEqual(200);

    });

    it('should create another movie, with image', async () => {
        let res = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'carlosmoran.97cr@gmail.com',
                password: 'admin'
            });
        const token = res.body.token;
        const file = fs.readFileSync(path.join(__dirname, 'data', 'poster.jpg'));
        const image = new Buffer.from(file).toString('base64');
        res = await request(app)
            .post('/api/v1/movies')
            .send({
                title: "Avengers: Endgame",
                description: "Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos, el malvado que diezmó el planeta y el universo.",
                rentalPrice: 6.99,
                salePrice: 19.99,
                availability: true,
                stock: 25,
                image
            })
            .set({
                Authorization: `Bearer ${token}`
            });
        expect(res.statusCode).toEqual(200);

    });

    it('should not create movie because is unauthorized', async () => {

        res = await request(app)
            .post('/api/v1/movies')
            .send({
                title: "Avengers: Endgame",
                description: "Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para un enfrentamiento épico con Thanos, el malvado que diezmó el planeta y el universo.",
                rentalPrice: 6.99,
                salePrice: 19.99,
                availability: true,
                stock: 25
            });
        expect(res.statusCode).toEqual(401);

    });

    it('should update movie', async () => {
        let res = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'carlosmoran.97cr@gmail.com',
                password: 'admin'
            });
        const token = res.body.token;
        res = await request(app)
            .put('/api/v1/movies/2')
            .send({
                title: "Capitán América y el Soldado del Invierno",
                description: "Capitán América, Viuda Negra y un nuevo aliado, Falcon, se enfrentan a un enemigo inesperado mientras intentan exponer una conspiración que pone en riesgo al mundo.",
            })
            .set({
                Authorization: `Bearer ${token}`
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should get details of a movie', async () => {
        const res = await request(app)
            .get('/api/v1/movies/1');
        expect(res.statusCode).toEqual(200);
    });

    it('should the list of movies', async () => {
        const res = await request(app)
            .get('/api/v1/movies');
        expect(res.statusCode).toEqual(200);
    });

    it('should delete a movie', async () => {
        let res = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'carlosmoran.97cr@gmail.com',
                password: 'admin'
            });
        const token = res.body.token;
        res = await request(app)
            .delete('/api/v1/movies/2')
            .set({
                Authorization: `Bearer ${token}`
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should like a movie', async()=>{
        let res = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'user@example.com',
                password: '1234'
            });
        const token = res.body.token;
        res = await request(app)
            .post('/api/v1/likes')
            .send({
                movieId: 1
            })
            .set({
                Authorization: `Bearer ${token}`
            });
        expect(res.statusCode).toBe(200);
    });

    it('should buy a movie', async()=>{
        let res = await request(app)
        .post('/api/v1/login')
        .send({
            email: 'user@example.com',
            password: '1234'
        });
        const token = res.body.token;
        res = await request(app)
            .post('/api/v1/sales')
            .send({
                lines: [{
                    movieId: 1,
                    quantity: 1
                }]
            })
            .set({
                Authorization: `Bearer ${token}`
            });
        expect(res.statusCode).toBe(200);
    });

    it('should rent a movie', async()=>{
        let res = await request(app)
            .post('/api/v1/login')
            .send({
                email: 'user@example.com',
                password: '1234'
            });
        const token = res.body.token;
        res = await request(app)
            .post('/api/v1/rents')
            .send({
                lines: [{
                    movieId: 1,
                    quantity: 1
                }]
            })
            .set({
                Authorization: `Bearer ${token}`
            });
        expect(res.statusCode).toBe(200);
    });

    it('should return a movie', async()=>{
        let res = await request(app)
        .post('/api/v1/login')
        .send({
            email: 'user@example.com',
            password: '1234'
        });
        const token = res.body.token;
        res = await request(app)
            .put('/api/v1/rents/1/return')
            .set({
                Authorization: `Bearer ${token}`
            });
        expect(res.statusCode).toBe(200);
    });

    it('should not pay monetary penalty', async()=>{
        let res = await request(app)
        .post('/api/v1/login')
        .send({
            email: 'user@example.com',
            password: '1234'
        });
        const token = res.body.token;
        res = await request(app)
            .put('/api/v1/rents/1/return')
            .set({
                Authorization: `Bearer ${token}`
            });
        expect(res.statusCode).toBe(422);
    });
});