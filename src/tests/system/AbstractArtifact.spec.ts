import { AbstractArtifact } from '../../system/AbstractArtifact'

describe('all choices', () => {
	class DummyArtifact extends AbstractArtifact {}
	it('no id', async () => {
		const name = 'arbitrary name'
		const path = '/user/home/myFile.ts'
		const artifact = new DummyArtifact(undefined, name, path)

		expect(artifact.name).toBe(name)
		expect(artifact.path).toBe(path)
		expect(artifact.id).toBeDefined
		expect(artifact.id.length).toBeGreaterThan(10)
	})

	it('specified id', async () => {
		const id = '6'
		const name = 'arbitrary name'
		const path = '/user/home/myFile.ts'
		const artifact = new DummyArtifact(id, name, path)

		expect(artifact.name).toBe(name)
		expect(artifact.path).toBe(path)
		expect(artifact.id).toBe(id)
	})
})
