const request = require("supertest");
const app = require("../app");
const db = require("../models/");

beforeAll(async () => {
  // force: true will drop the table if it already exists
  await db.sequelize.sync({ force: true });
});

describe("Stats tests", () => {
  test("test invalid shortcode is handled", async (done) => {
    const response = await request(app).get("api/urls/invalidshortcode/stats");
    expect(response.status).toBe(400);
    done();
  });

  test("Test valid shortcode return its stats", async (done) => {
    const response = await request(app).get("api/urls/validcode/stats");
    expect(response.status).toBe(200);
    expect(response.body.data.history.length).toBeGreaterThan(0);
    done();
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
