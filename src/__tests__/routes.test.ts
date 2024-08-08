import app from "../server";
import supertest from "supertest";
import request from "supertest";

describe("GET /", () => {
  test("should send back some data", async () => {
    //@ts-ignore
    const res = await supertest(app).get("/");
    expect(res.body.message).toBe("hello");
  });
});

/* describe("POST /user", function () {
  it("responds with json", async () => {
    //@ts-ignore
    const res = await request(app)
      .post("/user")
      .send({ username: "hello", password: "hola" })
      .set("Accept", "application/json");

    expect(res.headers["Content-Type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
  });
}); */
