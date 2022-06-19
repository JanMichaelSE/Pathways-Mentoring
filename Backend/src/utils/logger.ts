import { createLogger, transports, format } from "winston";

const logger = createLogger({
  transports: [
    new transports.File({
      filename: 'errors.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

export default logger;