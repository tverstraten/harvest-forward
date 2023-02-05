import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'

describe('constructor', () => {
	const description_basic = 'some silly description'
	const path_2part_slash = 'my/path'
	const name_basic = 'my_name'

	it('bad parameters', async () => {
		const testFunction1 = (): void => {
			new SystemDescendantComponent(undefined as unknown as string, path_2part_slash, name_basic, SystemComponentType.storage, description_basic)
		}
		expect(testFunction1).toThrow()

		const testFunction2 = (): void => {
			new SystemDescendantComponent('', undefined as unknown as string, name_basic, SystemComponentType.storage, description_basic)
		}
		expect(testFunction2).toThrow()

		const testFunction3 = (): void => {
			new SystemDescendantComponent('', path_2part_slash, undefined as unknown as string, SystemComponentType.storage, description_basic)
		}
		expect(testFunction3).toThrow()
	})
})

describe('set name', () => {
	const description_basic = 'some silly description'
	const path_2part_slash = 'my/path'
	const name_basic = 'my_name'
	const secondName = 'second'

	it('basic value', async () => {
		const obj = new SystemDescendantComponent('', path_2part_slash, name_basic, SystemComponentType.storage, description_basic)
		obj.name = secondName

		expect(obj.name).toBe(secondName)
		expect(obj.constantCaseFullName.endsWith(secondName.toUpperCase())).toBe(true)
		expect(obj.constantCaseFullName.startsWith(path_2part_slash.toUpperCase())).toBe(true)
		expect(obj.constantCaseFullName).toBe(`${path_2part_slash.toUpperCase()}/${secondName.toUpperCase()}`)
	})

	it('empty value', async () => {
		const obj = new SystemDescendantComponent('', path_2part_slash, name_basic, SystemComponentType.storage, description_basic)
		obj.name = ''

		expect(obj.name).toBe('')
		expect(obj.constantCaseFullName).toBe(`${path_2part_slash.toUpperCase()}/`)
	})

	it('undefined', async () => {
		const obj = new SystemDescendantComponent('', path_2part_slash, name_basic, SystemComponentType.storage, description_basic)

		const testFunction2 = (): void => {
			obj.name = undefined as unknown as string
		}
		expect(testFunction2).toThrow()
	})
})

describe('setNames hierarchy', () => {
	const description_basic = 'some silly description'
	const basePath = 'my/path'
	const grandParentName = 'gp'
	const parentName = 'pr'
	const startingName = 'firstName'
	const newName = 'replacement'

	it('basic value', async () => {
		const grandParent = new SystemDescendantComponent('Class', basePath, grandParentName, SystemComponentType.storage, description_basic)
		const parent = new SystemDescendantComponent('Class', grandParent.fullConstantCaseName, parentName, SystemComponentType.storage, description_basic)
		const object = new SystemDescendantComponent('Class', parent.fullConstantCaseName, startingName, SystemComponentType.storage, description_basic)

		grandParent.addChild(parent)
		parent.addChild(object)
		object.name = newName

		expect(object.name).toBe(newName)
		expect(parent.children[object.constantCaseFullName]).toBe(object)
		expect(parent.descendants[object.constantCaseFullName]).toBe(object)
		expect(grandParent.descendants[object.constantCaseFullName]).toBe(object)
	})
})

describe('pascalCaseName', () => {
	const description_basic = 'some silly description'
	const basePath = 'my/path'
	const startingName = 'replacement'

	it('set of values', async () => {
		const object = new SystemDescendantComponent('Class', basePath, startingName, SystemComponentType.storage, description_basic)

		expect(object.pascalCaseName).toBe('Replacement')
		object.name = 'some thing else'
		expect(object.pascalCaseName).toBe('SomeThingElse')
		object.name = 'yet_another_'
		expect(object.pascalCaseName).toBe('YetAnother')
		object.name = 'camelBad'
		expect(object.pascalCaseName).toBe('CamelBad')
	})
})

describe('pascalCaseNameSpace', () => {
	const description_basic = 'some silly description'
	const basePath = 'my/path'
	const startingName = 'replacement'

	it('set of values', async () => {
		const object = new SystemDescendantComponent('Class', basePath, startingName, SystemComponentType.storage, description_basic)

		expect(object.pascalCaseNameSpace).toBe('My/Path')
		object.nameSpace = 'some thing else'
		expect(object.pascalCaseNameSpace).toBe('SomeThingElse')
		object.nameSpace = 'yet_another_'
		expect(object.pascalCaseNameSpace).toBe('YetAnother')
		object.nameSpace = 'camelBad'
		expect(object.pascalCaseNameSpace).toBe('CamelBad')
		object.nameSpace = 'camel/Bad'
		expect(object.pascalCaseNameSpace).toBe('Camel/Bad')
	})
})

describe('snakeCaseName', () => {
	const description_basic = 'some silly description'
	const basePath = 'my/path'
	const startingName = 'replacement'

	it('set of values', async () => {
		const object = new SystemDescendantComponent('Class', basePath, startingName, SystemComponentType.storage, description_basic)

		expect(object.snakeCaseName).toBe('replacement')
		object.name = 'some thing else'
		expect(object.snakeCaseName).toBe('some_thing_else')
		object.name = 'yet_another_'
		expect(object.snakeCaseName).toBe('yet_another')
		object.name = 'camelBad'
		expect(object.snakeCaseName).toBe('camel_bad')
	})
})

describe('snakeCaseNameSpace', () => {
	const description_basic = 'some silly description'
	const basePath = 'my/path'
	const startingName = 'replacement'

	it('set of values', async () => {
		const object = new SystemDescendantComponent('Class', basePath, startingName, SystemComponentType.storage, description_basic)

		expect(object.snakeCaseNameSpace).toBe('my/path')
		object.nameSpace = 'some thing else'
		expect(object.snakeCaseNameSpace).toBe('some_thing_else')
		object.nameSpace = 'yet_another_'
		expect(object.snakeCaseNameSpace).toBe('yet_another')
		object.nameSpace = 'camelBad'
		expect(object.snakeCaseNameSpace).toBe('camel_bad')
		object.nameSpace = 'camel/Bad'
		expect(object.snakeCaseNameSpace).toBe('camel/bad')
	})
})

describe('camelCaseName', () => {
	const description_basic = 'some silly description'
	const basePath = 'my/path'
	const startingName = 'replacement'

	it('set of values', async () => {
		const object = new SystemDescendantComponent('Class', basePath, startingName, SystemComponentType.storage, description_basic)

		expect(object.camelCaseName).toBe('replacement')
		object.name = 'some thing else'
		expect(object.camelCaseName).toBe('someThingElse')
		object.name = 'yet_another_'
		expect(object.camelCaseName).toBe('yetAnother')
		object.name = 'camelBad'
		expect(object.camelCaseName).toBe('camelBad')
	})
})

describe('camelCaseNameSpace', () => {
	const description_basic = 'some silly description'
	const basePath = 'my/path'
	const startingName = 'replacement'

	it('set of values', async () => {
		const object = new SystemDescendantComponent('Class', basePath, startingName, SystemComponentType.storage, description_basic)

		expect(object.camelCaseNameSpace).toBe('my/path')
		object.nameSpace = 'some thing else'
		expect(object.camelCaseNameSpace).toBe('someThingElse')
		object.nameSpace = 'yet_another_'
		expect(object.camelCaseNameSpace).toBe('yetAnother')
		object.nameSpace = 'camelBad'
		expect(object.camelCaseNameSpace).toBe('camelBad')
		object.nameSpace = 'camel/Bad'
		expect(object.camelCaseNameSpace).toBe('camel/bad')
	})
})

describe('set nameSpace', () => {
	const description_basic = 'some silly description'
	const basePath = 'my/path'
	const grandParentName = 'gp'
	const parentName = 'pr'
	const startingName = 'firstName'
	const newName = 'different'

	it('set of values', async () => {
		const grandParent = new SystemDescendantComponent('Class', basePath, grandParentName, SystemComponentType.storage, description_basic)
		const parent = new SystemDescendantComponent('Class', grandParent.fullConstantCaseName, parentName, SystemComponentType.storage, description_basic)
		const object = new SystemDescendantComponent('Class', parent.fullConstantCaseName, startingName, SystemComponentType.storage, description_basic)

		grandParent.addChild(parent)
		parent.addChild(object)
		object.nameSpace = newName

		expect(object.nameSpace).toBe(newName)
		expect(parent.children[object.constantCaseFullName]).toBe(object)
		expect(parent.descendants[object.constantCaseFullName]).toBe(object)
		expect(grandParent.descendants[object.constantCaseFullName]).toBe(object)
	})
})
