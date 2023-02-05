import { CircularReplacer } from '@tverstraten/log-annotations'

describe('all choices', () => {
	it('simple shallow object', async () => {
		const replacer = CircularReplacer()

		const objectToCheck = { property1: 'some string', property2: 5 }
		expect(replacer('property2', 5)).toBe(5)
		expect(replacer('property1', objectToCheck)).toBe(objectToCheck)
		expect(replacer('', objectToCheck)).toBeUndefined()

		// new replacer to ensure the values are not globally static
		const replacer2 = CircularReplacer()
		expect(replacer2('', objectToCheck)).toBe(objectToCheck)
		expect(replacer2('', objectToCheck)).toBeUndefined()
	})
})
