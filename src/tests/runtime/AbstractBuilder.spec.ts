/* eslint-disable max-lines-per-function */
import { AbstractSingularBuilder } from '../../runtime/AbstractSingularBuilder'
import { ConfigurationParameter } from '../../runtime/ConfigurationParameter'
import { Artifact } from '../../system/Artifact'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { ValueType } from '../../system/ValueType'

const builderName = 'TestBuilderNoDefaultsConstructor'
const builderDesc = 'description'
const parameterString = 'configString'
const parameterBoolean = 'configBoolean'
const parameterInteger = 'configInt'
const parameterFloat = 'configFloat'
const defaultString = 'defaultString'
const defaultBoolean = true
const defaultInt = 1024
const defaultFloat = 5.37

/**
 * Derivations for testing purposes without default values.
 */
class TestBuilderNoDefaultsConstructor extends AbstractSingularBuilder {
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
				configBoolean: {
					name: parameterBoolean,
					required: true,
					description: 'The url to the server to connect to',
					valueType: ValueType.boolean,
				},
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

class TestBuilderWithDefaultsConstructor extends AbstractSingularBuilder {
	constructor(configurationValues: Record<string, any>, __guid?: string) {
		super(
			builderDesc,
			{
				configString: {
					name: parameterString,
					required: true,
					description: 'The base path to where the artifacts should be written',
					valueType: ValueType.string,
					defaultValue: defaultString,
				},
				configBoolean: {
					name: parameterBoolean,
					required: true,
					description: 'The url to the server to connect to',
					valueType: ValueType.boolean,
					defaultValue: defaultBoolean,
				},
				configInt: {
					name: parameterInteger,
					required: true,
					description: 'The user name to present to sql server for authentication',
					valueType: ValueType.int,
					defaultValue: defaultInt,
				},
				configFloat: {
					name: parameterFloat,
					required: true,
					description: 'The user name to present to sql server for authentication',
					valueType: ValueType.float,
					defaultValue: defaultFloat,
				},
			},
			configurationValues
		)
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		return true
	}

	protected async buildInternal(__system: System, __component: SystemComponent): Promise<Artifact[]> {
		throw new RangeError('error as string')
	}
}

class TestBuilderNoDefaultsMethod extends AbstractSingularBuilder {
	constructor(configurationValues: Record<string, any>, __guid?: string) {
		super(builderDesc, configurationValues)
	}

	getInitialConfiguration(): Record<string, ConfigurationParameter> {
		return {
			configString: {
				name: parameterString,
				required: true,
				description: 'The base path to where the artifacts should be written',
				valueType: ValueType.string,
			},
			configBoolean: {
				name: parameterBoolean,
				required: true,
				description: 'The url to the server to connect to',
				valueType: ValueType.boolean,
			},
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
		}
	}

	protected async _doesConfigurationWork(): Promise<boolean> {
		return true
	}

	protected async buildInternal(__system: System, __component: SystemComponent): Promise<Artifact[]> {
		return []
	}
}

describe('constructor', () => {
	it('simple read only values', async () => {
		const builder = new TestBuilderNoDefaultsConstructor({})
		expect(builder.name).toBe(builderName)
		expect(builder.description).toBe(builderDesc)
		expect(builder.id).toBeDefined()
	})

	it('config parameters exist', async () => {
		const builder = new TestBuilderNoDefaultsConstructor({})
		expect(builder.getConfigurationNames()).toContain(parameterString)
		expect(builder.getConfigurationNames()).toContain(parameterBoolean)
		expect(builder.getConfigurationNames()).toContain(parameterInteger)
		expect(builder.getConfigurationNames()).toContain(parameterFloat)
		expect(builder.getConfigurationNames().length).toBe(4)
	})

	// the parameters are read back out correctly
	it('config parameters are read back out correctly', async () => {
		const builder = new TestBuilderNoDefaultsConstructor({})
		const config = builder.getConfiguration()

		expect(Object.keys(config).length).toBe(4)

		expect(config['configString']).toBeDefined()
		expect(config['configBoolean']).toBeDefined()
		expect(config['configInt']).toBeDefined()
		expect(config['configFloat']).toBeDefined()
		expect(config['nonsense']).toBeUndefined()

		expect(config['configString'].name).toBe(parameterString)
		expect(config['configBoolean'].name).toBe(parameterBoolean)
		expect(config['configInt'].name).toBe(parameterInteger)
		expect(config['configFloat'].name).toBe(parameterFloat)

		expect(config['configString'].valueType).toBe(ValueType.string)
		expect(config['configBoolean'].valueType).toBe(ValueType.boolean)
		expect(config['configInt'].valueType).toBe(ValueType.int)
		expect(config['configFloat'].valueType).toBe(ValueType.float)
	})

	it('config parameters empty', async () => {
		const builder = new TestBuilderNoDefaultsConstructor({})
		expect(builder.getConfiguredValue(parameterString)).toBeUndefined()
		expect(builder.getConfiguredValue(parameterBoolean)).toBeUndefined()
		expect(builder.getConfiguredValue(parameterInteger)).toBeUndefined()
		expect(builder.getConfiguredValue(parameterFloat)).toBeUndefined()
	})

	it('config parameters specified', async () => {
		const stringValue = 'a string value'
		const booleanValue = true
		const intValue = 65536
		const floatValue = 5.21
		const builder = new TestBuilderNoDefaultsConstructor({
			configString: stringValue,
			configBoolean: booleanValue,
			configInt: intValue,
			configFloat: floatValue,
		})
		expect(builder.getConfiguredValue(parameterString)).toBe(stringValue)
		expect(builder.getConfiguredValue(parameterBoolean)).toBe(booleanValue)
		expect(builder.getConfiguredValue(parameterInteger)).toBe(intValue)
		expect(builder.getConfiguredValue(parameterFloat)).toBe(floatValue)
	})

	it('config parameters invalid name', async () => {
		const testFunction = (): void => {
			new TestBuilderNoDefaultsConstructor({ invalidString: '' })
		}
		expect(testFunction).toThrow(RangeError)
	})

	it('config parameters invalid type', async () => {
		let testFunction = (): void => {
			new TestBuilderNoDefaultsConstructor({ configString: 5 })
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			new TestBuilderNoDefaultsConstructor({ configString: true })
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			new TestBuilderNoDefaultsConstructor({ configBoolean: 'string' })
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			new TestBuilderNoDefaultsConstructor({ configBoolean: 5 })
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			new TestBuilderNoDefaultsConstructor({ configInt: 'string' })
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			new TestBuilderNoDefaultsConstructor({ configInt: true })
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			new TestBuilderNoDefaultsConstructor({ configFloat: 'string' })
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			new TestBuilderNoDefaultsConstructor({ configFloat: true })
		}
		expect(testFunction).toThrow(TypeError)
	})
})

describe('getConfiguredValue and setConfiguredValue', () => {
	it('start empty then set', async () => {
		const stringValue = 'a string value'
		const booleanValue = true
		const intValue = 65536
		const floatValue = 5.21
		const builder = new TestBuilderNoDefaultsConstructor({})

		builder.setConfiguredValue(parameterString, stringValue)
		expect(builder.getConfiguredValue(parameterString)).toBe(stringValue)

		builder.setConfiguredValue(parameterBoolean, booleanValue)
		expect(builder.getConfiguredValue(parameterBoolean)).toBe(booleanValue)

		builder.setConfiguredValue(parameterInteger, intValue)
		expect(builder.getConfiguredValue(parameterInteger)).toBe(intValue)

		builder.setConfiguredValue(parameterFloat, floatValue)
		expect(builder.getConfiguredValue(parameterFloat)).toBe(floatValue)
	})

	it('start set then override', async () => {
		const stringValue = 'a string value'
		const booleanValue = true
		const intValue = 65536
		const floatValue = 5.21
		const builder = new TestBuilderNoDefaultsConstructor({
			configString: stringValue,
			configBoolean: booleanValue,
			configInt: intValue,
			configFloat: floatValue,
		})

		const stringValue2 = 'a different string'
		const booleanValue2 = false
		const intValue2 = 42
		const floatValue2 = -45.96
		builder.setConfiguredValue(parameterString, stringValue2)
		expect(builder.getConfiguredValue(parameterString)).toBe(stringValue2)

		builder.setConfiguredValue(parameterBoolean, booleanValue2)
		expect(builder.getConfiguredValue(parameterBoolean)).toBe(booleanValue2)

		builder.setConfiguredValue(parameterInteger, intValue2)
		expect(builder.getConfiguredValue(parameterInteger)).toBe(intValue2)

		builder.setConfiguredValue(parameterFloat, floatValue2)
		expect(builder.getConfiguredValue(parameterFloat)).toBe(floatValue2)
	})

	it('start set then empty', async () => {
		const stringValue = 'a string value'
		const booleanValue = true
		const intValue = 65536
		const floatValue = 5.21
		const builder = new TestBuilderNoDefaultsConstructor({
			configString: stringValue,
			configBoolean: booleanValue,
			configInt: intValue,
			configFloat: floatValue,
		})

		builder.setConfiguredValue(parameterString, undefined)
		expect(builder.getConfiguredValue(parameterString)).toBe(undefined)

		builder.setConfiguredValue(parameterBoolean, undefined)
		expect(builder.getConfiguredValue(parameterBoolean)).toBe(undefined)

		builder.setConfiguredValue(parameterInteger, undefined)
		expect(builder.getConfiguredValue(parameterInteger)).toBe(undefined)

		builder.setConfiguredValue(parameterFloat, undefined)
		expect(builder.getConfiguredValue(parameterFloat)).toBe(undefined)
	})

	it('start set then assign wrong types', async () => {
		const stringValue = 'a string value'
		const booleanValue = true
		const intValue = 65536
		const floatValue = 5.21
		const builder = new TestBuilderNoDefaultsConstructor({
			configString: stringValue,
			configBoolean: booleanValue,
			configInt: intValue,
			configFloat: floatValue,
		})

		let testFunction = (): void => {
			builder.setConfiguredValue(parameterString, 5)
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(parameterString, true)
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(parameterBoolean, 'string')
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(parameterBoolean, 5)
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(parameterInteger, 'string')
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(parameterInteger, true)
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(parameterFloat, 'string')
		}
		expect(testFunction).toThrow(TypeError)
		testFunction = (): void => {
			builder.setConfiguredValue(parameterFloat, true)
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
		const builder = new TestBuilderNoDefaultsConstructor({})
		expect(builder.hasConfigurableValue(parameterString)).toBe(true)
		expect(builder.hasConfigurableValue(parameterBoolean)).toBe(true)
		expect(builder.hasConfigurableValue(parameterInteger)).toBe(true)
		expect(builder.hasConfigurableValue(parameterFloat)).toBe(true)
		expect(builder.hasConfigurableValue('some thing else')).toBe(false)
	})
})

describe('isConfigured', () => {
	it('none set at construction', async () => {
		const builder = new TestBuilderNoDefaultsConstructor({})
		expect(builder.isConfigured()).toBe(false)
	})

	it('all set at construction', async () => {
		const stringValue = 'a string value'
		const booleanValue = true
		const intValue = 65536
		const floatValue = 5.21
		const builder = new TestBuilderNoDefaultsConstructor({
			configString: stringValue,
			configBoolean: booleanValue,
			configInt: intValue,
			configFloat: floatValue,
		})
		expect(builder.isConfigured()).toBe(true)
	})

	it('none set at construction then set', async () => {
		const stringValue = 'a string value'
		const booleanValue = true
		const intValue = 65536
		const floatValue = 5.21
		const builder = new TestBuilderNoDefaultsConstructor({})
		expect(builder.isConfigured()).toBe(false)
		builder.setConfiguredValue(parameterString, stringValue)
		builder.setConfiguredValue(parameterBoolean, booleanValue)
		builder.setConfiguredValue(parameterInteger, intValue)
		builder.setConfiguredValue(parameterFloat, floatValue)
		expect(builder.isConfigured()).toBe(true)
	})

	it('all but 1 set', async () => {
		const stringValue = 'a string value'
		const booleanValue = true
		const intValue = 65536
		const builder = new TestBuilderNoDefaultsConstructor({
			configString: stringValue,
			configBoolean: booleanValue,
			configInt: intValue,
		})
		expect(builder.isConfigured()).toBe(false)
	})
})

describe('getMissingConfigurationValues', () => {
	it('none set at construction', async () => {
		const builder = new TestBuilderNoDefaultsConstructor({})
		expect(builder.isConfigured()).toBe(false)
	})

	it('missing one', async () => {
		const stringValue = 'a string value'
		const booleanValue = true
		const intValue = 65536
		const builder = new TestBuilderNoDefaultsConstructor({
			configString: stringValue,
			configBoolean: booleanValue,
			configInt: intValue,
		})
		const missingValues = builder.getMissingConfigurationValues()
		expect(missingValues[0]).toBe('configFloat')
	})
})

// test a builder where its parameters are specified via method rather than constructor
describe('getInitialConfiguration rather than constructor', () => {
	it('config parameters exist', async () => {
		const builder = new TestBuilderNoDefaultsMethod({
			configString: '',
			configBoolean: false,
			configInt: 0,
			configFloat: 3.5,
		})
		expect(builder.getConfigurationNames()).toContain(parameterString)
		expect(builder.getConfigurationNames()).toContain(parameterBoolean)
		expect(builder.getConfigurationNames()).toContain(parameterInteger)
		expect(builder.getConfigurationNames()).toContain(parameterFloat)
		expect(builder.getConfigurationNames().length).toBe(4)
	})
})

// test a builder where its parameters are specified via method rather than constructor
describe('with defaults', () => {
	it('constructor no values', async () => {
		const builder = new TestBuilderWithDefaultsConstructor({})
		expect(builder.getConfigurationNames()).toContain(parameterString)
		expect(builder.getConfigurationNames()).toContain(parameterBoolean)
		expect(builder.getConfigurationNames()).toContain(parameterInteger)
		expect(builder.getConfigurationNames()).toContain(parameterFloat)

		expect(builder.getConfiguredValue(parameterString)).toBe(defaultString)
		expect(builder.getConfiguredValue(parameterBoolean)).toBe(defaultBoolean)
		expect(builder.getConfiguredValue(parameterInteger)).toBe(defaultInt)
		expect(builder.getConfiguredValue(parameterFloat)).toBe(defaultFloat)
	})

	it('constructor with values the clear', async () => {
		const stringValue = 'a string value'
		const booleanValue = true
		const intValue = 65536
		const floatValue = 5.21
		const builder = new TestBuilderWithDefaultsConstructor({
			configString: stringValue,
			configBoolean: booleanValue,
			configInt: intValue,
			configFloat: floatValue,
		})
		expect(builder.getConfiguredValue(parameterString)).toBe(stringValue)
		expect(builder.getConfiguredValue(parameterBoolean)).toBe(booleanValue)
		expect(builder.getConfiguredValue(parameterInteger)).toBe(intValue)
		expect(builder.getConfiguredValue(parameterFloat)).toBe(floatValue)

		builder.setConfiguredValue(parameterString, undefined)
		expect(builder.getConfiguredValue(parameterString)).toBe(defaultString)

		builder.setConfiguredValue(parameterBoolean, undefined)
		expect(builder.getConfiguredValue(parameterBoolean)).toBe(defaultBoolean)

		builder.setConfiguredValue(parameterInteger, undefined)
		expect(builder.getConfiguredValue(parameterInteger)).toBe(defaultInt)

		builder.setConfiguredValue(parameterFloat, undefined)
		expect(builder.getConfiguredValue(parameterFloat)).toBe(defaultFloat)
	})
})

describe('regexFromConfigurationString', () => {
	it('config parameters exist', async () => {
		const builder = new TestBuilderNoDefaultsMethod({})

		let result = builder.regexFromConfigurationString('hi')
		expect(result.source).toBe('hi')

		result = builder.regexFromConfigurationString('/hi/')
		expect(result.source).toBe('hi')

		result = builder.regexFromConfigurationString('hi/')
		expect(result.source).toBe('hi\\/')

		result = builder.regexFromConfigurationString('/hi')
		expect(result.source).toBe('\\/hi')

		result = builder.regexFromConfigurationString('/hi/g')
		expect(result.source).toBe('hi')
		expect(result.flags).toBe('g')

		result = builder.regexFromConfigurationString('/hi/gi')
		expect(result.source).toBe('hi')
		expect(result.flags).toBe('gi')
	})
})

describe('build', () => {
	it('fail with string as error', async () => {
		const builder = new TestBuilderWithDefaultsConstructor({})

		try {
			await builder.build(new System())
			fail('error should have been thrown')
		} catch (problem) {
			expect((problem as any).message).toBe('error as string')
		}
	})
})
