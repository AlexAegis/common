import type { ISettingsParam } from 'tslog';

export const defaultLoggerSettings: ISettingsParam<unknown> = {
	name: 'log',
	prettyLogTemplate:
		'{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}\t{{logLevelName}}}:{{nameWithDelimiterPrefix}}\t{{filePathWithLine}',
};
