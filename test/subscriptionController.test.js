const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const subscriptionController = require("../controllers/subscriptionController");
jest.mock("../services/subscriptionService");

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

const subscriptionService = require("../services/subscriptionService");

const app = express();
app.use(bodyParser.json());
app.get("/api/confirm/:token", subscriptionController.confirmSubscription);
app.get("/api/unsubscribe/:token", subscriptionController.unsubscribe);

describe("GET /api/confirm/:token", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should confirm subscription successfully with a valid token", async () => {
    subscriptionService.confirmSubscription.mockResolvedValue({});

    const response = await request(app).get("/api/confirm/validToken");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Subscription confirmed successfully",
    });
    expect(subscriptionService.confirmSubscription).toHaveBeenCalledWith(
      "validToken"
    );
  });

  it("should return 404 for a non-existent token", async () => {
    subscriptionService.confirmSubscription.mockRejectedValue(
      new Error("Token not found")
    );

    const response = await request(app).get("/api/confirm/invalidToken");

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "Token not found" });
    expect(subscriptionService.confirmSubscription).toHaveBeenCalledWith(
      "invalidToken"
    );
  });

  it("should return 400 for an invalid token error from the service", async () => {
    subscriptionService.confirmSubscription.mockRejectedValue(
      new Error("Invalid token")
    );

    const response = await request(app).get("/api/confirm/malformedToken");

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "Invalid token" });
    expect(subscriptionService.confirmSubscription).toHaveBeenCalledWith(
      "malformedToken"
    );
  });
});

describe("GET /api/unsubscribe/:token", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should unsubscribe successfully with a valid token", async () => {
    subscriptionService.unsubscribe.mockResolvedValue({});

    const response = await request(app).get(
      "/api/unsubscribe/validUnsubscribeToken"
    );

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Unsubscribed successfully" });
    expect(subscriptionService.unsubscribe).toHaveBeenCalledWith(
      "validUnsubscribeToken"
    );
  });

  it("should return 404 for a non-existent token", async () => {
    subscriptionService.unsubscribe.mockRejectedValue(
      new Error("Token not found")
    );

    const response = await request(app).get(
      "/api/unsubscribe/invalidUnsubscribeToken"
    );

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "Token not found" });
    expect(subscriptionService.unsubscribe).toHaveBeenCalledWith(
      "invalidUnsubscribeToken"
    );
  });

  it("should return 400 for an invalid token error from the service", async () => {
    subscriptionService.unsubscribe.mockRejectedValue(
      new Error("Invalid token")
    );

    const response = await request(app).get(
      "/api/unsubscribe/malformedUnsubscribeToken"
    );

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "Invalid token" });
    expect(subscriptionService.unsubscribe).toHaveBeenCalledWith(
      "malformedUnsubscribeToken"
    );
  });
});
