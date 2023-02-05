/* eslint-disable max-lines-per-function */
import { ClassToTableTransformer } from '../../../plugins/application-architecture/builders/ClassToTableTransformer'
import { PropertyToColumnTransformer } from '../../../plugins/application-architecture/builders/PropertyToColumnTransformer'
import { Class, InformationModel, Property } from '../../../plugins/information-architecture'
import { Column } from '../../../plugins/rdbms-basic'
import { Permanence } from '../../../system/Permanence'
import { System } from '../../../system/System'
import { SystemComponentType } from '../../../system/SystemComponentType'
import { ValueType } from '../../../system/ValueType'

describe('run', () => {
	it('basic', async () => {
		const className1 = 'CLASS1'
		const className2 = 'CLASS2'
		const system = new System()
		const model = InformationModel.fromSystem(system)
		const class1 = new Class(model.fullConstantCaseName, className1, 'first class', SystemComponentType.informationModel)
		class1.permanence = Permanence.persistent
		model.addChild(class1)

		const property1ClassName1 = 'P1-CLASS2'
		const property2ClassName1 = 'P2-CLASS2'
		const property1 = new Property(class1.constantCaseFullName, property1ClassName1, 'desc', ValueType.string, 256)
		class1.addChild(property1)
		const property2 = new Property(class1.constantCaseFullName, property2ClassName1, 'desc', ValueType.string, 256)
		class1.addChild(property2)

		const class2 = new Class(model.fullConstantCaseName, className2, 'second class', SystemComponentType.informationModel)
		class2.permanence = Permanence.persistent
		model.addChild(class2)

		const property1ClassName2 = 'P1-CLASS2'
		const property3 = new Property(class2.constantCaseFullName, property1ClassName2, 'desc', ValueType.string, 256)
		class2.addChild(property3)
		const property2ClassName2 = 'P2-CLASS2'
		const property4 = new Property(class2.constantCaseFullName, property2ClassName2, 'desc', ValueType.string, 256)
		class2.addChild(property4)
		const property3ClassName2 = 'P3-CLASS2'
		const property5 = new Property(class2.constantCaseFullName, property3ClassName2, 'desc', ValueType.string, 256)
		class2.addChild(property5)

		const classTransformer = new ClassToTableTransformer()
		await classTransformer.build(system)
		const propertyTransformer = new PropertyToColumnTransformer()
		await propertyTransformer.build(system)

		const columns = system.findComponents({ objectTypeName: 'Column', componentType: 'storage' })
		expect(columns.length).toBe(5)

		const column1 = columns.find((item) => (item as Column).name == property1ClassName1)
		const column2 = columns.find((item) => (item as Column).name == property2ClassName1)
		const column3 = columns.find((item) => (item as Column).name == property1ClassName2)
		const column4 = columns.find((item) => (item as Column).name == property2ClassName2)
		const column5 = columns.find((item) => (item as Column).name == property3ClassName2)

		expect(column1).toBeDefined()
		expect(column2).toBeDefined()
		expect(column3).toBeDefined()
		expect(column4).toBeDefined()
		expect(column5).toBeDefined()
	})
})
