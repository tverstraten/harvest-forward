import { ok } from 'assert'
import { BuilderConfiguration } from '../../runtime/BuilderConfiguration'
import { ConfigurationManager } from '../../runtime/ConfigurationManager'
import { RuntimeBuilder } from '../../runtime/RuntimeBuilder'
import { System } from '../../system/System'

describe('create', () => {
	it('by name', async () => {
		const system = new System()
		const configuration = {
			builder: 'SequentialAggregateBuilder',
			settings: '',
		} as BuilderConfiguration
		ConfigurationManager.registerPlugins
		const builder = new RuntimeBuilder(system, configuration)
		const results = await builder.build(system)
		expect(results.length).toBe(0)
	})

	it('fail', async () => {
		const system = new System()

		// force a failure in runtime builder
		try {
			const builder = new RuntimeBuilder(system, {} as BuilderConfiguration)
			await expect(builder.build(system)).rejects.toEqual(RangeError('wow'))
			fail()
		} catch (problem) {
			ok(true)
		}
	})
})
