import { ok } from 'assert'
import { ConfigurationManager } from '../../runtime/ConfigurationManager'
import { TemplateFactory } from '../../runtime/TemplateFactory'

describe('registerTemplate', () => {
	it('register and get', async () => {
		const templateName = 'someName1'
		const staticContent = 'this is the body of the template'
		TemplateFactory.registerTemplate(templateName, staticContent)
		const result = await TemplateFactory.getTemplate(templateName)
		expect(result).toBe(staticContent)
	})

	it('register duplicate', async () => {
		const templateName = 'someName2'
		const staticContent = 'this is the body of the template'
		TemplateFactory.registerTemplate(templateName, staticContent)

		try {
			TemplateFactory.registerTemplate(templateName, staticContent)
			fail()
		} catch (problem) {
			ok(true)
		}
	})

	it('register no name', async () => {
		try {
			TemplateFactory.registerTemplate(undefined as any, '')
			fail()
		} catch (problem) {
			ok(true)
		}
	})

	it('register no content', async () => {
		try {
			TemplateFactory.registerTemplate('meaningless', undefined as any)
			fail()
		} catch (problem) {
			ok(true)
		}
	})
})

describe('create', () => {
	it('by name', async () => {
		await ConfigurationManager.registerPlugins()
		const result = await TemplateFactory.getTemplate('handlebars/builtIn/handlebars/systemAsJson')
		// eslint-disable-next-line spellcheck/spell-checker
		expect(result).toBe('{{JSONstringifyFormatted this}}')
	})

	it('template resolver as string', async () => {
		const templateName = 'someName3'
		const staticContent = 'this is the body of the template'
		TemplateFactory.registerTemplate(templateName, staticContent)
		const result = await TemplateFactory.getTemplate(templateName)
		expect(result).toBe(staticContent)
	})

	it('template resolver that fails', async () => {
		const templateName = 'someName4'
		const staticContent = (): void => {
			throw new Error(`oops`)
		}
		TemplateFactory.registerTemplate(templateName, staticContent)

		try {
			await TemplateFactory.getTemplate('missing')
			fail()
		} catch (problem) {
			ok(true)
		}

		try {
			await TemplateFactory.getTemplate(templateName)
			fail()
		} catch (problem) {
			ok(true)
		}
	})
})
