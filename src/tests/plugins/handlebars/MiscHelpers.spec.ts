import { ok } from 'assert'
import Handlebars from 'handlebars'
import { MiscHelpers } from '../../../plugins/handlebars/MiscHelpers'
import { System } from '../../../system/System'
import { SystemComponentType } from '../../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../../system/SystemDescendantComponent'

describe('register', () => {
	it('perform', async () => {
		MiscHelpers.registerAll()
		MiscHelpers.registerAll()
		ok(true)
	})
})

describe('curly', () => {
	it('basic values', async () => {
		const helpers = new MiscHelpers()
		expect(helpers.curly('beginning')).toBe(`{beginning}`)
	})
})

describe('json', () => {
	it('basic values', async () => {
		const helpers = new MiscHelpers()
		expect(helpers.json({ someValue: 'string' })).toBe(`{someValue: string, }`)
		expect(helpers.json({ someValue: 'string', another: { innerText: 'text' } })).toBe(`{someValue: string, another: [object], }`)
	})
})

describe('jsonStringifyFormatted', () => {
	it('basic values', async () => {
		const helpers = new MiscHelpers()
		expect(helpers.jsonStringifyFormatted({ someValue: 'string' })).toBe(`{
    "someValue": "string"
}`)
		expect(helpers.jsonStringifyFormatted(undefined)).toBe('{}')
	})
})

describe('randomString', () => {
	it('basic values', async () => {
		const helpers = new MiscHelpers()
		let result = helpers.randomString(10)
		expect(result.length).toBe(10)
		result = helpers.randomString(null)
		expect(result.length).toBe(50)
		result = helpers.randomString(-1)
		expect(result.length).toBe(50)
	})
})

describe('randomNumber', () => {
	it('basic values', async () => {
		const helpers = new MiscHelpers()
		const result = helpers.randomNumber(50)
		expect(result).toBeGreaterThanOrEqual(0)
		expect(result).toBeLessThanOrEqual(50)
	})
})

// eslint-disable-next-line spellcheck/spell-checker
describe('ifvalue', () => {
	it('in template', async () => {
		MiscHelpers.registerAll()
		// eslint-disable-next-line spellcheck/spell-checker
		const template = Handlebars.compile('{{#ifvalue this.property equals="TOAST"}}works{{else}}jam{{/ifvalue}}', {
			noEscape: true,
		})
		let newContent = template({ property: 'TOAST' })
		expect(newContent).toBe('works')
		newContent = template(false)
		expect(newContent).toBe('jam')
	})
})

// eslint-disable-next-line spellcheck/spell-checker
describe('ifvaluein', () => {
	it('in template', async () => {
		MiscHelpers.registerAll()
		// eslint-disable-next-line spellcheck/spell-checker
		const template = Handlebars.compile('{{#ifvaluein this.name equals="toast,bagel,scone"}}jam{{else}}peanut butter{{/ifvaluein}}', {
			noEscape: true,
		})
		let newContent = template({ name: 'toast' })
		expect(newContent).toBe('jam')
		newContent = template({ name: 'scone' })
		expect(newContent).toBe('jam')
		newContent = template({ name: 'egg' })
		expect(newContent).toBe('peanut butter')
	})
})

describe('IsNumber', () => {
	it('in template', async () => {
		MiscHelpers.registerAll()
		const template = Handlebars.compile('{{#IsNumber this.value}}jam{{else}}peanut butter{{/IsNumber}}', {
			noEscape: true,
		})
		let newContent = template({ value: 6 })
		expect(newContent).toBe('jam')
		newContent = template({ value: 'scone' })
		expect(newContent).toBe('peanut butter')
	})
})

describe('findComponents', () => {
	it('in template', async () => {
		try {
			MiscHelpers.registerAll()
			const system = new System()
			const child = new SystemDescendantComponent('Object', 'nameSpace', 'name', SystemComponentType.dataAccess, 'description')
			// eslint-disable-next-line spellcheck/spell-checker
			const template1 = Handlebars.compile(`{{#findComponents this "{ 'componentType': 'dataAccess' }"}}works{{/findComponents}}`, {
				noEscape: true,
			})
			const newContent1 = template1(system)
			expect(newContent1).toBe('')

			system.addChild(child)
			// eslint-disable-next-line spellcheck/spell-checker
			const template2 = Handlebars.compile(`{{#findComponents this "{ 'componentType': 'dataAccess' }"}}works{{/findComponents}}`, {
				noEscape: true,
			})
			const newContent2 = template2(system)
			expect(newContent2).toBe('works')
		} catch (problem) {
			fail('oops')
		}
	})
})
