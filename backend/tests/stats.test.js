const request = require("supertest");
const app = require("../app");
const db = require("../models/");

beforeAll(async () => {
  // force: true will drop the table if it already exists
  await db.sequelize.sync({ force: true });
});

describe("Stats tests", () => {
  test("test invalid shortcode is handled", async (done) => {
    const response = await request(app).get("invalidshortcode/stats");
    expect(response.status).toBe(404);
    done();
  });

  test("Test valid shortcode return its stats", async (done) => {
    //insert url
    await db.Url.create({
      url: "https://www.aws.com/ec2",
      shortCode: "validcod",
    });
    //insert views
    await db.Visit.create({
      shortCode: "validcod",
    });

    const response = await request(app).get("/validcod/stats");
    expect(response.status).toBe(200);
    expect(response.body.data.novisits).toBeGreaterThan(0);
    done();
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
