/* eslint-disable max-lines-per-function */
import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { ValueType } from '../../system/ValueType'
import { ValueTypeResolver } from '../../system/ValueTypeResolver'

describe('constructor', () => {
	it('optional parameter', async () => {
		const type = new ValueType('type', 'nameSpace', 'name', 'description')
		expect(type.objectTypeName).toBe('type')
		expect(type.nameSpace).toBe('nameSpace')
		expect(type.name).toBe('name')
		expect(type.description).toBe('description')
		expect(type.primitive).toBe(true)
	})
})

describe('asCollection', () => {
	it('primitive', async () => {
		const obj = ValueType.boolean
		const asCollection = obj.asCollection
		const collectedType = asCollection.collectedType
		expect(collectedType).toBe(obj)
		expect(asCollection.collectedType).toBeNull
	})

	it('collected primitive', async () => {
		const obj = ValueType.boolean
		const asCollection = obj.asCollection
		const asCollectedCollection = asCollection.asCollection
		expect(asCollectedCollection.collectedType).toBe(asCollection)
		expect(asCollection.collectedType).toBe(obj)
	})

	it('arbitrary instance', async () => {
		const obj = new ValueType('ValueType', 'INFORMATION_MODEL', 'someObject', '', false)
		const asCollection = obj.asCollection
		const collectedType = asCollection.collectedType
		expect(collectedType).toBe(obj)
		expect(asCollection.collectedType).toBeNull
	})

	it('collected arbitrary instance', async () => {
		const obj = new ValueType('ValueType', 'INFORMATION_MODEL', 'someObject', '', false)
		const asCollection = obj.asCollection
		const asCollectedCollection = asCollection.asCollection
		expect(asCollectedCollection.collectedType).toBe(asCollection)
		expect(asCollection.collectedType).toBe(obj)
	})
})

describe('getValues', () => {
	it('all there', async () => {
		const types = ValueType.getValues()
		expect(types.length).toBe(23)
		expect(types.includes(ValueType.object)).toBe(true)
		expect(types.includes(ValueType.string)).toBe(true)
		expect(types.includes(ValueType.int)).toBe(true)
		expect(types.includes(ValueType.number)).toBe(true)
		expect(types.includes(ValueType.float)).toBe(true)
		expect(types.includes(ValueType.boolean)).toBe(true)
		expect(types.includes(ValueType.dateTime)).toBe(true)
		expect(types.includes(ValueType.date)).toBe(true)
		expect(types.includes(ValueType.time)).toBe(true)
		expect(types.includes(ValueType.interval)).toBe(true)
		expect(types.includes(ValueType.decimal)).toBe(true)
		expect(types.includes(ValueType.void)).toBe(true)
	})
})

describe('install', () => {
	const arbitraryTypeName = 'someTypeName'
	const arbitraryReturnedTypeName = 'mappedToSomeTypeName'
	const arbitraryType = new ValueType('ValueType', 'INFORMATION_MODEL', arbitraryTypeName, '', false)
	class TestResolver implements ValueTypeResolver {
		doesSupport(language: ProgrammingLanguage): boolean {
			return language === ProgrammingLanguage.sql
		}

		doesMap(type: any): boolean {
			if (type === ValueType.string) return true
			return arbitraryType === type
		}

		fromType(originalType: any): string {
			if (typeof originalType == 'string') {
				if (originalType === ValueType.string.name) return undefined as any
				if (originalType === ValueType.interval.asOptional.name) return 'special interval'
				if (originalType === ValueType.time.asOptional.name) return 'special time'
				if (originalType === arbitraryType.name) return arbitraryType.name
				if (originalType === arbitraryType.asCollection.name) return arbitraryType.asCollection.name
			} else {
				if (originalType === ValueType.string) return undefined as any
				if (originalType === ValueType.interval.asOptional) return 'special interval'
				if (originalType === ValueType.time.asOptional) return 'special time'
				if (originalType === arbitraryType) return arbitraryType.name
			}
			return 'nope'
		}

		hasName(name: string): boolean {
			return arbitraryTypeName === name
		}

		toTypeName(name: string): string {
			return arbitraryTypeName === name ? arbitraryReturnedTypeName : ''
		}

		toType(name: string): ValueType | undefined {
			return name == 'string' ? undefined : ValueType.string
		}
	}
	const resolver = new TestResolver()

	beforeEach(() => {
		ValueType.install(ProgrammingLanguage.sql, resolver)
	})

	it('hasNameInLanguage', async () => {
		expect(ValueType.hasNameInLanguage(ProgrammingLanguage.sql, 'string')).toBe(false)
		expect(ValueType.hasNameInLanguage(ProgrammingLanguage.sql, arbitraryTypeName)).toBe(true)
		expect(ValueType.hasNameInLanguage(ProgrammingLanguage.tSql, 'string')).toBe(false)
		expect(ValueType.hasNameInLanguage(ProgrammingLanguage.tSql, arbitraryTypeName)).toBe(false)
	})

	it('fromNameInLanguage', async () => {
		let result = ValueType.fromNameInLanguage(ProgrammingLanguage.sql, 'special interval')
		expect(result).toBe(ValueType.string)

		result = ValueType.fromNameInLanguage(ProgrammingLanguage.sql, 'special time')
		expect(result).toBe(ValueType.string)

		result = ValueType.fromNameInLanguage(ProgrammingLanguage.sql, 'noSuchName')
		expect(result).toBe(ValueType.string)

		expect(ValueType.fromNameInLanguage(ProgrammingLanguage.tSql, 'noSuchName')).toBeUndefined()
		expect(ValueType.fromNameInLanguage(ProgrammingLanguage.tSql, arbitraryTypeName)).toBeUndefined()
	})

	it('inLanguage', async () => {
		expect(arbitraryType.toNameInLanguage(ProgrammingLanguage.sql)).toBe(arbitraryTypeName)
		expect(arbitraryType.asCollection.toNameInLanguage(ProgrammingLanguage.sql)).toBe(`${arbitraryTypeName}[]`)
		expect(ValueType.string.toNameInLanguage(ProgrammingLanguage.sql)).toBeUndefined()

		const typeNotInLanguage = new ValueType('ValueType', 'INFORMATION_MODEL', 'someObject', '', false)
		expect(typeNotInLanguage.toNameInLanguage(ProgrammingLanguage.tSql)).toBeUndefined()

		// this is not mapped so it goes through a different branch of code
		expect(ValueType.boolean.toNameInLanguage(ProgrammingLanguage.sql)).toBe('nope')
		expect(arbitraryType.toNameInLanguage(ProgrammingLanguage.sql)).toBe(arbitraryTypeName)
	})
})

describe('hasName', () => {
	it('all there', async () => {
		expect(ValueType.hasName(ValueType.object.name)).toBe(true)
		expect(ValueType.hasName(ValueType.string.name)).toBe(true)
		expect(ValueType.hasName(ValueType.int.name)).toBe(true)
		expect(ValueType.hasName(ValueType.float.name)).toBe(true)
		expect(ValueType.hasName(ValueType.boolean.name)).toBe(true)
		expect(ValueType.hasName(ValueType.dateTime.name)).toBe(true)
		expect(ValueType.hasName(ValueType.date.name)).toBe(true)
		expect(ValueType.hasName(ValueType.time.name)).toBe(true)
		expect(ValueType.hasName(ValueType.interval.name)).toBe(true)
		expect(ValueType.hasName(ValueType.decimal.name)).toBe(true)
		expect(ValueType.hasName(ValueType.void.name)).toBe(true)
	})

	it('missing', async () => {
		expect(ValueType.hasName('no such name')).toBe(false)
	})

	it('bad', async () => {
		expect(ValueType.hasName(undefined as any)).toBe(false)
	})
})

describe('fromName', () => {
	it('all there', async () => {
		expect(ValueType.fromName(ValueType.object.name)).toBe(ValueType.object)
		expect(ValueType.fromName(ValueType.string.name)).toBe(ValueType.string)
		expect(ValueType.fromName(ValueType.int.name)).toBe(ValueType.int)
		expect(ValueType.fromName(ValueType.float.name)).toBe(ValueType.float)
		expect(ValueType.fromName(ValueType.boolean.name)).toBe(ValueType.boolean)
		expect(ValueType.fromName(ValueType.dateTime.name)).toBe(ValueType.dateTime)
		expect(ValueType.fromName(ValueType.date.name)).toBe(ValueType.date)
		expect(ValueType.fromName(ValueType.time.name)).toBe(ValueType.time)
		expect(ValueType.fromName(ValueType.interval.name)).toBe(ValueType.interval)
		expect(ValueType.fromName(ValueType.decimal.name)).toBe(ValueType.decimal)
		expect(ValueType.fromName(ValueType.void.name)).toBe(ValueType.void)

		const result = ValueType.fromName(undefined as any)
		expect(result).toBeUndefined()
	})
})

describe('isObject', () => {
	it('all there', async () => {
		expect(ValueType.object.isObject).toBe(false)
	})
})
