import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'
import { SystemComponentReplacer } from '../../util/SystemComponentReplacer'

const arbitraryValue = 'some string as a test marker'

describe('all choices', () => {
	it('parent', async () => {
		expect(SystemComponentReplacer('parent', arbitraryValue)).toBeUndefined()
	})

	it('_children', async () => {
		expect(SystemComponentReplacer('_children', arbitraryValue)).toBe(arbitraryValue)
	})

	it('SystemDescendantComponent', async () => {
		const componentName = 'name to check'
		const componentNameAsFull = 'NAME_SPACE/NAME_TO_CHECK'
		const value = new SystemDescendantComponent('typeName', 'nameSpace', componentName, SystemComponentType.informationModel, 'description')
		expect(SystemComponentReplacer(componentNameAsFull, value)).toBe(value)
		expect(SystemComponentReplacer('other name', value)).toBe(value.fullConstantCaseName)
	})

	it('other', async () => {
		expect(SystemComponentReplacer('other', arbitraryValue)).toBe(arbitraryValue)
	})
})
