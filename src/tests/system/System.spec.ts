import { System } from '../../system/System'
import { ValueType } from '../../system/ValueType'

describe('primitives', () => {
	it('its not static', async () => {
		const type1 = new ValueType('ValueType', 'testNameSpace', 'bogusPrimitive', 'description', true)
		const system1 = new System()
		expect(system1.primitives.length).toBe(0)

		system1.addChild(type1)
		const primitives1 = system1.primitives
		expect(primitives1.length).toBe(1)
		expect(primitives1[0]).toBe(type1)

		// ensure no static data
		const type2 = new ValueType('ValueType', 'testNameSpace', 'bogusPrimitive', 'description', true)
		const system2 = new System()

		system2.addChild(type2)

		const primitives2 = system2.primitives
		expect(primitives2.length).toBe(1)
		expect(primitives2[0]).toBe(type2)
	})
})
