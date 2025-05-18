jest.mock("../services/weatherService");
const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const weatherController = require("../controllers/weatherController");
const weatherService = require("../services/weatherService");

const app = express();
app.use(bodyParser.json());
app.get("/api/weather", weatherController.getWeather);

describe("GET /api/weather", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return weather data for a valid city", async () => {
    const mockWeatherData = {
      temperature: 14.9,
      humidity: 54,
      description: "Patchy rain nearby",
    };

    weatherService.currentWeather.mockResolvedValue(mockWeatherData);

    const response = await request(app)
      .get("/api/weather")
      .query({ city: "London" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockWeatherData);
  });

  it("should return 400 for missing city parameter", async () => {
    const response = await request(app).get("/api/weather");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "Invalid request" });
  });

  it("should return 404 for non-existent city", async () => {
    weatherService.currentWeather.mockRejectedValue(
      new Error("City not found")
    );

    const response = await request(app)
      .get("/api/weather")
      .query({ city: "Atlantis" });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: "City not found" });
  });
});
