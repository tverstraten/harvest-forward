/* eslint-disable max-lines-per-function */
import { HandlebarsGenerator } from '../../plugins/handlebars/HandlebarsGenerator'
import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { Builder } from '../../runtime/Builder'
import { BuilderConfiguration } from '../../runtime/BuilderConfiguration'
import { BuilderFactory } from '../../runtime/BuilderFactory'
import { ConcurrentAggregateBuilder } from '../../runtime/ConcurrentAggregateBuilder'
import { ConfigurationManager } from '../../runtime/ConfigurationManager'
import { SequentialAggregateBuilder } from '../../runtime/SequentialAggregateBuilder'
import { Artifact } from '../../system/Artifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { ValueType } from '../../system/ValueType'

describe('registerBuilder', () => {
	it('duplicate builder', async () => {
		BuilderFactory.registerBuilder('ArbitraryBuilder', () => {
			return {} as Builder
		})
		try {
			BuilderFactory.registerBuilder('ArbitraryBuilder', () => {
				return {} as Builder
			})
		} catch (problem) {
			expect((problem as any).message).toBe('Builder ArbitraryBuilder has already been registered, there is a duplicate')
		}
	})
})

describe('createAggregatedBuilders', () => {
	it('single builder', async () => {
		const builderTypeName = 'SingleBuilder'
		BuilderFactory.registerBuilder(builderTypeName, () => {
			return {} as Builder
		})
		const result = await BuilderFactory.createAggregatedBuilders({ configurations: [{ builder: builderTypeName, settings: '' }] })
		expect(result[0]).toBeDefined()
	})

	it('bad settings', async () => {
		const builderTypeName = 'SingleBuilderBadSettings'
		BuilderFactory.registerBuilder(builderTypeName, () => {
			return {} as Builder
		})
		try {
			await BuilderFactory.createAggregatedBuilders({ configurations: [{ builderName: builderTypeName, settings: '' }] })
			fail('not supposed to get here')
		} catch (problem) {
			expect((problem as any).message).toBe('Builder configuration is incomplete, missing setting for "builder"')
		}
	})

	it('constructor failing with string', async () => {
		class BadBuilder {
			constructor(__settings: any) {
				throw new RangeError('oops')
			}
		}
		const builderTypeName = 'ConstructorFailure'
		BuilderFactory.registerBuilder(builderTypeName, (settings) => {
			return new BadBuilder(settings) as Builder
		})
		try {
			await BuilderFactory.createAggregatedBuilders({ configurations: [{ builder: builderTypeName, settings: '' }] })
			fail('not supposed to get here')
		} catch (problem) {
			expect((problem as any).message).toBe('oops')
		}
	})
})

describe('createBuilderByName', () => {
	it('bad builder', async () => {
		const builderTypeName = 'NoSuchSingleBuilder'
		try {
			await BuilderFactory.createBuilderByName(builderTypeName, '')
		} catch (problem) {
			expect((problem as any).message).toBe('Configuration does not describe a known builder type NoSuchSingleBuilder')
		}
	})

	it('factory returns nothing', async () => {
		const builderTypeName = 'FactoryReturnsNothing'
		BuilderFactory.registerBuilder(builderTypeName, (__settings) => {
			return undefined as unknown as Builder
		})
		try {
			await BuilderFactory.createBuilderByName(builderTypeName, '')
		} catch (problem) {
			expect((problem as any).message).toBe('Factory FactoryReturnsNothing did not return a builder')
		}
	})
})

describe('create', () => {
	it('by name', async () => {
		let result = await BuilderFactory.createBuilderByName('SequentialAggregateBuilder', [])
		expect(result).toBeInstanceOf(SequentialAggregateBuilder)
		result = await BuilderFactory.createBuilderByName('ConcurrentAggregateBuilder', [])
		expect(result).toBeInstanceOf(ConcurrentAggregateBuilder)
	})

	it('by plugin configured name', async () => {
		await ConfigurationManager.registerPlugins()
		const result = await BuilderFactory.createBuilderByName('builtIn/handlebars/handlebarsGenerator', {})
		expect(result).toBeInstanceOf(HandlebarsGenerator)
	})

	it('by configuration', async () => {
		const config = {
			builder: new HandlebarsGenerator({}),
			settings: '',
		} as BuilderConfiguration
		const result = await BuilderFactory.create(config)
		expect(result).toBeInstanceOf(HandlebarsGenerator)
	})

	it('by nested configuration', async () => {
		const config = {
			builder: new HandlebarsGenerator({}),
			settings: '',
		} as BuilderConfiguration
		const result = await BuilderFactory.create(config)
		expect(result).toBeInstanceOf(HandlebarsGenerator)
	})
})

/**
 * Derivations for testing purposes without default values.
 */
class TestBuilder1 extends AbstractSingularBuilder {
	constructor(configurationValues: Record<string, any>, __guid?: string) {
		super(
			'',
			{
				sourcePath: {
					name: 'sourcePath',
					required: true,
					description: '',
					valueType: ValueType.string,
				},
				fileNamePattern: {
					name: 'fileNamePattern',
					required: true,
					description: '',
					valueType: ValueType.string,
				},
			},
			configurationValues
		)
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		return true
	}

	protected async buildInternal(__system: System, __component: SystemComponent): Promise<Artifact[]> {
		return []
	}
}

describe('push down properties', () => {
	it('bad builder', async () => {
		const sourcePath = './src/model'
		const sourcePath2 = './model/somethingElse'
		const fileNamePattern = '.*(?<!_ex)$'
		const fileNamePattern2 = '.*$'
		const config = {
			builder: 'SequentialAggregateBuilder',
			settings: {
				sourcePath: sourcePath,
				fileNamePattern: fileNamePattern,
				builders: [
					new TestBuilder1({}),
					new TestBuilder1({ fileNamePattern: fileNamePattern2 }),
					new TestBuilder1({ sourcePath: sourcePath2 }),
					new TestBuilder1({}),
				],
			},
		}
		const aggregateBuilder = (await BuilderFactory.create(config)) as SequentialAggregateBuilder
		expect(aggregateBuilder.builders.length).toBe(4)
		expect(aggregateBuilder.builders[0].getConfiguredValue('sourcePath')).toBe(sourcePath)
		expect(aggregateBuilder.builders[0].getConfiguredValue('fileNamePattern')).toBe(fileNamePattern)
		expect(aggregateBuilder.builders[1].getConfiguredValue('sourcePath')).toBe(sourcePath)
		expect(aggregateBuilder.builders[1].getConfiguredValue('fileNamePattern')).toBe(fileNamePattern2)
		expect(aggregateBuilder.builders[2].getConfiguredValue('sourcePath')).toBe(sourcePath2)
		expect(aggregateBuilder.builders[2].getConfiguredValue('fileNamePattern')).toBe(fileNamePattern)
		expect(aggregateBuilder.builders[3].getConfiguredValue('sourcePath')).toBe(sourcePath)
		expect(aggregateBuilder.builders[3].getConfiguredValue('fileNamePattern')).toBe(fileNamePattern)
	})
})
