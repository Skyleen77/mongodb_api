const request = require("supertest");

// Mock
const user = require('./mock/user.js');

const baseUrl = 'http://localhost:3000';

describe(`${baseUrl}/user/`, () => {
  describe('GET user/:id =>', () => {
    test("Should response the GET method", async () => {
      const res = await request(baseUrl)
        .get('/user/6290d9e743550e139005b81f')
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(200);
      expect(res.type).toBe('application/json');
      expect(JSON.stringify(res.body)).toBe(JSON.stringify(user));
    });

    test("Should get an user with id 627e0381fbb1e6a08fce7b4a", async () => {
      const res = await request(baseUrl)
        .get('/user/627e0381fbb1e6a08fce7b4a')
        .set('Accept', 'application/json');

      expect(JSON.stringify(res.body)).toBe(JSON.stringify(user));
    });
  });
});