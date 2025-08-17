/**
 * Centralized logging utility for consistent application logging
 */

/**
 * Log levels for different types of messages
 */
export enum LogLevel {
	ERROR = "error",
	WARN = "warn",
	INFO = "info",
	DEBUG = "debug"
}

/**
 * Logger configuration
 */
interface LoggerConfig {
	isDevelopment: boolean;
	minLogLevel: LogLevel;
}

/**
 * Default logger configuration
 */
const defaultConfig: LoggerConfig = {
	isDevelopment: process.env.NODE_ENV === "development",
	minLogLevel: LogLevel.INFO
};

/**
 * Log level priority for filtering
 */
const logLevelPriority: Record<LogLevel, number> = {
	[LogLevel.DEBUG]: 0,
	[LogLevel.INFO]: 1,
	[LogLevel.WARN]: 2,
	[LogLevel.ERROR]: 3
};

/**
 * Enhanced logger with contextual information
 */
class Logger {
	private config: LoggerConfig;

	constructor(config: LoggerConfig = defaultConfig) {
		this.config = config;
	}

	/**
	 * Check if a log level should be processed
	 */
	private shouldLog(level: LogLevel): boolean {
		return logLevelPriority[level] >= logLevelPriority[this.config.minLogLevel];
	}

	/**
	 * Format log message with context
	 */
	private formatMessage(level: LogLevel, message: string, context?: string): string {
		const timestamp = new Date().toISOString();
		const contextStr = context ? `[${context}]` : "";
		return `[${timestamp}] ${level.toUpperCase()} ${contextStr}: ${message}`;
	}

	/**
	 * Log an error message
	 */
	error(message: string, error?: Error, context?: string): void {
		if (!this.shouldLog(LogLevel.ERROR)) return;

		const formattedMessage = this.formatMessage(LogLevel.ERROR, message, context);

		if (this.config.isDevelopment) {
			console.error(formattedMessage);
			if (error) {
				console.error("Error details:", error);
				if (error.stack) {
					console.error("Stack trace:", error.stack);
				}
			}
		} else {
			console.error(formattedMessage);
			// In production, you might want to send errors to a logging service
		}
	}

	/**
	 * Log a warning message
	 */
	warn(message: string, context?: string): void {
		if (!this.shouldLog(LogLevel.WARN)) return;

		const formattedMessage = this.formatMessage(LogLevel.WARN, message, context);
		console.warn(formattedMessage);
	}

	/**
	 * Log an info message
	 */
	info(message: string, context?: string): void {
		if (!this.shouldLog(LogLevel.INFO)) return;

		const formattedMessage = this.formatMessage(LogLevel.INFO, message, context);
		console.warn(formattedMessage); // Using warn as info is not allowed
	}

	/**
	 * Log a debug message (only in development)
	 */
	debug(message: string, data?: unknown, context?: string): void {
		if (!this.config.isDevelopment || !this.shouldLog(LogLevel.DEBUG)) return;

		const formattedMessage = this.formatMessage(LogLevel.DEBUG, message, context);
		console.warn(formattedMessage); // Using warn as debug is not allowed

		if (data !== undefined) {
			console.warn("Debug data:", data); // Using warn as debug is not allowed
		}
	}
}

/**
 * Default logger instance
 */
export const logger = new Logger();

/**
 * Context-specific loggers for different parts of the application
 */
export const loggers = {
	api: {
		error: (message: string, error?: Error) => logger.error(message, error, "API"),
		warn: (message: string) => logger.warn(message, "API"),
		info: (message: string) => logger.info(message, "API"),
		debug: (message: string, data?: unknown) => logger.debug(message, data, "API")
	},
	auth: {
		error: (message: string, error?: Error) => logger.error(message, error, "AUTH"),
		warn: (message: string) => logger.warn(message, "AUTH"),
		info: (message: string) => logger.info(message, "AUTH"),
		debug: (message: string, data?: unknown) => logger.debug(message, data, "AUTH")
	},
	ui: {
		error: (message: string, error?: Error) => logger.error(message, error, "UI"),
		warn: (message: string) => logger.warn(message, "UI"),
		info: (message: string) => logger.info(message, "UI"),
		debug: (message: string, data?: unknown) => logger.debug(message, data, "UI")
	}
};

/**
 * Performance logging utility
 */
export const performanceLogger = {
	/**
	 * Time a function execution
	 */
	time<T>(label: string, fn: () => T): T {
		const start = performance.now();
		const result = fn();
		const end = performance.now();
		logger.debug(`${label} took ${(end - start).toFixed(2)}ms`, undefined, "PERFORMANCE");
		return result;
	},

	/**
	 * Time an async function execution
	 */
	async timeAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
		const start = performance.now();
		const result = await fn();
		const end = performance.now();
		logger.debug(`${label} took ${(end - start).toFixed(2)}ms`, undefined, "PERFORMANCE");
		return result;
	}
};
