import { LogAction } from '@tverstraten/log-annotations'
import { LogMethod } from '@tverstraten/log-annotations'
import { Builder } from './Builder'
import { BuilderConfiguration } from './BuilderConfiguration'
import { ConcurrentAggregateBuilder } from './ConcurrentAggregateBuilder'
import { Logging } from '@tverstraten/log-annotations'
import { SequentialAggregateBuilder } from './SequentialAggregateBuilder'

export class BuilderFactory {
	static logger = Logging.newLogger(BuilderFactory.name)

	private static factories: Record<string, (settings: string) => Builder> = {}

	private static settingToSkip = ['builders', 'BUILDERS', 'templates', 'TEMPLATES', 'configurations', 'CONFIGURATIONS']

	@LogMethod()
	static registerBuilder(builderName: string, factoryMethod: (settings: string) => Builder): void {
		if (BuilderFactory.factories[builderName]) throw new RangeError(`Builder ${builderName} has already been registered, there is a duplicate`)
		BuilderFactory.factories[builderName] = factoryMethod
	}

	// eslint-disable-next-line max-lines-per-function
	@LogMethod()
	static async createAggregatedBuilders(settings: any): Promise<Builder[]> {
		const builders = [] as Builder[]

		const preCreatedBuilders = settings.builders as Builder[]
		if (preCreatedBuilders && Array.isArray(preCreatedBuilders)) {
			preCreatedBuilders.forEach((builder) => {
				if (builder) builders.push(builder)
			})
		}

		const preCreatedBuildersUpper = settings.BUILDERS as Builder[]
		if (preCreatedBuildersUpper && Array.isArray(preCreatedBuildersUpper)) {
			preCreatedBuildersUpper.forEach((builder) => {
				if (builder) builders.push(builder)
			})
		}

		const configurations = settings.configurations as BuilderConfiguration[]
		const promises = [] as Promise<Builder>[]
		if (configurations && Array.isArray(configurations)) {
			configurations.forEach((configuration) => {
				if (configuration) promises.push(BuilderFactory.create(configuration))
			})
		}

		const promiseResults = await Promise.allSettled(promises)
		promiseResults.forEach((promiseResult) => {
			if (promiseResult.status === 'fulfilled') {
				builders.push(promiseResult.value)
			} else {
				if (typeof promiseResult.reason === 'string') throw new RangeError(promiseResult.reason)
				throw promiseResult.reason
			}
		})

		builders.forEach((builder) => {
			Object.keys(settings).forEach((settingName) => {
				if (!BuilderFactory.settingToSkip.includes(settingName) && builder.getConfiguredValue(settingName) == undefined) {
					const value = settings[settingName]
					builder.setConfiguredValue(settingName, value)
				}
			})
		})

		return builders
	}

	static async createBuilderByName(builderName: string, settings: any): Promise<Builder> {
		switch (builderName) {
			// core builders
			case 'ConcurrentAggregateBuilder':
				const concurrentBuilders = await this.createAggregatedBuilders(settings)
				return new ConcurrentAggregateBuilder('', concurrentBuilders)

			case 'SequentialAggregateBuilder':
				const sequentialBuilders = await this.createAggregatedBuilders(settings)
				return new SequentialAggregateBuilder('', sequentialBuilders)

			default:
				const factoryMethod = BuilderFactory.factories[builderName]
				if (factoryMethod) {
					const newBuilder = factoryMethod(settings)
					if (!newBuilder) throw new TypeError(`Factory ${builderName} did not return a builder`)
					return newBuilder
				}
		}

		this.logger.info(`Builders currently registered are: ${Object.keys(BuilderFactory.factories).map((factory): string => factory)}`)
		throw new TypeError(`Configuration does not describe a known builder type ${builderName}`)
	}

	@LogMethod([LogAction.entry])
	static async create(configuration: BuilderConfiguration): Promise<Builder> {
		try {
			const settings =
				typeof configuration.settings === 'string' ? (configuration.settings == '' ? {} : JSON.parse(configuration.settings)) : configuration.settings

			if (typeof configuration.builder === 'string') {
				const newBuilder = await this.createBuilderByName(configuration.builder, settings)
				return newBuilder
			}
			if (!configuration.builder) throw new RangeError(`Builder configuration is incomplete, missing setting for "builder"`)
			return configuration.builder
		} catch (problem) {
			this.logger.error(`Failed to create builder with configuration "${JSON.stringify(configuration)}" due to ${problem}`)
			throw problem
		}
	}
}
