import { BuilderConfiguration } from '../../runtime/BuilderConfiguration'

describe('create', () => {
	it('simple check', async () => {
		const result = new BuilderConfiguration()
		expect(result.builder).toBe('')
		expect(result.settings).toBe('')
	})
})
