# Pulse Tracker

Pulse Tracker is a Node.js performance monitoring module. It logs key metrics such as URL, request method, status code, response time, and memory usage for every HTTP request that your application processes.

## Installation

Install the module using npm:

```bash
npm install pulse-tracker
```

## Usage

First, require the module in your application:

```javascript
const pulseTracker = require("pulse-tracker");

// or (If using ES6 Module system)
import pulseTracker from "pulse-tracker";
```

Then, use it as middleware in your Express.js application:

```javascript
app.use(pulseTracker());
```

This will start logging performance metrics for every request that your application processes.

By default, the logs are output to the console. If you want to log to a file instead, pass an options object with `useFileLogging: true` when you call `pulseTracker()`:

```javascript
app.use(pulseTracker({ useFileLogging: true }));
```

This will start logging the metrics to a file named 'pulse-tracker.log' in your application's directory.

Here's how a user would use it:

```javascript
const express = require("express");
const pulseTracker = require("pulse-tracker");
const app = express();

app.use(pulseTracker({ useFileLogging: true }));

// rest of the app...
```

## Log Format

Here's an example of what each log entry looks like:

```json
{
  "url": "http://localhost:3100/orders",
  "method": "GET",
  "statusCode": 401,
  "dateTime": "28-May-2023 14:40:20",
  "timeUsed": "6816.33 (Milliseconds)",
  "memoryUsed": "11.45 (MB's)",
  "totalMemoryUsed": "17.75 (MB's)"
}
```

Here's what each field means:

- **dateTime**: The date and time when the request was processed.
- **url**: The full URL of the request.
- **method**: The HTTP method of the request.
- **statusCode**: The HTTP status code of the response.
- **timeUsed**: The time taken to process the request, in milliseconds.
- **memoryUsed**: The amount of memory used to process the request, in megabytes.
- **totalMemoryUsed**: The total memory available, in megabytes.

## Contributing

We welcome contributions to Pulse Tracker! Please open an issue or submit a pull request on the [GitHub repository](https://github.com/anandshankar27/pulse-tracker).
