const request = require("supertest");
const app = require("../app");
const db = require("../models/");

beforeAll(async () => {
  // force: true will drop the table if it already exists
  await db.sequelize.sync({ force: true });
});
/*
afterAll(async () => {
});
*/
describe("Test Url can be shortened", async () => {
  test("Url can be shortened", async (done) => {
    const response = await request(app).post("/api/create").send({});

    expect(response.status).toBe(201);
    done();
  });
});
