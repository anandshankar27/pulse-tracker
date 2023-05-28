
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
const pulseTracker = require('pulse-tracker');
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
const express = require('express');
const pulseTracker = require('pulse-tracker');
const app = express();

app.use(pulseTracker({ useFileLogging: true }));

// rest of the app...

```

## Log Format

Here's an example of what each log entry looks like:

```json
{
  "DATETIME": "28-May-2023 00:13:20",
  "URL": "http://localhost:5000/api/posts/",
  "Method": "GET",
  "Status": 401,
  "Time used(ms)": "23.02",
  "Memory used(MB)": "23.59",
  "Total memory(MB)": "56.68"
}
```

Here's what each field means:

-   **DATETIME**: The date and time when the request was processed.
-   **URL**: The full URL of the request.
-   **Method**: The HTTP method of the request.
-   **Status**: The HTTP status code of the response.
-   **Time used(ms)**: The time taken to process the request, in milliseconds.
-   **Memory used(MB)**: The amount of memory used to process the request, in megabytes.
-   **Total memory(MB)**: The total memory available, in megabytes.

## Contributing

We welcome contributions to Pulse Tracker! Please open an issue or submit a pull request on the [GitHub repository](https://github.com/anandshankar27/pulse-tracker).