import { ClassToTableTransformer } from '../../../plugins/application-architecture/builders/ClassToTableTransformer'
import { Class, InformationModel } from '../../../plugins/information-architecture'
import { Table } from '../../../plugins/rdbms-basic'
import { Permanence } from '../../../system/Permanence'
import { System } from '../../../system/System'
import { SystemComponentType } from '../../../system/SystemComponentType'

describe('run', () => {
	it('basic', async () => {
		const className1 = 'CLASS1'
		const className2 = 'CLASS2'
		const system = new System()
		const model = InformationModel.fromSystem(system)
		const class1 = new Class(model.fullConstantCaseName, className1, 'first class', SystemComponentType.informationModel)
		class1.permanence = Permanence.persistent
		model.addChild(class1)
		const class2 = new Class(model.fullConstantCaseName, className2, 'second class', SystemComponentType.informationModel)
		class2.permanence = Permanence.persistent
		model.addChild(class2)

		const transformer = new ClassToTableTransformer()
		await transformer.build(system)

		const tables = system.findComponents({ objectTypeName: 'Table', componentType: 'storage' })
		expect(tables.length).toBe(2)

		const table1 = tables.find((item) => (item as Table).singularName == className1)
		const table2 = tables.find((item) => (item as Table).singularName == className2)

		expect(table1).toBeDefined()
		expect(table2).toBeDefined()
	})
})
