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
		expect(types.length).toBe(11)
		expect(types.includes(ValueType.object)).toBe(true)
		expect(types.includes(ValueType.string)).toBe(true)
		expect(types.includes(ValueType.int)).toBe(true)
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

		fromType(originalType: any, optional: boolean): string {
			if (originalType === ValueType.string) return undefined as any
			if (originalType === ValueType.interval && optional) return 'special interval'
			if (originalType === ValueType.time && !optional) return 'special time'
			return originalType === arbitraryType ? arbitraryType.name : 'nope'
		}

		hasName(name: string): boolean {
			return arbitraryTypeName === name
		}

		toType(name: string): string {
			return arbitraryTypeName === name ? arbitraryReturnedTypeName : ''
		}
	}
	const resolver = new TestResolver()

	beforeEach(() => {
		ValueType.install(ProgrammingLanguage.sql, resolver)
	})

	it('hasNameInType', async () => {
		expect(ValueType.hasNameInType(ProgrammingLanguage.sql, 'noSuchName')).toBe(false)
		expect(ValueType.hasNameInType(ProgrammingLanguage.sql, arbitraryTypeName)).toBe(true)
		expect(ValueType.hasNameInType(ProgrammingLanguage.tSql, 'noSuchName')).toBe(false)
		expect(ValueType.hasNameInType(ProgrammingLanguage.tSql, arbitraryTypeName)).toBe(false)
	})

	it('fromNameInType', async () => {
		let result = ValueType.fromNameInType(ProgrammingLanguage.sql, 'special interval')
		expect(result).toBe(ValueType.interval)

		result = ValueType.fromNameInType(ProgrammingLanguage.sql, 'special time')
		expect(result).toBe(ValueType.time)

		const testFunction1 = (): void => {
			ValueType.fromNameInType(ProgrammingLanguage.sql, 'noSuchName')
		}
		expect(testFunction1).toThrow()

		const testFunction2 = (): void => {
			ValueType.fromNameInType(ProgrammingLanguage.tSql, 'noSuchName')
		}
		expect(testFunction2).toThrow()

		const testFunction3 = (): void => {
			ValueType.fromNameInType(ProgrammingLanguage.tSql, arbitraryTypeName)
		}
		expect(testFunction3).toThrow()
	})

	it('inLanguage', async () => {
		expect(arbitraryType.inLanguage(ProgrammingLanguage.sql)).toBe(arbitraryTypeName)
		expect(arbitraryType.asCollection.inLanguage(ProgrammingLanguage.sql)).toBe(`${arbitraryTypeName}[]`)
		expect(ValueType.string.inLanguage(ProgrammingLanguage.sql)).toBe(ValueType.string.name)

		const testFunction1 = (): void => {
			const typeNotInLanguage = new ValueType('ValueType', 'INFORMATION_MODEL', 'someObject', '', false)
			typeNotInLanguage.inLanguage(ProgrammingLanguage.tSql)
		}
		expect(testFunction1).toThrow()

		// this is not mapped so it goes through a different branch of code
		expect(ValueType.boolean.inLanguage(ProgrammingLanguage.sql)).toBe(ValueType.boolean.name)
		expect(arbitraryType.inLanguage(ProgrammingLanguage.sql, true, null as any)).toBe(arbitraryTypeName)
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
		const testFunction1 = (): void => {
			ValueType.hasName(undefined as any)
		}
		expect(testFunction1).toThrow()
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

		const testFunction1 = (): void => {
			ValueType.fromName(undefined as any)
		}
		expect(testFunction1).toThrow()
	})
})

describe('isObject', () => {
	it('all there', async () => {
		expect(ValueType.object.isObject).toBe(false)
	})
})
