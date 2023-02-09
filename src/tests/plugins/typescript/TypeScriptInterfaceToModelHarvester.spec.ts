/* eslint-disable max-lines-per-function */
import { Interface } from '../../../plugins/information-architecture'
import { TypeScriptInterfaceToModelHarvester } from '../../../plugins/typescript'
import { System } from '../../../system/System'
import { ComponentOrigin } from '../../../system/ComponentOrigin'
import { Permanence } from '../../../system/Permanence'

describe('run', () => {
	it('local classes', async () => {
		const builder = new TypeScriptInterfaceToModelHarvester({
			sourcePath: __dirname,
			fileNamePattern: '^[^.]*(?!spec)*[.]ts$',
			classNamePattern: '.*',
		})
		const system = new System()
		await builder.build(system)
		const children = Object.keys(system.children)
		expect(children.length).toBe(1)
		const informationModel = system.children['/INFORMATION_MODEL']
		const grandChildren = Object.keys(informationModel.children)
		expect(grandChildren.length).toBe(2)

		const identifiableClass = informationModel.children['INFORMATION_MODEL/IDENTIFIABLE'] as Interface

		expect(identifiableClass.name).toBe('Identifiable')
		expect(identifiableClass.nameSpace).toBe('INFORMATION_MODEL')
		expect(identifiableClass.objectTypeName).toBe('Interface')
		expect(identifiableClass.origin).toBe(ComponentOrigin.harvested)
		expect(identifiableClass.primitive).toBe(false)
		expect(identifiableClass.permanence).toBe(Permanence.persistent)

		const identifiableParentClass = informationModel.children['INFORMATION_MODEL/IDENTIFIABLE_PARENT'] as Interface

		expect(identifiableParentClass.name).toBe('IdentifiableParent')
		expect(identifiableParentClass.nameSpace).toBe('INFORMATION_MODEL')
		expect(identifiableParentClass.objectTypeName).toBe('Interface')
		expect(identifiableParentClass.origin).toBe(ComponentOrigin.harvested)
		expect(identifiableParentClass.primitive).toBe(false)
		expect(identifiableParentClass.permanence).toBe(Permanence.persistent)
	})
})
