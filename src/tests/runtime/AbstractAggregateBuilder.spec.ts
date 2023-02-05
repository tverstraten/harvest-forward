/* eslint-disable max-lines-per-function */
import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { SequentialAggregateBuilder } from '../../runtime/SequentialAggregateBuilder'
import { Artifact } from '../../system/Artifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { ValueType } from '../../system/ValueType'

const builderDesc = 'description'
const parameterString = 'configString'
const parameterBool = 'configBool'
const parameterInteger = 'configInt'
const parameterFloat = 'configFloat'
//const defaultString = 'configString';
//const defaultBool = 'configBool';
//const defaultInt = 'configInt';
//const defaultFloat = 'configFloat';

/**
 * Derivations for testing purposes without default values.
 */
class TestBuilder1 extends AbstractSingularBuilder {
	constructor(configurationValues: Record<string, any>, __guid?: string) {
		super(
			builderDesc,
			{
				configString: {
					name: parameterString,
					required: true,
					description: 'The base path to where the artifacts should be written',
					valueType: ValueType.string,
				},
				configBool: {
					name: parameterBool,
					required: true,
					description: 'The url to the server to connect to',
					valueType: ValueType.boolean,
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

class TestBuilder2 extends AbstractSingularBuilder {
	constructor(configurationValues: Record<string, any>, __guid?: string) {
		super(
			builderDesc,
			{
				configInt: {
					name: parameterInteger,
					required: true,
					description: 'The user name to present to sql server for authentication',
					valueType: ValueType.int,
				},
				configFloat: {
					name: parameterFloat,
					required: true,
					description: 'The user name to present to sql server for authentication',
					valueType: ValueType.float,
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

class TestBuilder3 extends AbstractSingularBuilder {
	constructor(configurationValues: Record<string, any>, __guid?: string) {
		super(
			builderDesc,
			{
				configInt: {
					name: parameterInteger,
					required: true,
					description: 'The user name to present to sql server for authentication',
					valueType: ValueType.int,
				},
				configFloat: {
					name: parameterFloat,
					required: true,
					description: 'The user name to present to sql server for authentication',
					valueType: ValueType.float,
				},
			},
			configurationValues
		)
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		return false
	}

	protected async buildInternal(__system: System, __component: SystemComponent): Promise<Artifact[]> {
		return []
	}
}

class TestAggregate extends SequentialAggregateBuilder {
	constructor() {
		super('desc', [new TestBuilder1({}), new TestBuilder2({})])
	}
}

class TestAggregate2 extends SequentialAggregateBuilder {
	constructor() {
		super('desc', [new TestBuilder1({}), new TestBuilder2({}), new TestBuilder3({})])
	}
}

describe('constructor', () => {
	it('config parameters exist', async () => {
		const builder = new TestAggregate()
		expect(builder.getConfigurationNames()).toContain(`TestBuilder1!${parameterString}`)
		expect(builder.getConfigurationNames()).toContain(`TestBuilder1!${parameterBool}`)
		expect(builder.getConfigurationNames()).toContain(`TestBuilder2!${parameterInteger}`)
		expect(builder.getConfigurationNames()).toContain(`TestBuilder2!${parameterFloat}`)
		expect(builder.getConfigurationNames().length).toBe(4)
	})

	// the parameters are read back out correctly
	it('config parameters are read back out correctly', async () => {
		const builder = new TestAggregate()
		const config = builder.getConfiguration()

		expect(Object.keys(config).length).toBe(4)

		expect(config['TestBuilder1!configString']).toBeDefined()
		expect(config['TestBuilder1!configBool']).toBeDefined()
		expect(config['TestBuilder2!configInt']).toBeDefined()
		expect(config['TestBuilder2!configFloat']).toBeDefined()
		expect(config['nonsense']).toBeUndefined()

		expect(config['TestBuilder1!configString'].name).toBe(parameterString)
		expect(config['TestBuilder1!configBool'].name).toBe(parameterBool)
		expect(config['TestBuilder2!configInt'].name).toBe(parameterInteger)
		expect(config['TestBuilder2!configFloat'].name).toBe(parameterFloat)

		expect(config['TestBuilder1!configString'].valueType).toBe(ValueType.string)
		expect(config['TestBuilder1!configBool'].valueType).toBe(ValueType.boolean)
		expect(config['TestBuilder2!configInt'].valueType).toBe(ValueType.int)
		expect(config['TestBuilder2!configFloat'].valueType).toBe(ValueType.float)
	})
})

describe('getConfiguredValue and setConfiguredValue', () => {
	it('start empty then set', async () => {
		const stringValue = 'arbitrary string value'
		const boolValue = true
		const intValue = 65536
		const floatValue = 5.21
		const builder = new TestAggregate()

		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue)
		expect(builder.getConfiguredValue(`TestBuilder1!${parameterString}`)).toBe(stringValue)

		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue)
		expect(builder.getConfiguredValue(`TestBuilder1!${parameterBool}`)).toBe(boolValue)

		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue)
		expect(builder.getConfiguredValue(`TestBuilder2!${parameterInteger}`)).toBe(intValue)

		builder.setConfiguredValue(`TestBuilder2!${parameterFloat}`, floatValue)
		expect(builder.getConfiguredValue(`TestBuilder2!${parameterFloat}`)).toBe(floatValue)
	})

	it('start set then override', async () => {
		const builder = new TestAggregate()

		const stringValue2 = 'a different string'
		const boolValue2 = false
		const intValue2 = 42
		const floatValue2 = -45.96
		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue2)
		expect(builder.getConfiguredValue(`TestBuilder1!${parameterString}`)).toBe(stringValue2)

		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue2)
		expect(builder.getConfiguredValue(`TestBuilder1!${parameterBool}`)).toBe(boolValue2)

		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue2)
		expect(builder.getConfiguredValue(`TestBuilder2!${parameterInteger}`)).toBe(intValue2)

		builder.setConfiguredValue(`TestBuilder2!${parameterFloat}`, floatValue2)
		expect(builder.getConfiguredValue(`TestBuilder2!${parameterFloat}`)).toBe(floatValue2)
	})

	it('start set then empty', async () => {
		const builder = new TestAggregate()

		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, undefined)
		expect(builder.getConfiguredValue(`TestBuilder1!${parameterString}`)).toBe(undefined)

		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, undefined)
		expect(builder.getConfiguredValue(`TestBuilder1!${parameterBool}`)).toBe(undefined)

		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, undefined)
		expect(builder.getConfiguredValue(`TestBuilder2!${parameterInteger}`)).toBe(undefined)

		builder.setConfiguredValue(`TestBuilder2!${parameterFloat}`, undefined)
		expect(builder.getConfiguredValue(`TestBuilder2!${parameterFloat}`)).toBe(undefined)
	})

	it('start set then assign wrong types', async () => {
		const builder = new TestAggregate()

		let testFunction = (): void => {
			builder.setConfiguredValue(`TestBuilder1!${parameterString}`, 5)
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(`TestBuilder1!${parameterString}`, true)
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, 'string')
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, 5)
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, 'string')
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, true)
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(`TestBuilder2!${parameterFloat}`, 'string')
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(`TestBuilder2!${parameterFloat}`, true)
		}
		expect(testFunction).toThrow(TypeError)
	})
})

// get properties, is property set, get property value

describe('hasConfiguredValue', () => {
	// get properties, is property set, get property value
	// set to undefined
	// set constructor, override

	it('start empty', async () => {
		const builder = new TestAggregate()
		expect(builder.hasConfigurableValue(`TestBuilder1!${parameterString}`)).toBe(true)
		expect(builder.hasConfigurableValue(`TestBuilder1!${parameterBool}`)).toBe(true)
		expect(builder.hasConfigurableValue(`TestBuilder2!${parameterInteger}`)).toBe(true)
		expect(builder.hasConfigurableValue(`TestBuilder2!${parameterFloat}`)).toBe(true)
		expect(builder.hasConfigurableValue('something else')).toBe(false)
	})
})

describe('isConfigured', () => {
	it('none set at construction', async () => {
		const builder = new TestAggregate()
		expect(builder.isConfigured()).toBe(false)
	})

	it('none set at construction then set', async () => {
		const stringValue = 'some string to check'
		const boolValue = true
		const intValue = 65536
		const floatValue = 5.21
		const builder = new TestAggregate()
		expect(builder.isConfigured()).toBe(false)
		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue)
		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterFloat}`, floatValue)
		expect(builder.isConfigured()).toBe(true)
	})

	it('all but 1 set', async () => {
		const stringValue = 'some string to check'
		const boolValue = true
		const intValue = 65536
		const builder = new TestAggregate()
		expect(builder.isConfigured()).toBe(false)
		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue)
		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue)
		expect(builder.isConfigured()).toBe(false)
	})
})

describe('getConfiguredValue', () => {
	it('try to get configured value that does not exist', async () => {
		const stringValue = 'some string to check'
		const boolValue = true
		const intValue = 65536
		const builder = new TestAggregate()
		expect(builder.isConfigured()).toBe(false)
		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue)
		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue)
		expect(builder.getConfiguredValue('doesNotExist')).toBe(null)
	})
})

describe('doesConfigurationWork', () => {
	it('ok', async () => {
		const builder = new TestAggregate()
		const stringValue = 'some string to check'
		const boolValue = true
		const intValue = 65536
		const floatValue = 5.21
		expect(builder.isConfigured()).toBe(false)
		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue)
		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterFloat}`, floatValue)
		await expect(await builder.doesConfigurationWork()).toBe(true)
	})

	it('not configured', async () => {
		const builder = new TestAggregate()
		const stringValue = 'some string to check'
		const boolValue = true
		const intValue = 65536
		expect(builder.isConfigured()).toBe(false)
		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue)
		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue)
		await expect(await builder.doesConfigurationWork()).toBe(false)
	})
})

describe('getFailingConfigurations', () => {
	it('none', async () => {
		const builder = new TestAggregate()
		const stringValue = 'some string to check'
		const boolValue = true
		const intValue = 65536
		const floatValue = 5.21
		expect(builder.isConfigured()).toBe(false)
		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue)
		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterFloat}`, floatValue)
		const result = await builder.getFailingConfigurations()
		expect(result.length).toBe(0)
	})

	it('one that fails', async () => {
		const builder = new TestAggregate2()
		const stringValue = 'some string to check'
		const boolValue = true
		const intValue = 65536
		const floatValue = 5.21
		const text = 'Configuration is incomplete, missing ["TestBuilder3!configInt","TestBuilder3!configFloat"]'
		expect(builder.isConfigured()).toBe(false)
		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue)
		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterFloat}`, floatValue)
		const result = await builder.getFailingConfigurations()
		expect(result.length).toBe(1)
		expect(result[0]).toBeInstanceOf(TestBuilder3)

		try {
			await builder.build(new System())
		} catch (problem) {
			const message = (problem as any).message
			expect(message).toBe(text)
		}
	})
})

describe('build', () => {
	it('not configured', async () => {
		const builder = new TestAggregate()
		const stringValue = 'some string to check'
		const boolValue = true
		const intValue = 65536
		expect(builder.isConfigured()).toBe(false)
		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue)
		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue)

		try {
			await builder.build(new System())
		} catch (problem) {
			const message = (problem as any).message
			expect(message).toBe('Configuration is incomplete, missing ["TestBuilder2!configFloat"]')
		}
	})
})

describe('push down configuration', () => {
	it('not configured', async () => {
		const builder = new TestAggregate()
		const stringValue = 'some string to check'
		const boolValue = true
		const intValue = 65536
		expect(builder.isConfigured()).toBe(false)
		builder.setConfiguredValue(`TestBuilder1!${parameterString}`, stringValue)
		builder.setConfiguredValue(`TestBuilder1!${parameterBool}`, boolValue)
		builder.setConfiguredValue(`TestBuilder2!${parameterInteger}`, intValue)
	})
})
