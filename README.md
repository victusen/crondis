# Crondis

> Schedule recurring JavaScript tasks without writing cron expressions.

Crondis is a lightweight task scheduler built on top of **get-cron** and **node-cron**.

Instead of learning cron syntax, simply provide a date, choose how often it should repeat, and pass the function you want to execute. Crondis generates the cron expression and schedules the task automatically.

Instead of writing:

```text
30 14 * * 1-5
```

Simply write:

```js
import schedule from "crondis";

schedule(
  "2026-07-15T14:30",
  "weekday",
  () => {
    console.log("Report sent.");
  }
);
```

---

## Features

- Recurring scheduled jobs from simple dates.
- Lightweight.
- Built on top of `get-cron`.
- Powered by `node-cron`.
- Supports synchronous and asynchronous functions.
- Automatically destroys one-time schedules.
- No cron syntax required.
- Zero configuration.
- Modern ES Modules.

---

## Installation

```bash
npm install crondis
```

or

```bash
pnpm add crondis
```

or

```bash
yarn add crondis
```

Requires **Node.js 20** or later.

---

## Quick Start

```js
import schedule from "crondis";

schedule(
  "2026-12-25T09:00",
  "yearly",
  () => {
    console.log("Merry Christmas!");
  }
);
```

---

## Async Example

Crondis also supports asynchronous task functions.

```js
import schedule from "crondis";

schedule(
  "2026-07-30T23:00",
  "daily",
  async () => {
    await backupDatabase();
  }
);
```

If an async task throws an error, Crondis logs the error and continues with the next scheduled execution.

---

## API

### schedule()

```js
schedule(date, repeat, callback);
```

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| date | String | Yes | A valid ISO 8601 date string. |
| repeat | String | Yes | The repeat schedule. |
| callback | Function | Yes | The function to execute. Supports both synchronous and asynchronous functions. |

Returns the underlying **node-cron ScheduledTask** instance.

---

## Supported Repeat Options

| Option | Description |
|---------|-------------|
| once | Run only once. |
| daily | Every day. |
| weekly | Every week on the same weekday. |
| monthly | Same day every month. |
| yearly | Same day every year. |
| weekday | Monday through Friday. |
| weekends | Saturday and Sunday. |
| christmas | Every Christmas Day. |
| christmas-eve | Every Christmas Eve. |
| new year | Every New Year's Day. |
| new years-eve | Every New Year's Eve. |
| valentines | Every Valentine's Day. |

---

## Supported Date Formats

Crondis currently accepts ISO 8601 date strings in either of the following formats:

```js
"2026-07-15T14:30"

"2026-12-25T09:00Z"
```

Other JavaScript date formats are intentionally rejected to keep scheduling predictable and consistent across environments.

---

## Return Value

Crondis returns the underlying `node-cron` `ScheduledTask`.

```js
const job = schedule(
  "2026-07-15T14:30",
  "daily",
  () => {}
);

job.start();

job.stop();

job.destroy();
```

---

## Error Handling

Crondis performs validation before scheduling a task.

Examples of possible errors include:

```text
TypeError: The first argument "date" must be an ISO date string.
```

```text
Error: Invalid ISO date. Expected "YYYY-MM-DDTHH:mm" or "YYYY-MM-DDTHH:mmZ".
```

```text
Error: Unsupported repeat option "everyday".
```

```text
TypeError: The third argument "callback" must be a function.
```

---

## Compatibility

Crondis 1.x is built on top of:

- get-cron 1.x
- node-cron 4.x

Future major releases may update these requirements.

---

## Built on get-cron

Crondis uses **get-cron** internally to convert ISO date strings into valid cron expressions.

If you only need date-to-cron conversion without task scheduling, install `get-cron` directly:

```bash
npm install get-cron
```

---

## Why Crondis?

Cron expressions are powerful, but they're difficult to remember and easy to get wrong.

Instead of writing:

```text
0 8 25 12 *
```

you simply write:

```js
schedule(
  "2026-12-25T08:00",
  "christmas",
  sendGreeting
);
```

Crondis handles the cron expression and scheduling for you.

---

## Roadmap

Future releases may include:

- Timezone support.
- TypeScript definitions.
- Natural language scheduling.
- More scheduling patterns.

---

## Contributing

Contributions are welcome.

Feel free to open an issue or submit a pull request.

---

## License

MIT License

---

## Author

**Victor Usen**

GitHub

https://github.com/victusen

---

## Related Project

Looking for date-to-cron conversion without task scheduling?

Check out **get-cron**:

https://www.npmjs.com/package/get-cron

---

If Crondis saves you time, consider giving the project a ⭐ on GitHub.