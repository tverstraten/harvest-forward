import { ok } from 'assert'
import { NodeRunner } from '../../plugins/nodeRunner/NodeRunner'
import { System } from '../../system/System'

describe('run', () => {
	it('perform', async () => {
		const builder = new NodeRunner({
			fileToRun: 'index.ts',
			//path
		})
		await builder.build(new System())
		ok(true)
	})
})
