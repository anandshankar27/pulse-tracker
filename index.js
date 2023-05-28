import initLogger, { captureLog } from "./services/logging.service.js";

/**
 * Initializes the pulse tracker middleware.
 * @param {object} options - Optional configuration options for initializing the logger.
 * @returns {function} - Pulse tracker middleware function.
 */
const initPulseTracker = (options = {}) => {
  // Initialize the logger with the provided options
  initLogger(options);

  /**
   * Middleware function to track pulse (request/response) information.
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {function} next - Next middleware function.
   */
  const pulseTrackerMiddleware = (req, res, next) => {
    // Attach an event listener to the response's "finish" event
    res.on("finish", () => {
      // Extract relevant information from the request and response objects
      const { protocol, originalUrl, method } = req;
      const { statusCode } = res;

      // Prepare the request information object
      const requestInfo = {
        url: `${protocol}://${req.get("host")}${originalUrl}`,
        method,
        statusCode,
      };

      // Capture the request information in the logger
      captureLog(requestInfo);
    });

    // Call the next middleware function
    next();
  };

  return pulseTrackerMiddleware;
};

export default initPulseTracker;
