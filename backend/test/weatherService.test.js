jest.mock("axios");
const axios = require("axios");
const weatherService = require("../services/weatherService");

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe("Weather Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch current weather data", async () => {
    const mockData = {
      data: {
        location: { name: "London" },
        current: {
          temp_c: 14.9,
          humidity: 54,
          condition: { text: "Patchy rain nearby" },
        },
      },
    };

    axios.get.mockResolvedValue(mockData);

    const result = await weatherService.currentWeather("London");
    expect(result).toEqual({
      temperature: 14.9,
      humidity: 54,
      description: "Patchy rain nearby",
    });
  });

  it("should throw an error when city not found", async () => {
    axios.get.mockRejectedValue(new Error("City not found"));

    await expect(weatherService.currentWeather("UnknownCity")).rejects.toThrow(
      "Invalid request"
    );
  });
});
