const request = require("supertest");
const app = require("../app");
const db = require("../models/");

beforeAll(async () => {
  // force: true will drop the table if it already exists
  await db.sequelize.sync({ force: true });
});

describe("Test Url can be shortened", () => {
  test("Url can be shortened and its 6 characters only", async (done) => {
    const response = await request(app).post("/api/create").send({
      url: "https://github.com/niyiojeyinka", //
    });

    expect(response.status).toBe(201);
    expect(response.body.data.shortcode.length).toEqual(6);
    done();
  });

  test("Does not allow invalid URL", async (done) => {
    const response = await request(app).post("/api/create").send({
      url: "invalid/niyiojeyinka", //
    });

    expect(response.status).toBe(400);
    done();
  });
});

describe("Test Url can be shortened", () => {
  test("custom shortcode can be created and its min 4 chars", async (done) => {
    const response = await request(app).post("/api/create/niyi").send({
      url: "https://github.com/niyiojeyinka", //
    });

    expect(response.status).toBe(201);
    done();
  });

  test("Does not allow invalid shortcode", async (done) => {
    const response = await request(app).post("/api/create/ni").send({
      url: "https://github.com/niyiojeyinka", //
    });

    expect(response.status).toBe(400);
    done();
  });
});

afterAll(async () => {
  await db.sequelize.close();
});
