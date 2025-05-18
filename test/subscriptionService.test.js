jest.mock("../models");
jest.mock("../services/emailService");
jest.mock("../services/weatherService");
jest.mock("../utils/tokenUtils");

const db = require("../models");
const emailService = require("../services/emailService");
const weatherService = require("../services/weatherService");
const { generateToken, isValidToken } = require("../utils/tokenUtils");

const subscriptionService = require("../services/subscriptionService");

describe("Subscription Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("subscribe", () => {
    it("should successfully subscribe a new user", async () => {
      db.subscription.findOne.mockResolvedValue(null);
      db.subscription.create.mockResolvedValue({});
      generateToken.mockReturnValue("mockedToken");
      emailService.sendConfirmationEmail.mockResolvedValue();

      await expect(
        subscriptionService.subscribe("test@example.com", "Paris", "daily")
      ).resolves.not.toThrow();
      expect(db.subscription.create).toHaveBeenCalledWith({
        email: "test@example.com",
        city: "Paris",
        frequency: "daily",
        confirmationToken: "mockedToken",
      });
      expect(emailService.sendConfirmationEmail).toHaveBeenCalledWith(
        "test@example.com",
        "Paris",
        "daily",
        "mockedToken"
      );
    });

    it("should throw an error if email already subscribed", async () => {
      db.subscription.findOne.mockResolvedValue({});

      await expect(
        subscriptionService.subscribe("test@example.com", "Paris", "daily")
      ).rejects.toThrow("Email already subscribed");
      expect(db.subscription.create).not.toHaveBeenCalled();
    });
  });

  describe("confirmSubscription", () => {
    it("should successfully confirm subscription", async () => {
      const mockSubscription = {
        confirmed: false,
        update: jest.fn().mockResolvedValue(),
        email: "test@example.com",
        city: "Paris",
        frequency: "daily",
      };
      db.subscription.findOne.mockResolvedValue(mockSubscription);
      generateToken.mockReturnValue("newUnsubscribeToken");
      isValidToken.mockReturnValue(true);

      await expect(
        subscriptionService.confirmSubscription("validToken")
      ).resolves.not.toThrow();
      expect(mockSubscription.update).toHaveBeenCalledWith({
        confirmed: true,
        confirmationToken: null,
        unsubscribeToken: "newUnsubscribeToken",
      });
      expect(emailService.sendUnsubscribeEmail).toHaveBeenCalledWith(
        "test@example.com",
        "Paris",
        "daily",
        "newUnsubscribeToken"
      );
    });

    it("should throw an error if token is invalid", async () => {
      isValidToken.mockReturnValue(false);

      await expect(
        subscriptionService.confirmSubscription("invalidToken")
      ).rejects.toThrow("Invalid token");
    });

    it("should throw an error if token not found", async () => {
      db.subscription.findOne.mockResolvedValue(null);
      isValidToken.mockReturnValue(true);

      await expect(
        subscriptionService.confirmSubscription("validToken")
      ).rejects.toThrow("Token not found");
    });
  });

  describe("unsubscribe", () => {
    it("should successfully unsubscribe", async () => {
      const mockSubscription = {
        destroy: jest.fn().mockResolvedValue(),
      };
      db.subscription.findOne.mockResolvedValue(mockSubscription);
      isValidToken.mockReturnValue(true);

      await expect(
        subscriptionService.unsubscribe("validToken")
      ).resolves.not.toThrow();
      expect(mockSubscription.destroy).toHaveBeenCalled();
    });

    it("should throw an error if token is invalid", async () => {
      isValidToken.mockReturnValue(false);

      await expect(
        subscriptionService.unsubscribe("invalidToken")
      ).rejects.toThrow("Invalid token");
    });

    it("should throw an error if token not found", async () => {
      db.subscription.findOne.mockResolvedValue(null);
      isValidToken.mockReturnValue(true);

      await expect(
        subscriptionService.unsubscribe("validToken")
      ).rejects.toThrow("Token not found");
    });
  });

  describe("sendWeatherUpdates", () => {
    it("should send weather updates to confirmed subscribers", async () => {
      const mockSubscription = {
        email: "test@example.com",
        city: "Paris",
        frequency: "daily",
        unsubscribeToken: "unsubscribeToken",
      };
      db.subscription.findAll.mockResolvedValue([mockSubscription]);

      const mockWeatherData = {
        temperature: 22,
        humidity: 60,
        description: "Clear sky",
      };
      weatherService.currentWeather.mockResolvedValue(mockWeatherData);
      emailService.sendWeatherUpdate.mockResolvedValue();

      await expect(
        subscriptionService.sendWeatherUpdates("daily")
      ).resolves.not.toThrow();
      expect(emailService.sendWeatherUpdate).toHaveBeenCalledWith(
        "test@example.com",
        "Paris",
        "daily",
        "unsubscribeToken",
        mockWeatherData
      );
    });

    it("should log an error if weather data fetching fails", async () => {
      const mockSubscription = {
        email: "test@example.com",
        city: "Paris",
        frequency: "daily",
        unsubscribeToken: "unsubscribeToken",
      };
      db.subscription.findAll.mockResolvedValue([mockSubscription]);
      weatherService.currentWeather.mockRejectedValue(
        new Error("Weather API error")
      );

      await expect(
        subscriptionService.sendWeatherUpdates("daily")
      ).resolves.not.toThrow();
      expect(emailService.sendWeatherUpdate).not.toHaveBeenCalled();
    });
  });
});
