import { JavaScriptRunner } from '../../plugins/javascriptRunner/JavaScriptRunner'
import { System } from '../../system/System'

describe('run', () => {
	it('perform', async () => {
		const builder = new JavaScriptRunner({
			scriptToRun: 'function( system, component ){ return [ system ] }',
		})
		const system = new System()
		const results = await builder.build(system)
		expect(results[0]).toBe(system)
	})
})
