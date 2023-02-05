import { AbstractValueSpecification } from '../../system/AbstractValueSpecification'
import { ValueType } from '../../system/ValueType'

describe('all choices', () => {
	class TestAbstractValueSpecification extends AbstractValueSpecification {}
	it('simple value check', async () => {
		const name = 'arbitrary name'
		const nameSpaceWithoutLead = 'nameSpace/folder'
		const nameSpace = `/${nameSpaceWithoutLead}`
		const valueType = ValueType.interval
		const length = 7
		const testObject = new TestAbstractValueSpecification('Test', nameSpace, name, 'description', valueType, length)

		expect(testObject.name).toBe(name)
		expect(testObject.nameSpace).toBe(nameSpaceWithoutLead)
		expect(testObject.type).toBe(valueType)
		expect(testObject.length).toBe(length)
	})
})
