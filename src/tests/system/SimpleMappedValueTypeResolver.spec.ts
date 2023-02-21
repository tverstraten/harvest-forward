import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../system/ValueType'

describe('constructor', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const map = new Map<ValueType, string>([
			[ValueType.object, 'object'],
			[ValueType.string, 'string'],
			[ValueType.object.asOptional, 'object?'],
			[ValueType.string.asOptional, 'string?'],
		])
		const resolver = new SimpleMappedValueTypeResolver(language, map)

		expect(resolver.language).toBe(ProgrammingLanguage.python)
		expect(resolver.types).toBeDefined()
	})
})

describe('doesSupport', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const map = new Map<ValueType, string>([
			[ValueType.object, 'object'],
			[ValueType.string, 'string'],
			[ValueType.object.asOptional, 'object?'],
			[ValueType.string.asOptional, 'string?'],
		])
		const resolver = new SimpleMappedValueTypeResolver(language, map)

		expect(resolver.doesSupport(language)).toBe(true)
		expect(resolver.doesSupport(ProgrammingLanguage.tSql)).toBe(false)
		expect(resolver.doesSupport(undefined as any)).toBe(false)
	})
})

describe('doesMap', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const map = new Map<ValueType, string>([
			[ValueType.object, 'object'],
			[ValueType.string, 'string'],
			[ValueType.object.asOptional, 'object?'],
			[ValueType.string.asOptional, 'string?'],
		])
		const resolver = new SimpleMappedValueTypeResolver(language, map)

		expect(resolver.doesMap(ValueType.object.name)).toBe(true)
		expect(resolver.doesMap(ValueType.void.name)).toBe(false)
		expect(resolver.doesMap(undefined as any)).toBe(false)
	})
})

describe('fromType', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const map = new Map<ValueType, string>([
			[ValueType.object, 'object'],
			[ValueType.string, 'string'],
			[ValueType.object.asOptional, 'object?'],
			[ValueType.string.asOptional, 'string?'],
		])
		const resolver = new SimpleMappedValueTypeResolver(language, map)

		expect(resolver.fromType(ValueType.object)).toBe('object')
		expect(resolver.fromType(ValueType.object.asOptional)).toBe('object?')
		expect(resolver.fromType(ValueType.object)).toBe('object')
		expect(resolver.fromType(ValueType.string)).toBe('string')
		expect(resolver.fromType(ValueType.string.asOptional)).toBe('string?')
		expect(resolver.fromType(ValueType.string)).toBe('string')
		expect(resolver.fromType(ValueType.void)).toBeUndefined()
		expect(resolver.fromType(undefined as any)).toBeUndefined()
	})
})

describe('toType', () => {
	it('simple value check', async () => {
		const language = ProgrammingLanguage.python
		const map = new Map<ValueType, string>([
			[ValueType.object, 'object'],
			[ValueType.string, 'string'],
			[ValueType.object.asOptional, 'object?'],
			[ValueType.string.asOptional, 'string?'],
		])
		const resolver = new SimpleMappedValueTypeResolver(language, map)

		expect(resolver.toTypeName('object')).toBe(ValueType.object.name)
		expect(resolver.toTypeName('string')).toBe(ValueType.string.name)
		expect(resolver.toTypeName('void')).toBeUndefined()
		expect(resolver.toTypeName(undefined as any)).toBeUndefined()
	})
})
