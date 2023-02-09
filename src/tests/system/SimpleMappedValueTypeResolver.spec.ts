import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../system/ValueType'

describe('constructor', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const resolver = new SimpleMappedValueTypeResolver(
			language,
			{
				object: 'object',
				string: 'string',
			},
			{
				object: 'object?',
				string: 'string?',
			}
		)

		expect(resolver.language).toBe(ProgrammingLanguage.python)
		expect(resolver.mandatoryValueTypes).toBeDefined()
		expect(resolver.optionalValueTypes).toBeDefined()
	})
})

describe('doesSupport', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const resolver = new SimpleMappedValueTypeResolver(
			language,
			{
				object: 'object',
				string: 'string',
			},
			{
				object: 'object?',
				string: 'string?',
			}
		)

		expect(resolver.doesSupport(language)).toBe(true)
		expect(resolver.doesSupport(ProgrammingLanguage.tSql)).toBe(false)

		const testFunction1 = (): void => {
			resolver.doesSupport(undefined as any)
		}
		expect(testFunction1).toThrow()
	})
})

describe('doesMap', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const resolver = new SimpleMappedValueTypeResolver(
			language,
			{
				object: 'object',
				string: 'string',
			},
			{
				object: 'object?',
				string: 'string?',
			}
		)

		expect(resolver.doesMap(ValueType.object)).toBe(true)
		expect(resolver.doesMap(ValueType.void)).toBe(false)

		const testFunction1 = (): void => {
			resolver.doesMap(undefined as any)
		}
		expect(testFunction1).toThrow()
	})
})

describe('hasName', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const resolver = new SimpleMappedValueTypeResolver(
			language,
			{
				object: 'object',
				string: 'string',
			},
			{
				object: 'object?',
				string: 'string?',
			}
		)

		expect(resolver.hasName(ValueType.object.name)).toBe(true)
		expect(resolver.hasName(ValueType.void.name)).toBe(false)

		const testFunction1 = (): void => {
			resolver.hasName(undefined as any)
		}
		expect(testFunction1).toThrow()
	})
})

describe('fromType', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const resolver = new SimpleMappedValueTypeResolver(
			language,
			{
				object: 'object',
				string: 'string',
			},
			{
				object: 'object?',
				string: 'string?',
			}
		)

		expect(resolver.fromType(ValueType.object)).toBe('object')
		expect(resolver.fromType(ValueType.object, true)).toBe('object?')
		expect(resolver.fromType(ValueType.object, false)).toBe('object')
		expect(resolver.fromType(ValueType.string)).toBe('string')
		expect(resolver.fromType(ValueType.string, true)).toBe('string?')
		expect(resolver.fromType(ValueType.string, false)).toBe('string')

		const nonPrimitive = new ValueType('ValueType', 'INFORMATION_MODEL', 'nonPrimitive', '', false)
		expect(resolver.fromType(nonPrimitive, false)).toBe('nonPrimitive')

		const testFunction1 = (): void => {
			resolver.fromType(ValueType.void)
		}
		expect(testFunction1).toThrow()

		const testFunction2 = (): void => {
			resolver.fromType(undefined as any)
		}
		expect(testFunction2).toThrow()
	})
})

describe('toType', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const resolver = new SimpleMappedValueTypeResolver(
			language,
			{
				object: 'object',
				string: 'string',
			},
			{
				object: 'object?',
				string: 'string?',
			}
		)

		expect(resolver.toTypeName('object')).toBe(ValueType.object.name)
		expect(resolver.toTypeName('string')).toBe(ValueType.string.name)
		expect(resolver.toTypeName('void')).toBeUndefined()

		const testFunction2 = (): void => {
			resolver.toTypeName(undefined as any)
		}
		expect(testFunction2).toThrow()
	})
})
