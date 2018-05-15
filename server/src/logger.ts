import * as winston from 'winston';
import { getConfig } from 'config';

const defaultLoggingConfig = {
	transports: [
		new (winston.transports.Console)({
			level: 'debug',
			handleExceptions: false,
			prettyPrint: true,
			silent: false,
			timestamp: true,
			colorize: true,
			json: false
		})
	]
};

const productionLoggingConfig = {
	transports: [
		new (winston.transports.Console)({
			level: 'debug',
			handleExceptions: false,
			prettyPrint: true,
			timestamp: true
		})
	]
};

export const getLogger = () => new winston.Logger(getConfig().isProduction ? productionLoggingConfig : defaultLoggingConfig);
