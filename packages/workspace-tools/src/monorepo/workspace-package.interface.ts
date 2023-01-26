import type { PackageJson } from '../const/package-json.interface.js';

export interface WorkspacePackage {
	path: string;
	packageJson: PackageJson;
}
