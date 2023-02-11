import Handlebars from 'handlebars'
import { StringHelpers } from '../../../plugins/handlebars/StringHelpers'

describe('noCr', () => {
	it('basic values', async () => {
		const helpers = new StringHelpers()
		expect(helpers.noCrString(null)).toBe(null)
		expect(helpers.noCrString('\rbeginning')?.toString()).toBe(` beginning`)
		expect(helpers.noCrString('in\rbetween')?.toString()).toBe(`in between`)
		expect(helpers.noCrString('end\r')?.toString()).toBe(`end `)
		expect(helpers.noCrString('\rin\rbetween')?.toString()).toBe(` in between`)
		expect(helpers.noCrString('\nbeginning')?.toString()).toBe(` beginning`)
		expect(helpers.noCrString('in\nbetween')?.toString()).toBe(`in between`)
		expect(helpers.noCrString('end\n')?.toString()).toBe(`end `)
		expect(helpers.noCrString('\rin\r\nbetween')?.toString()).toBe(` in between`)
	})
})

describe('in template', () => {
	it('basic values', async () => {
		StringHelpers.registerAll()
		StringHelpers.registerAll()
		const template = await Handlebars.compile('word {{NoCrString this}} another word', {
			noEscape: true,
		})
		const newContent = template('has\r\ncr')
		expect(newContent).toBe('word has cr another word')
	})
})

describe('replace', () => {
	it('basic values', async () => {
		const helpers = new StringHelpers()
		// eslint-disable-next-line spellcheck/spell-checker
		expect(helpers.replace('beginning', 'in/to')).toBe(`begtoning`)
		expect(helpers.replace(null as any, 'in/to')).toBe(null)
	})
})

describe('toTsTemplate', () => {
	it('basic values', async () => {
		const helpers = new StringHelpers()
		expect(helpers.toTsTemplate('surround {something} with it')).toBe('surround ${something} with it')
		expect(helpers.toTsTemplate(null)).toBe(null)
	})
})
