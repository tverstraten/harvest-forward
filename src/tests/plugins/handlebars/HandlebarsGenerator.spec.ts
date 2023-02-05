import fs from 'fs'
import { HandlebarsGenerator } from '../../../plugins/handlebars/HandlebarsGenerator'
import { System } from '../../../system/System'

describe('build', () => {
	it('build', async () => {
		try {
			// eslint-disable-next-line spellcheck/spell-checker
			const fullTargetPath = './src/tests/plugins/handlebars/test.txt'
			if (fs.existsSync(fullTargetPath)) await fs.promises.unlink(fullTargetPath)
			const builder = new HandlebarsGenerator({
				templatePath: './src/tests/plugins/handlebars/test.handlebars',
				//templateName
				targetPath: fullTargetPath,
				//fileNamePattern
				//fileNameFunction
				//repeatFor
				//overwrite
			})
			const system = new System()
			await builder.build(system)
			expect(fs.existsSync(fullTargetPath)).toBe(true)
		} catch (problem) {
			fail(`oops`)
		}
	})
})
