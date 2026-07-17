import cron from "node-cron"
import getCron from "get-cron"

const ISO_REGEX =
/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)Z?$/;

const SUPPORTED_REPEAT_OPTIONS = [
  "once",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "weekday",
  "weekends",
  "christmas",
  "christmas-eve",
  "new year",
  "new years-eve",
  "valentines"
];

export default function schedule(date, repeat, callback) {

  // Validate date type
  if (typeof date !== "string") {
    throw new TypeError(
      'The first argument "date" must be an ISO date string.'
    );
  }

  // Validate date format
  if (!ISO_REGEX.test(date)) {
    throw new Error(
      'Invalid ISO date. Expected "YYYY-MM-DDTHH:mm" or "YYYY-MM-DDTHH:mmZ".'
    );
  }

  // Validate repeat type
  if (typeof repeat !== "string") {
    throw new TypeError(
      'The second argument "repeat" must be a string.'
    );
  }

  // Validate repeat value
  if (!SUPPORTED_REPEAT_OPTIONS.includes(repeat)) {
    throw new Error(
      `Unsupported repeat option "${repeat}".`
    );
  }

  // Validate callback
  if (typeof callback !== "function") {
    throw new TypeError(
      'The third argument "callback" must be a function.'
    );
  }
  
  // Generafe cron expression from supplied date.
  const cronExpression = getCron({
    at: date,
    every: repeat
  })
  
  const job = cron.schedule(cronExpression, async () => {
    try {
      await callback();
    } catch (err) {
      console.error("[Crondis]", err);
    }
    if (repeat === "once") {
      job.stop();
      job.destroy();
    }
  });
  
  return job;
}
