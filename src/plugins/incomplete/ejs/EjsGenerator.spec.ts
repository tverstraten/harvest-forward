import { SystemComponentType } from '../../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../../system/SystemDescendantComponent'

describe('Character Casing', () => {
	const description_basic = 'some silly description'
	const path_2part_middle_slash = 'my/path'
	const name_basic = 'my_name'

	it('basic full name constant case path middle slash', async () => {
		const obj = new SystemDescendantComponent('', path_2part_middle_slash, name_basic, SystemComponentType.storage, description_basic)
		expect(obj.name).toBe(name_basic)
		expect(obj.description).toBe(description_basic)
		expect(obj.id).toBeDefined()
		expect(obj.id.length).toBe(36)
		expect(obj.constantCaseFullName).toBe(obj.constantCaseFullName.toUpperCase())
	})
})
