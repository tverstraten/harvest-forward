import { Artifact } from '../system/Artifact'
import { Nameable } from '../system/Nameable'
import { System } from '../system/System'
import { ConfigurationParameter } from './ConfigurationParameter'

/**
 * A tool used to build part of a system, either harvest or generate.
 * Some of the rules a builder should follow:
 * 1. Produce identifiable artifacts - each artifact should be trivially identified as being manufactured and labelled to not modify.
 * 2. Produce extensible artifacts - each artifact should be made such that developers can add to what it defines without needing to modify the artifact itself.
 * 3. Produce directly usable packages for common tool chains - the artifacts should be bundled in a manner that they can readily be used by ide's and/or package managers.
 * TODO: progress.
 */
export interface Builder extends Nameable {
	getConfiguration(): Record<string, ConfigurationParameter>

	getConfigurationNames(): string[]

	hasConfigurableValue(name: string): boolean

	getConfiguredValue(name: string): any

	setConfiguredValue(name: string, value: any): void

	isConfigured(): boolean

	getMissingConfigurationValues(): string[]

	doesConfigurationWork(): Promise<boolean>

	build(system: System): Promise<Artifact[]>
}
