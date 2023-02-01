import type { LogLevelOption } from '@alexaegis/logging';
import { isLogLevelEnumKey, isLogLevelEnumValue, LogLevel } from '@alexaegis/logging';
import type { ArgumentsCamelCase, Argv, MiddlewareFunction } from 'yargs';

export type LogLevelOptionArgs = Argv<LogLevelOption>;

export const yargsForLogLevelOption = (yargs: Argv) => {
	const logLevelYargs = yargs
		.option('logLevel', {
			alias: 'l',
			choices: Object.values(LogLevel),
			description: 'The minimum logLevel',
			conflicts: ['silent', 'verbose'],
			coerce: (value: string): LogLevel => {
				const i = Number.parseInt(value, 10);
				if (!Number.isNaN(i) && isLogLevelEnumValue(i)) {
					return i;
				} else if (isLogLevelEnumKey(value)) {
					return LogLevel[value];
				} else {
					return LogLevel.INFO;
				}
			},
		})
		.option('quiet', {
			alias: ['q', 'silent'],
			description: 'Turn off logging',
			boolean: true,
			conflicts: ['logLevel', 'verbose'],
		})
		.option('verbose', {
			alias: 'v',
			description: 'Turn on (almost) all logging',
			boolean: true,
			conflicts: ['logLevel', 'silent'],
		});
	return logLevelYargs.middleware(((args: ArgumentsCamelCase<typeof logLevelYargs>) => {
		if (args.quiet) {
			return { logLevel: LogLevel.OFF };
		} else if (args.verbose) {
			return { logLevel: LogLevel.TRACE };
		}
	}) as unknown as MiddlewareFunction<ArgumentsCamelCase<LogLevelOption & { quiet: boolean | undefined }>>);
};
