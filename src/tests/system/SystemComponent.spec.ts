/* eslint-disable max-lines-per-function */
import { Class } from '../../plugins/information-architecture/oo/Class'
import { Permanence } from '../../system/Permanence'
import { System } from '../../system/System'
import { SystemComponent } from '../../system/SystemComponent'
import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'

describe('Character Casing', () => {
	const description_basic = 'some silly description'
	const path_2part_middle_slash = 'my/path'
	const path_2part_start_slash = '/my/path'
	const path_2part_end_slash = 'my/path/'
	const name_basic = 'my_name'
	const name_basic_start_slash = '/my_name'
	const name_basic_end_slash = 'my_name/'
	const slashRegex = new RegExp(/\//g)

	it('basic full name constant case path middle slash', async () => {
		const obj = new SystemDescendantComponent('', path_2part_middle_slash, name_basic, SystemComponentType.storage, description_basic)
		expect(obj.name).toBe(name_basic)
		expect(obj.description).toBe(description_basic)
		expect(obj.id).toBeDefined()
		expect(obj.id.length).toBe(36)
		expect(obj.constantCaseFullName).toBe(obj.constantCaseFullName.toUpperCase())
		const matches = obj.constantCaseFullName.match(slashRegex) as any
		expect(matches.length).toBe(2)

		expect(obj.constantCaseFullName.startsWith('/')).toBe(false)
		expect(obj.constantCaseNameSpace.startsWith('/')).toBe(false)
		expect(obj.constantCaseName.startsWith('/')).toBe(false)
		expect(obj.constantCaseFullName.endsWith('/')).toBe(false)
		expect(obj.constantCaseNameSpace.endsWith('/')).toBe(false)
		expect(obj.constantCaseName.endsWith('/')).toBe(false)
		expect(obj.constantCaseFullName.includes(name_basic.toUpperCase())).toBe(true)
		expect(obj.constantCaseFullName.includes(path_2part_middle_slash.toUpperCase())).toBe(true)
	})

	it('basic full name constant case path start slash', async () => {
		const obj = new SystemDescendantComponent('', path_2part_start_slash, name_basic, SystemComponentType.storage, description_basic)
		expect(obj.name).toBe(name_basic)
		expect(obj.description).toBe(description_basic)
		expect(obj.id).toBeDefined()
		expect(obj.id.length).toBe(36)
		expect(obj.constantCaseFullName).toBe(obj.constantCaseFullName.toUpperCase())
		const matches = obj.constantCaseFullName.match(slashRegex) as any
		expect(matches.length).toBe(2)

		expect(obj.constantCaseFullName.startsWith('/')).toBe(false)
		expect(obj.constantCaseNameSpace.startsWith('/')).toBe(false)
		expect(obj.constantCaseName.startsWith('/')).toBe(false)
		expect(obj.constantCaseFullName.endsWith('/')).toBe(false)
		expect(obj.constantCaseNameSpace.endsWith('/')).toBe(false)
		expect(obj.constantCaseName.endsWith('/')).toBe(false)
		expect(obj.constantCaseFullName.includes(name_basic.toUpperCase())).toBe(true)
		expect(obj.constantCaseFullName.includes(path_2part_middle_slash.toUpperCase())).toBe(true)
	})

	it('basic full name constant case path end slash', async () => {
		const obj = new SystemDescendantComponent('', path_2part_end_slash, name_basic, SystemComponentType.storage, description_basic)
		expect(obj.name).toBe(name_basic)
		expect(obj.description).toBe(description_basic)
		expect(obj.id).toBeDefined()
		expect(obj.id.length).toBe(36)
		expect(obj.constantCaseFullName).toBe(obj.constantCaseFullName.toUpperCase())
		const matches = obj.constantCaseFullName.match(slashRegex) as any
		expect(matches.length).toBe(2)

		expect(obj.constantCaseFullName.startsWith('/')).toBe(false)
		expect(obj.constantCaseNameSpace.startsWith('/')).toBe(false)
		expect(obj.constantCaseName.startsWith('/')).toBe(false)
		expect(obj.constantCaseFullName.endsWith('/')).toBe(false)
		expect(obj.constantCaseNameSpace.endsWith('/')).toBe(false)
		expect(obj.constantCaseName.endsWith('/')).toBe(false)
		expect(obj.constantCaseFullName.includes(name_basic.toUpperCase())).toBe(true)
		expect(obj.constantCaseFullName.includes(path_2part_middle_slash.toUpperCase())).toBe(true)
	})

	it('basic full name constant case name start slash', async () => {
		const obj = new SystemDescendantComponent('', path_2part_middle_slash, name_basic_start_slash, SystemComponentType.storage, description_basic)
		expect(obj.name).toBe(name_basic)
		expect(obj.description).toBe(description_basic)
		expect(obj.id).toBeDefined()
		expect(obj.id.length).toBe(36)
		expect(obj.constantCaseFullName).toBe(obj.constantCaseFullName.toUpperCase())
		const matches = obj.constantCaseFullName.match(slashRegex) as any
		expect(matches.length).toBe(2)

		expect(obj.constantCaseFullName.startsWith('/')).toBe(false)
		expect(obj.constantCaseNameSpace.startsWith('/')).toBe(false)
		expect(obj.constantCaseName.startsWith('/')).toBe(false)
		expect(obj.constantCaseFullName.endsWith('/')).toBe(false)
		expect(obj.constantCaseNameSpace.endsWith('/')).toBe(false)
		expect(obj.constantCaseName.endsWith('/')).toBe(false)
		expect(obj.constantCaseFullName.includes(name_basic.toUpperCase())).toBe(true)
		expect(obj.constantCaseFullName.includes(path_2part_middle_slash.toUpperCase())).toBe(true)
	})

	it('basic full name constant case name end slash', async () => {
		const obj = new SystemDescendantComponent('', path_2part_middle_slash, name_basic_end_slash, SystemComponentType.storage, description_basic)
		expect(obj.name).toBe(name_basic)
		expect(obj.description).toBe(description_basic)
		expect(obj.id).toBeDefined()
		expect(obj.id.length).toBe(36)
		expect(obj.constantCaseFullName).toBe(obj.constantCaseFullName.toUpperCase())
		const matches = obj.constantCaseFullName.match(slashRegex) as any
		expect(matches.length).toBe(2)

		expect(obj.constantCaseFullName.startsWith('/')).toBe(false)
		expect(obj.constantCaseNameSpace.startsWith('/')).toBe(false)
		expect(obj.constantCaseName.startsWith('/')).toBe(false)
		expect(obj.constantCaseFullName.endsWith('/')).toBe(false)
		expect(obj.constantCaseNameSpace.endsWith('/')).toBe(false)
		expect(obj.constantCaseName.endsWith('/')).toBe(false)
		expect(obj.constantCaseFullName.includes(name_basic.toUpperCase())).toBe(true)
		expect(obj.constantCaseFullName.includes(path_2part_middle_slash.toUpperCase())).toBe(true)
	})
})

describe('Searching', () => {
	const system: System = new System()
	const class1 = new SystemDescendantComponent('Class', 'information model', 'first_class', SystemComponentType.informationModel, 'description1')
	const class2 = new SystemDescendantComponent('Class', 'information model', 'second_class', SystemComponentType.informationModel, 'description2')
	const class3 = new SystemDescendantComponent('Class', 'information model', 'third_class', SystemComponentType.informationModel, 'description3')
	const class4 = new SystemDescendantComponent('Class', 'information model', 'fourth_class', SystemComponentType.informationModel, 'description4')
	const prop1 = new SystemDescendantComponent('Property', class1.name, 'first_prop', SystemComponentType.informationModel, 'descriptionProperty1')
	const prop2 = new SystemDescendantComponent('Property', class1.name, 'second_prop', SystemComponentType.informationModel, 'descriptionProperty2')
	const prop3 = new SystemDescendantComponent('Property', class1.name, 'third_prop', SystemComponentType.informationModel, 'descriptionProperty3')
	const prop4 = new SystemDescendantComponent('Property', class1.name, 'fourth_class', SystemComponentType.informationModel, 'descriptionProperty4')
	const prop5 = new SystemDescendantComponent('Property', class2.name, 'first_prop', SystemComponentType.informationModel, 'descriptionProperty5')
	const prop6 = new SystemDescendantComponent('Property', class2.name, 'fifth_prop', SystemComponentType.informationModel, 'descriptionProperty6')

	beforeAll(() => {
		system.addChild(class1)
		class1.addChild(prop1)
		class1.addChild(prop2)
		class1.addChild(prop3)
		class1.addChild(prop4)
		system.addChild(class2)
		class2.addChild(prop5)
		class2.addChild(prop6)
		system.addChild(class3)
		system.addChild(class4)

		class1.permanence = Permanence.persistent
		class2.permanence = Permanence.persistent
		class3.permanence = Permanence.transient
		class4.permanence = Permanence.constant
		;(class1 as Class).isAbstract = false
		;(class2 as Class).isAbstract = false
		;(class3 as Class).isAbstract = true
		;(class4 as Class).isAbstract = false
	})

	it('find by 2 values', async () => {
		const found = system.findComponents({ objectTypeName: 'Class', name: 'third_class' })
		expect(found).not.toBeNull()
		expect(found.length).toBe(1)
		expect(found[0]).toBe(class3)
	})

	it('find by optional boolean value', async () => {
		const found = system.findComponents({ objectTypeName: 'Class', isAbstract: true })
		expect(found).not.toBeNull()
		expect(found.length).toBe(1)
		expect(found[0]).toBe(class3)

		const found1 = system.findComponents({ isAbstract: true })
		expect(found1).not.toBeNull()
		expect(found1.length).toBe(1)
		expect(found1[0]).toBe(class3)
	})

	it('find by nothing', async () => {
		const found = system.findComponents({})
		expect(found).not.toBeNull()
		expect(found.length).toBe(1)
		expect(found[0]).toBe(system)
	})

	it('find by string (name) - shallow', async () => {
		const found = system.findComponents({ name: 'third_class' })
		expect(found).not.toBeNull()
		expect(found.length).toBe(1)
		expect(found[0]).toBe(class3)
	})

	it('find by string (name) - shallow - regex', async () => {
		const found = system.findComponents({ name: '/.*d_class/' })
		expect(found).not.toBeNull()
		expect(found.length).toBe(2)
		expect(found).toContain(class2)
		expect(found).toContain(class3)
	})

	it('find by string (name) - deep', async () => {
		const found = system.findComponents({ name: '/.*first_prop/' })
		expect(found).not.toBeNull()
		expect(found.length).toBe(2)
		expect(found).toContain(prop1)
		expect(found).toContain(prop5)
	})

	it('find by string (name) - none', async () => {
		const found = system.findComponents({ name: 'third class' })
		expect(found).not.toBeNull()
		expect(found.length).toBe(0)
	})

	it('find by full name - single value', async () => {
		const found = system.findComponents({ fullConstantCaseName: 'SECOND_CLASS/FIFTH_PROP' })
		expect(found).not.toBeNull()
		expect(found.length).toBe(1)
		expect(found[0]).toBe(prop6)
	})

	it('find by full name - array', async () => {
		const found = system.findComponents({ fullConstantCaseName: ['SECOND_CLASS/FIFTH_PROP', 'no match'] })
		expect(found).not.toBeNull()
		expect(found.length).toBe(1)
		expect(found[0]).toBe(prop6)
	})

	it('find by class - property', async () => {
		const found = system.findComponents({ objectTypeName: 'Property' })
		expect(found).not.toBeNull()
		expect(found.length).toBe(6)
		expect(found).toContain(prop1)
		expect(found).toContain(prop2)
		expect(found).toContain(prop3)
		expect(found).toContain(prop4)
		expect(found).toContain(prop5)
		expect(found).toContain(prop6)
	})

	it('find by class - class', async () => {
		const found = system.findComponents({ objectTypeName: 'Class' })
		expect(found).not.toBeNull()
		expect(found.length).toBe(4)
		expect(found).toContain(class1)
		expect(found).toContain(class2)
		expect(found).toContain(class3)
		expect(found).toContain(class4)
	})

	it('find by enum (permanence)', async () => {
		const found1 = system.findComponents({ permanence: 'persistent' })
		expect(found1).not.toBeNull()
		expect(found1.length).toBe(2)
		expect(found1).toContain(class1)
		expect(found1).toContain(class2)

		const found2 = system.findComponents({ permanence: 'transient' })
		expect(found2).not.toBeNull()
		expect(found2.length).toBe(1)
		expect(found2).toContain(class3)

		const found3 = system.findComponents({ permanence: 'constant' })
		expect(found3).not.toBeNull()
		expect(found3.length).toBe(1)
		expect(found3).toContain(class4)
	})

	it('find by array (name)', async () => {
		const searchObject = {
			name: ['/.h_class/', '/.*prop4/'],
		}
		const found = system.findComponents(searchObject)
		expect(found).not.toBeNull()
		expect(found.length).toBe(2)
		expect(found).toContain(class4)
		expect(found).toContain(prop4)

		const searchAsString = JSON.stringify(searchObject)
		const foundByString = system.findComponentsByString(searchAsString)
		expect(foundByString).not.toBeNull()
		expect(foundByString.length).toBe(2)
		expect(foundByString).toContain(class4)
		expect(foundByString).toContain(prop4)
	})

	it('findOneComponent', async () => {
		const searchObject = {
			name: ['/.h_class/', '/.*prop4/'],
		}
		const testFunction1 = (): void => {
			system.findOneComponent(searchObject)
		}
		expect(testFunction1).toThrow()

		const found = system.findOneComponent({
			name: ['/fifth_prop/'],
		})
		expect(found).not.toBeNull()
		expect(found).toBe(prop6)

		const foundNothing = system.findOneComponent({
			name: ['/fifth_propThatWontMatch/'],
		})
		expect(foundNothing).toBeUndefined()

		const testFunction2 = (): void => {
			system.findOneComponent({
				name: ['/prop/'],
			})
		}
		expect(testFunction2).toThrow()
	})

	it('bad search string', async () => {
		const testFunction1 = (): void => {
			system.findComponentsByString('not json')
		}
		expect(testFunction1).toThrow()
	})
})

describe('disconnectRecursion', () => {
	it('4 levels, linear added from below', async () => {
		const component1 = new SystemDescendantComponent('Object', 'nameSpace', 'component1', SystemComponentType.informationModel, 'description')
		const component2 = new SystemDescendantComponent('Object', 'nameSpace', 'component2', SystemComponentType.informationModel, 'description')
		const component3 = new SystemDescendantComponent('Object', 'nameSpace', 'component3', SystemComponentType.informationModel, 'description')
		const component4 = new SystemDescendantComponent('Object', 'nameSpace', 'component4', SystemComponentType.informationModel, 'description')

		component3.addChild(component4)
		component2.addChild(component3)
		component1.addChild(component2)

		component1.disconnectRecursion()

		expect(component1.parent).toBeUndefined()
		expect(component2.parent).toBeUndefined()
		expect(component3.parent).toBeUndefined()
		expect(component4.parent).toBeUndefined()

		expect(Object.keys(component1.children).length).toBe(1)
		expect(Object.keys(component2.children).length).toBe(1)
		expect(Object.keys(component3.children).length).toBe(1)
		expect(Object.keys(component4.children).length).toBe(0)

		component1.reconnectRecursion(component1)

		expect(component1.parent).toBeUndefined()
		expect(component2.parent).toBe(component1)
		expect(component3.parent).toBe(component2)
		expect(component4.parent).toBe(component3)
	})
})

describe('fullConstantCase', () => {
	it('leading slash', async () => {
		const name = '.arbitrary" na#me$'
		const nameSpace = '/user//home'
		const fullConstantCase = SystemComponent.fullConstantCase(nameSpace, name)
		expect(fullConstantCase).toBe('USER/HOME/ARBITRARY_NA_ME')
	})

	it('no leading slash', async () => {
		const name = '.arbitrary" na#me$'
		const nameSpace = 'user//home'
		const fullConstantCase = SystemComponent.fullConstantCase(nameSpace, name)
		expect(fullConstantCase).toBe('USER/HOME/ARBITRARY_NA_ME')
	})

	it('trailing slash', async () => {
		const name = '.arbitrary" na#me$'
		const nameSpace = 'user//home/'
		const fullConstantCase = SystemComponent.fullConstantCase(nameSpace, name)
		expect(fullConstantCase).toBe('USER/HOME/ARBITRARY_NA_ME')
	})
})

describe('componentType', () => {
	it('several sets and gets', async () => {
		const component = new SystemDescendantComponent('Property', "doesn't matter", 'fifth_prop', SystemComponentType.informationModel, 'description')
		expect(component.componentType).toBe(SystemComponentType.informationModel)
		component.componentType = SystemComponentType.service
		expect(component.componentType).toBe(SystemComponentType.service)
		component.componentType = undefined as unknown as SystemComponentType
		expect(component.componentType).toBeUndefined()
	})
})

describe('removeChild', () => {
	it('several sets and gets', async () => {
		const component1 = new SystemDescendantComponent('Object', 'nameSpace', 'component1', SystemComponentType.informationModel, 'description')
		const component2 = new SystemDescendantComponent('Object', 'nameSpace', 'component2', SystemComponentType.informationModel, 'description')
		const component3 = new SystemDescendantComponent('Object', 'nameSpace', 'component3', SystemComponentType.informationModel, 'description')
		const component4 = new SystemDescendantComponent('Object', 'nameSpace', 'component4', SystemComponentType.informationModel, 'description')
		expect(component1.parent).toBeUndefined()
		expect(Object.keys(component1.children).length).toBe(0)
		expect(component2.parent).toBeUndefined()
		expect(Object.keys(component2.children).length).toBe(0)
		expect(component3.parent).toBeUndefined()
		expect(Object.keys(component3.children).length).toBe(0)
		expect(component4.parent).toBeUndefined()
		expect(Object.keys(component4.children).length).toBe(0)

		component1.addChild(component2)
		component1.addChild(component3)
		component1.addChild(component4)
		expect(Object.keys(component1.children).length).toBe(3)
		expect(component1.parent).toBeUndefined()
		expect(component2.parent).toBe(component1)
		expect(component3.parent).toBe(component1)
		expect(component4.parent).toBe(component1)
		expect(component1.children['NAME_SPACE/COMPONENT2']).toBe(component2)

		component1.removeChild(component2)
		expect(Object.keys(component1.children).length).toBe(2)
		expect(component1.children['NAME_SPACE/COMPONENT2']).toBeUndefined()
		expect(component2.parent).toBeUndefined()

		// removing a second time falls through
		component1.removeChild(component2)
		expect(Object.keys(component1.children).length).toBe(2)
		expect(component1.children['NAME_SPACE/COMPONENT2']).toBeUndefined()
		expect(component2.parent).toBeUndefined()

		component1.removeChild(component3)
		expect(Object.keys(component1.children).length).toBe(1)
		expect(component1.children['NAME_SPACE/COMPONENT3']).toBeUndefined()
		expect(component3.parent).toBeUndefined()

		expect(component4.parent).toBe(component1)
		expect(component1.children['NAME_SPACE/COMPONENT4']).toBe(component4)
	})

	it('remove empty', async () => {
		const component1 = new SystemDescendantComponent('Object', 'nameSpace', 'component1', SystemComponentType.informationModel, 'description')

		const testFunction1 = (): void => {
			component1.removeChild(undefined as any)
		}
		expect(testFunction1).toThrow()
	})
})

describe('removeChildByName', () => {
	it('several sets and gets', async () => {
		const component1 = new SystemDescendantComponent('Object', 'nameSpace', 'component1', SystemComponentType.informationModel, 'description')
		const component2 = new SystemDescendantComponent('Object', 'nameSpace', 'component2', SystemComponentType.informationModel, 'description')
		const component3 = new SystemDescendantComponent('Object', 'nameSpace', 'component3', SystemComponentType.informationModel, 'description')
		const component4 = new SystemDescendantComponent('Object', 'nameSpace', 'component4', SystemComponentType.informationModel, 'description')
		expect(component1.parent).toBeUndefined()
		expect(Object.keys(component1.children).length).toBe(0)
		expect(component2.parent).toBeUndefined()
		expect(Object.keys(component2.children).length).toBe(0)
		expect(component3.parent).toBeUndefined()
		expect(Object.keys(component3.children).length).toBe(0)
		expect(component4.parent).toBeUndefined()
		expect(Object.keys(component4.children).length).toBe(0)

		component1.addChild(component2)
		component1.addChild(component3)
		component1.addChild(component4)
		expect(Object.keys(component1.children).length).toBe(3)
		expect(component1.parent).toBeUndefined()
		expect(component2.parent).toBe(component1)
		expect(component3.parent).toBe(component1)
		expect(component4.parent).toBe(component1)
		expect(component1.children['NAME_SPACE/COMPONENT2']).toBe(component2)

		component1.removeChildByName('NAME_SPACE/COMPONENT2')
		expect(Object.keys(component1.children).length).toBe(2)
		expect(component1.children['NAME_SPACE/COMPONENT2']).toBeUndefined()
		expect(component2.parent).toBeUndefined()

		// removing a second time falls through
		component1.removeChildByName('NAME_SPACE/COMPONENT2')
		expect(Object.keys(component1.children).length).toBe(2)
		expect(component1.children['NAME_SPACE/COMPONENT2']).toBeUndefined()
		expect(component2.parent).toBeUndefined()

		component1.removeChildByName('NAME_SPACE/COMPONENT3')
		expect(Object.keys(component1.children).length).toBe(1)
		expect(component1.children['NAME_SPACE/COMPONENT3']).toBeUndefined()
		expect(component3.parent).toBeUndefined()

		expect(component4.parent).toBe(component1)
		expect(component1.children['NAME_SPACE/COMPONENT4']).toBe(component4)
	})

	it('remove empty', async () => {
		const component1 = new SystemDescendantComponent('Object', 'nameSpace', 'component1', SystemComponentType.informationModel, 'description')

		const testFunction1 = (): void => {
			component1.removeChildByName(undefined as any)
		}
		expect(testFunction1).toThrow()
	})
})

describe('addDescendant', () => {
	it('several sets and gets adding from the bottom', async () => {
		const component1 = new SystemDescendantComponent('Object', 'nameSpace', 'component1', SystemComponentType.informationModel, 'description')
		const component2 = new SystemDescendantComponent('Object', 'nameSpace', 'component2', SystemComponentType.informationModel, 'description')
		const component3 = new SystemDescendantComponent('Object', 'nameSpace', 'component3', SystemComponentType.informationModel, 'description')
		const component4 = new SystemDescendantComponent('Object', 'nameSpace', 'component4', SystemComponentType.informationModel, 'description')
		expect(component1.parent).toBeUndefined()
		expect(Object.keys(component1.children).length).toBe(0)
		expect(component2.parent).toBeUndefined()
		expect(Object.keys(component2.children).length).toBe(0)
		expect(component3.parent).toBeUndefined()
		expect(Object.keys(component3.children).length).toBe(0)
		expect(component4.parent).toBeUndefined()
		expect(Object.keys(component4.children).length).toBe(0)

		component3.addChild(component4)
		component2.addChild(component3)
		component1.addChild(component2)
		expect(Object.keys(component1.children).length).toBe(1)
		expect(component1.parent).toBeUndefined()
		expect(component2.parent).toBe(component1)
		expect(component3.parent).toBe(component2)
		expect(component4.parent).toBe(component3)
		expect(component1.children['NAME_SPACE/COMPONENT2']).toBe(component2)
		expect(component1.hasDescendant(component2)).toBe(true)
		expect(component1.hasDescendant(component3)).toBe(true)
		expect(component1.hasDescendant(component4)).toBe(true)
		expect(component2.hasDescendant(component3)).toBe(true)
		expect(component2.hasDescendant(component4)).toBe(true)
		expect(component3.hasDescendant(component4)).toBe(true)
		expect(component3.hasDescendant(component1)).toBe(false)
		expect(component3.hasDescendant(component2)).toBe(false)
		expect(component3.hasDescendant(component3)).toBe(false)
		expect(component2.hasDescendant(component1)).toBe(false)
		expect(component2.hasDescendant(component2)).toBe(false)
		expect(component1.hasDescendant(component1)).toBe(false)

		component2.removeChild(component3)
		expect(Object.keys(component2.children).length).toBe(0)
		expect(component2.children['NAME_SPACE/COMPONENT3']).toBeUndefined()
		expect(component3.parent).toBeUndefined()
		expect(component1.hasDescendant(component2)).toBe(true)
		expect(component1.hasDescendant(component3)).toBe(false)
		expect(component1.hasDescendant(component4)).toBe(false)
		expect(component2.hasDescendant(component3)).toBe(false)
		expect(component2.hasDescendant(component4)).toBe(false)
		expect(component3.hasDescendant(component4)).toBe(true)
		expect(component3.hasDescendant(component1)).toBe(false)
		expect(component3.hasDescendant(component2)).toBe(false)
		expect(component3.hasDescendant(component3)).toBe(false)
		expect(component2.hasDescendant(component1)).toBe(false)
		expect(component2.hasDescendant(component2)).toBe(false)
		expect(component1.hasDescendant(component1)).toBe(false)

		component1.removeChild(component2)
		expect(Object.keys(component1.children).length).toBe(0)
		expect(component1.children['NAME_SPACE/COMPONENT2']).toBeUndefined()
		expect(component2.parent).toBeUndefined()
		expect(component1.hasDescendant(component2)).toBe(false)
		expect(component1.hasDescendant(component3)).toBe(false)
		expect(component1.hasDescendant(component4)).toBe(false)
		expect(component2.hasDescendant(component3)).toBe(false)
		expect(component2.hasDescendant(component4)).toBe(false)
		expect(component3.hasDescendant(component4)).toBe(true)
		expect(component3.hasDescendant(component1)).toBe(false)
		expect(component3.hasDescendant(component2)).toBe(false)
		expect(component3.hasDescendant(component3)).toBe(false)
		expect(component2.hasDescendant(component1)).toBe(false)
		expect(component2.hasDescendant(component2)).toBe(false)
		expect(component1.hasDescendant(component1)).toBe(false)

		expect(component4.parent).toBe(component3)
		expect(component3.children['NAME_SPACE/COMPONENT4']).toBe(component4)
	})

	it('several sets and gets adding from the top', async () => {
		const component1 = new SystemDescendantComponent('Object', 'nameSpace', 'component1', SystemComponentType.informationModel, 'description')
		const component2 = new SystemDescendantComponent('Object', 'nameSpace', 'component2', SystemComponentType.informationModel, 'description')
		const component3 = new SystemDescendantComponent('Object', 'nameSpace', 'component3', SystemComponentType.informationModel, 'description')
		const component4 = new SystemDescendantComponent('Object', 'nameSpace', 'component4', SystemComponentType.informationModel, 'description')
		expect(component1.parent).toBeUndefined()
		expect(Object.keys(component1.children).length).toBe(0)
		expect(component2.parent).toBeUndefined()
		expect(Object.keys(component2.children).length).toBe(0)
		expect(component3.parent).toBeUndefined()
		expect(Object.keys(component3.children).length).toBe(0)
		expect(component4.parent).toBeUndefined()
		expect(Object.keys(component4.children).length).toBe(0)

		component1.addChild(component2)
		component2.addChild(component3)
		component3.addChild(component4)
		expect(Object.keys(component1.children).length).toBe(1)
		expect(component1.parent).toBeUndefined()
		expect(component2.parent).toBe(component1)
		expect(component3.parent).toBe(component2)
		expect(component4.parent).toBe(component3)
		expect(component1.children['NAME_SPACE/COMPONENT2']).toBe(component2)
		expect(component1.hasDescendant(component2)).toBe(true)
		expect(component1.hasDescendant(component3)).toBe(true)
		expect(component1.hasDescendant(component4)).toBe(true)
		expect(component2.hasDescendant(component3)).toBe(true)
		expect(component2.hasDescendant(component4)).toBe(true)
		expect(component3.hasDescendant(component4)).toBe(true)
		expect(component3.hasDescendant(component1)).toBe(false)
		expect(component3.hasDescendant(component2)).toBe(false)
		expect(component3.hasDescendant(component3)).toBe(false)
		expect(component2.hasDescendant(component1)).toBe(false)
		expect(component2.hasDescendant(component2)).toBe(false)
		expect(component1.hasDescendant(component1)).toBe(false)

		component2.removeChild(component3)
		expect(Object.keys(component2.children).length).toBe(0)
		expect(component2.children['NAME_SPACE/COMPONENT3']).toBeUndefined()
		expect(component3.parent).toBeUndefined()
		expect(component1.hasDescendant(component2)).toBe(true)
		expect(component1.hasDescendant(component3)).toBe(false)
		expect(component1.hasDescendant(component4)).toBe(false)
		expect(component2.hasDescendant(component3)).toBe(false)
		expect(component2.hasDescendant(component4)).toBe(false)
		expect(component3.hasDescendant(component4)).toBe(true)
		expect(component3.hasDescendant(component1)).toBe(false)
		expect(component3.hasDescendant(component2)).toBe(false)
		expect(component3.hasDescendant(component3)).toBe(false)
		expect(component2.hasDescendant(component1)).toBe(false)
		expect(component2.hasDescendant(component2)).toBe(false)
		expect(component1.hasDescendant(component1)).toBe(false)

		component1.removeChild(component2)
		expect(Object.keys(component1.children).length).toBe(0)
		expect(component1.children['NAME_SPACE/COMPONENT2']).toBeUndefined()
		expect(component2.parent).toBeUndefined()
		expect(component1.hasDescendant(component2)).toBe(false)
		expect(component1.hasDescendant(component3)).toBe(false)
		expect(component1.hasDescendant(component4)).toBe(false)
		expect(component2.hasDescendant(component3)).toBe(false)
		expect(component2.hasDescendant(component4)).toBe(false)
		expect(component3.hasDescendant(component4)).toBe(true)
		expect(component3.hasDescendant(component1)).toBe(false)
		expect(component3.hasDescendant(component2)).toBe(false)
		expect(component3.hasDescendant(component3)).toBe(false)
		expect(component2.hasDescendant(component1)).toBe(false)
		expect(component2.hasDescendant(component2)).toBe(false)
		expect(component1.hasDescendant(component1)).toBe(false)

		expect(component4.parent).toBe(component3)
		expect(component3.children['NAME_SPACE/COMPONENT4']).toBe(component4)
	})
})
