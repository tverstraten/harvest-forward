import { ok } from 'assert'
import { WordHelpers } from '../../../plugins/handlebars/WordHelpers'

describe('register', () => {
	it('basic values', async () => {
		WordHelpers.registerAll()
		WordHelpers.registerAll()
		ok(true)
	})
})

describe('singular', () => {
	it('basic values', async () => {
		const helpers = new WordHelpers()
		expect(helpers.singular('words')).toBe(`word`)
		expect(helpers.singular(null)).toBe(null)
	})
})

describe('plural', () => {
	it('basic values', async () => {
		const helpers = new WordHelpers()
		expect(helpers.plural('word')).toBe(`words`)
		expect(helpers.plural(null)).toBe(null)
	})
})
