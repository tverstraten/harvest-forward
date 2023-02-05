import { ok } from 'assert'
import { ConfigurationManager } from '../../runtime/ConfigurationManager'
import { TemplateFactory } from '../../runtime/TemplateFactory'
import { ValueType } from '../../system/ValueType'
import { ValueTypeResolver } from '../../system/ValueTypeResolver'

describe('registerConfigurationFile', () => {
	it('load file with package', async () => {
		// need to load a different one, we get duplicates with this since its in the .hf.json
		await ConfigurationManager.registerConfigurationFile('test', './src/tests/.hf.json')
		const keys = Object.keys(TemplateFactory.templateResolvers)
		expect(keys.length).toBe(1)

		// eslint-disable-next-line spellcheck/spell-checker
		const template = await TemplateFactory.getTemplate('handlebars/@tverstraten/hf-sample-template/sampleTemplate')
		// eslint-disable-next-line spellcheck/spell-checker
		expect(template).toBe(`{{JSONstringifyFormatted this}}`)
	})

	it('bad package in file', async () => {
		try {
			await ConfigurationManager.registerConfigurationFile('test', './src/tests/.hf2.json')
		} catch (problem) {
			// eslint-disable-next-line spellcheck/spell-checker
			expect((problem as any).message).toBe(`Cannot find module '@tverstraten/does-not-exist' from 'runtime/ConfigurationManager.ts'`)
		}
	})
})

describe('registerConfigurationModuleTypeResolvers', () => {
	it('none', async () => {
		const originalKeys = Object.keys(ValueType.typeResolverMap)
		await ConfigurationManager.registerConfigurationModuleTypeResolvers(undefined as any)
		const newKeys = Object.keys(ValueType.typeResolverMap)
		expect(originalKeys.length).toBe(newKeys.length)
	})

	it('empty', async () => {
		const originalKeys = Object.keys(ValueType.typeResolverMap)
		await ConfigurationManager.registerConfigurationModuleTypeResolvers([])
		const newKeys = Object.keys(ValueType.typeResolverMap)
		expect(originalKeys.length).toBe(newKeys.length)
	})

	it('one', async () => {
		const newResolver = {} as ValueTypeResolver
		const originalKeys = Object.keys(ValueType.typeResolverMap)
		await ConfigurationManager.registerConfigurationModuleTypeResolvers({ sql: newResolver })
		const newKeys = Object.keys(ValueType.typeResolverMap)
		expect(originalKeys.length + 1).toBe(newKeys.length)
		expect(newKeys.includes('Sql')).toBe(true)
	})
})

describe('registerConfigurationByModule', () => {
	it('fails', async () => {
		try {
			await ConfigurationManager.registerConfigurationByModule('test', undefined as any)
			fail('should not hit here')
		} catch (problem) {
			ok(true)
		}
	})
})

describe('registerConfigurationByPath', () => {
	it('fails', async () => {
		try {
			await ConfigurationManager.registerConfigurationByPath(undefined as any)
			fail('should not hit here')
		} catch (problem) {
			ok(true)
		}
	})
})
