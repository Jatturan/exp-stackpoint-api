import { NODE_ENV } from '../config/index.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorText = statusCode < 500 ? 'Client error' : 'Internal server error';
  const errorMessage = err.message || 'An unknown error occurred';

  // Log error
  console.error(`${errorText}: ${errorMessage}`);

  if (NODE_ENV === 'development') {
    return res
      .status(statusCode)
      .json({ error: errorText, message: errorMessage, stack: err.stack });
  } else {
    return res
      .status(statusCode)
      .json({ error: errorText, message: errorMessage });
  }
};

export default errorHandler;
