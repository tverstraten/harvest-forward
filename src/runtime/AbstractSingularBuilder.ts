import { Artifact } from '../system/Artifact'
import { System } from '../system/System'
import { SystemComponent } from '../system/SystemComponent'
import { ValueType } from '../system/ValueType'
import { Level, LogAsyncMethod } from '@tverstraten/log-annotations'
import { AbstractBuilder } from './AbstractBuilder'
import { ConfigurationParameter } from './ConfigurationParameter'

export abstract class AbstractSingularBuilder extends AbstractBuilder {
	private configs?: Record<string, ConfigurationParameter>

	private configuredValues = {} as Record<string, any>

	constructor(descriptionToUse: string, configsToUse?: Record<string, ConfigurationParameter>, configurationValues?: Record<string, any>) {
		super(descriptionToUse)
		if (configsToUse) {
			this.configs = configsToUse
			for (const key in this.configs) {
				const parameter = this.configs[key]
				this.setConfiguredValue(key, parameter.defaultValue)
			}
		}
		if (configurationValues) {
			Object.keys(configurationValues).forEach((key) => {
				const value = configurationValues[key]
				this.setConfiguredValue(key, value)
			})
		}
	}

	protected getInitialConfiguration(): Record<string, ConfigurationParameter> {
		return {}
	}

	getConfiguration(): Record<string, ConfigurationParameter> {
		if (!this.configs) this.configs = this.getInitialConfiguration()
		return this.configs
	}

	getConfigurationNames(): string[] {
		const configs = this.getConfiguration()
		const keys = Object.keys(configs)
		return keys
	}

	getConfiguredValue(name: string): any {
		const configs = this.getConfiguration()
		if (!configs[name]) return undefined
		return this.configuredValues[name] !== undefined ? this.configuredValues[name] : configs[name].defaultValue
	}

	protected isCorrectValueType(expectedType: ValueType, value: any, parameterName: string): void {
		switch (expectedType) {
			case ValueType.string:
				if (typeof value !== 'string') throw new TypeError(`Expected string but received ${typeof value} for parameter ${parameterName}`)
				break
			case ValueType.boolean:
				if (typeof value !== 'boolean') throw new TypeError(`Expected boolean but received ${typeof value} for parameter ${parameterName}`)
				break
			case ValueType.int:
				if (typeof value !== 'number') throw new TypeError(`Expected number but received ${typeof value} for parameter ${parameterName}`)
				break
			case ValueType.float:
				if (typeof value !== 'number') throw new TypeError(`Expected number but received ${typeof value} for parameter ${parameterName}`)
				break
			case ValueType.object:
				if (typeof value !== 'object') throw new TypeError(`Expected number but received ${typeof value} for parameter ${parameterName}`)
				break
			default:
				throw new RangeError(`Invalid value type specification provided ${expectedType} for parameter ${parameterName}`)
		}
	}

	setConfiguredValue(name: string, value: any): void {
		const configs = this.getConfiguration()
		if (configs[name] === undefined) throw new RangeError(`Configuration parameter ${name} does not exist`)
		const config = configs[name]
		if (value) this.isCorrectValueType(config.valueType, value, name)

		this.configuredValues[name] = value
	}

	@LogAsyncMethod()
	async doesConfigurationWork(): Promise<boolean> {
		let result
		if (!this.isConfigured()) result = false
		else result = await this._doesConfigurationWork()

		return result
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		return true
	}

	protected async testConfiguration(): Promise<void> {
		const missingSettings = this.getMissingConfigurationValues()
		if (missingSettings.length > 0) throw new ReferenceError(`Configuration is incomplete, missing ${JSON.stringify(missingSettings)}`)
		const configWorks = await this.doesConfigurationWork()
		if (!configWorks) throw new ReferenceError('Configuration is complete but does not function')
	}

	async build(system: System): Promise<Artifact[]> {
		if (this.logger.isLevelEnabled(Level.info)) this.logger.info(`build(${this.getIdString()}) enter`)

		try {
			await this.testConfiguration()

			const repeatFor = this.getConfiguredValue('repeatFor')
			const matchedComponents = typeof repeatFor === 'object' ? system.findComponents(repeatFor) : system.findComponentsByString(repeatFor)

			const promises = [] as Promise<Artifact[]>[]
			matchedComponents.map((component) => {
				promises.push(this.buildInternal(system, component))
			})
			const results = await this.settleArtifactResults(promises)

			if (this.logger.isLevelEnabled(Level.info)) this.logger.info(`build(${this.getIdString()}) exit`)

			return results
		} catch (problem) {
			this.logger.error(`build(${this.getIdString()}) failed due to ${JSON.stringify(problem)}`)
			throw problem
		}
	}

	protected abstract buildInternal(system: System, component: SystemComponent): Promise<Artifact[]>
}
