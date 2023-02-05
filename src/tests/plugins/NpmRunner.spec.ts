import { ok } from 'assert'
import { NpmRunner } from '../../plugins/npmRunner/NpmRunner'
import { System } from '../../system/System'

describe('run', () => {
	it('perform', async () => {
		const builder = new NpmRunner({
			scriptName: 'clean',
		})
		console.log(`cwd-${process.cwd()}`)
		await builder.build(new System())
		ok(true)
	})
})
