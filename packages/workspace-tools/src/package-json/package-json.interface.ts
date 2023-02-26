import type { JSONSchemaForNPMPackageJsonFiles } from '@schemastore/package';
import type { PackageJsonExportConditions } from './package-json-export-conditions.type.js';

export const PACKAGE_JSON_NAME = 'package.json';
export const PNPM_WORKSPACE_FILE_NAME = 'pnpm-workspace.yaml';
export const NODE_MODULES_DIRECTORY_NAME = 'node_modules';

export type PackageJsonExports = Record<string, PackageJsonExportConditions | string>;

export type SimplifiedPackageJsonFields = {
	exports?: PackageJsonExports;
	bin?: Record<string, string>;
	type?: 'commonjs' | 'module';
	scripts?: Record<string, string | undefined>;
};

/**
 * This packageJson definition is a bit simplified from the real one
 */
export type PackageJson = JSONSchemaForNPMPackageJsonFiles & SimplifiedPackageJsonFields;

export interface PnpmWorkspaceYaml {
	packages?: string[];
}
