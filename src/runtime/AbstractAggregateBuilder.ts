import { Artifact } from '../system/Artifact'
import { System } from '../system/System'
import { LogAsyncMethod } from '@tverstraten/log-annotations'
import { AbstractBuilder } from './AbstractBuilder'
import { Builder } from './Builder'
import { ConfigurationParameter } from './ConfigurationParameter'

export abstract class AbstractAggregateBuilder extends AbstractBuilder {
	private static nameSeparator = '!'

	private configs?: Record<string, ConfigurationParameter>

	private configuredValues = {} as Record<string, any>

	protected _builders: Builder[]

	constructor(
		descriptionToUse: string,

		buildersToUse?: Builder[],
		configsToUse?: Record<string, ConfigurationParameter>,
		configurationValues?: Record<string, any>
	) {
		super(descriptionToUse)
		this._builders = buildersToUse ? buildersToUse : []
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

	get builders(): Builder[] {
		return this._builders
	}

	getConfiguration(): Record<string, ConfigurationParameter> {
		const allParameters = {} as Record<string, ConfigurationParameter>

		if (this._builders) {
			this._builders.forEach((builder) => {
				const buildersConfig = builder.getConfiguration()
				const keys = Object.keys(buildersConfig)

				keys.forEach((key) => {
					const parameter = buildersConfig[key]
					const adjustedKey = `${builder.name}${AbstractAggregateBuilder.nameSeparator}${key}`
					allParameters[adjustedKey] = parameter
				})
			})
		}

		return allParameters
	}

	getConfigurationNames(): string[] {
		const allNames = [] as string[]

		this._builders.forEach((builder) => {
			const buildersConfig = builder.getConfiguration()
			const keys = Object.keys(buildersConfig)

			keys.forEach((key) => {
				const adjustedKey = `${builder.name}${AbstractAggregateBuilder.nameSeparator}${key}`
				allNames.push(adjustedKey)
			})
		})

		return allNames
	}

	getConfiguredValue(name: string): any {
		const exclaimAt = name.indexOf(AbstractAggregateBuilder.nameSeparator)
		const builderName = name.substring(0, exclaimAt)
		const parameterName = name.substring(exclaimAt + 1)
		for (let builderIndex = 0; builderIndex < this._builders.length; builderIndex++) {
			const builder = this._builders[builderIndex]
			if (builder.name == builderName) {
				if (builder.hasConfigurableValue(parameterName)) return builder.getConfiguredValue(parameterName)
			}
		}
		return null
	}

	setConfiguredValue(name: string, value: any): void {
		const exclaimAt = name.indexOf(AbstractAggregateBuilder.nameSeparator)
		const builderName = name.substring(0, exclaimAt)
		const parameterName = name.substring(exclaimAt + 1)
		for (let builderIndex = 0; builderIndex < this._builders.length; builderIndex++) {
			const builder = this._builders[builderIndex]
			if (builder.name == builderName) {
				if (builder.hasConfigurableValue(parameterName)) builder.setConfiguredValue(parameterName, value)
			}
		}
	}

	@LogAsyncMethod()
	async doesConfigurationWork(): Promise<boolean> {
		if (!this.isConfigured()) return false
		const promises = [] as Promise<boolean>[]
		this._builders.map((builder) => {
			promises.push(builder.doesConfigurationWork())
		})
		const results = await Promise.all(promises)
		const anyFail = results.filter((item) => !item)

		return anyFail.length == 0
	}

	@LogAsyncMethod()
	async getFailingConfigurations(): Promise<Builder[]> {
		const failing = [] as Builder[]
		for (let index = 0; index < this._builders.length; index++) {
			const builder = this._builders[index]
			const works = await builder.doesConfigurationWork()
			if (!works) failing.push(builder)
		}
		return failing
	}

	protected async testConfiguration(): Promise<void> {
		const missingSettings = this.getMissingConfigurationValues()
		if (missingSettings.length > 0) throw new ReferenceError(`Configuration is incomplete, missing ${JSON.stringify(missingSettings)}`)
		const failing = await this.getFailingConfigurations()
		if (failing.length > 0) {
			let failText = ''
			failing.forEach((builder) => {
				failText += `${builder.name} with {`
				const names = builder.getConfigurationNames()
				names.forEach((name) => {
					const value = builder.getConfiguredValue(name)
					failText += `${name}-${value},`
				})
				failText += `}`
			})
			throw new ReferenceError(`Configuration is complete but does not function, failing builders are: ${failText}`)
		}
	}

	abstract build(system: System): Promise<Artifact[]>
}
