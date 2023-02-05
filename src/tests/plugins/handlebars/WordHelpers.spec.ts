import { ok } from 'assert'
import { WordHelpers } from '../../../plugins/handlebars/WordHelpers'

describe('register', () => {
	it('basic values', async () => {
		WordHelpers.registerAll()
		WordHelpers.registerAll()
		ok(true)
	})
})
describe('sentenceCase', () => {
	it('basic values', async () => {
		const helpers = new WordHelpers()
		expect(helpers.sentenceCase('some Thing')).toBe(`Some thing`)
		expect(helpers.sentenceCase(null)).toBe(null)
	})
})

describe('capitalCase', () => {
	it('basic values', async () => {
		const helpers = new WordHelpers()
		expect(helpers.capitalCase('some Thing')).toBe(`Some Thing`)
		expect(helpers.capitalCase(null)).toBe(null)
	})
})

describe('constantCase', () => {
	it('basic values', async () => {
		const helpers = new WordHelpers()
		expect(helpers.constantCase('some Thing')).toBe(`SOME_THING`)
		expect(helpers.constantCase(null)).toBe(null)
	})
})

describe('pascalCase', () => {
	it('basic values', async () => {
		const helpers = new WordHelpers()
		expect(helpers.pascalCase('some Thing')).toBe(`SomeThing`)
		expect(helpers.pascalCase(null)).toBe(null)
	})
})

describe('camelCase', () => {
	it('basic values', async () => {
		const helpers = new WordHelpers()
		expect(helpers.camelCase('some Thing')).toBe(`someThing`)
		expect(helpers.camelCase(null)).toBe(null)
	})
})

describe('snakeCase', () => {
	it('basic values', async () => {
		const helpers = new WordHelpers()
		expect(helpers.snakeCase('some Thing')).toBe(`some_thing`)
		expect(helpers.snakeCase(null)).toBe(null)
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
