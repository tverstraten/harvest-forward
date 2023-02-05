import { SystemComponentComparator } from '../../system/SystemComponentComparator'
import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'

describe('compare', () => {
	it('gt and lt', async () => {
		const lesserName = 'a lesser word'
		const greaterName = 'but this is more'
		const object1 = new SystemDescendantComponent('', '', lesserName, SystemComponentType.storage, '')
		const object2 = new SystemDescendantComponent('', '', greaterName, SystemComponentType.storage, '')

		const result1 = SystemComponentComparator(object1, object2)
		expect(result1).toBe(-1)

		const result2 = SystemComponentComparator(object2, object1)
		expect(result2).toBe(1)
	})

	it('equal', async () => {
		const nameToUse = 'ccccc'
		const object1 = new SystemDescendantComponent('', '', nameToUse, SystemComponentType.storage, '')
		const object2 = new SystemDescendantComponent('', '', nameToUse, SystemComponentType.storage, '')

		const result = SystemComponentComparator(object1, object2)
		expect(result).toBe(0)
	})

	it('undefined', async () => {
		const nameToUse = 'ccccc'
		const object1 = new SystemDescendantComponent('', '', nameToUse, SystemComponentType.storage, '')
		const testFunction1 = (): void => {
			SystemComponentComparator(object1, undefined as unknown as SystemDescendantComponent)
		}
		expect(testFunction1).toThrow()

		const testFunction2 = (): void => {
			SystemComponentComparator(undefined as unknown as SystemDescendantComponent, object1)
		}
		expect(testFunction2).toThrow()
	})
})
