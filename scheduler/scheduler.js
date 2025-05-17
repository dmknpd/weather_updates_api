const cron = require("node-cron");
const subscriptionService = require("../services/subscriptionService");
const scheduleConfig = require("../config/scheduler");

const scheduleWeatherUpdates = (frequency, cronExpression) => {
  cron.schedule(cronExpression, async () => {
    console.log(`Sending emails with frequency: ${frequency}`);
    try {
      await subscriptionService.sendWeatherUpdates(frequency);
      console.log(`Emails successfully sent (${frequency}).`);
    } catch (error) {
      console.error(`Error sending emails (${frequency}):`, error.message);
    }
  });
};

const startSchedulers = () => {
  const schedule = Object.entries(scheduleConfig);

  for (let [frequency, cronExpression] of schedule) {
    if (cronExpression) {
      scheduleWeatherUpdates(frequency, cronExpression);
    } else {
      console.warn(`Invalid cron expression for frequency: ${frequency}`);
    }
  }
  console.log("All schedulers started.");
};

module.exports = { startSchedulers };
