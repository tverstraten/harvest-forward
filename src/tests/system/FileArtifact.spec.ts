import { FileArtifact } from '../../system/FileArtifact'

describe('all choices', () => {
	it('simple value check', async () => {
		const name = 'arbitrary name'
		const path = '/user/home/myFile.ts'
		const artifact = new FileArtifact(name, path)

		expect(artifact.name).toBe(name)
		expect(artifact.path).toBe(path)
		expect(artifact.id).toBeDefined
		expect(artifact.id.length).toBeGreaterThan(10)
	})
})
