import { SystemComponentArtifact } from '../../system/SystemComponentArtifact'
import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'

describe('compare', () => {
	it('no id', async () => {
		const name = 'arbitrary name'
		const path = '/user/home/myFile.ts'
		const expectedPath = `USER/HOME/MY_FILE_TS/ARBITRARY_NAME`
		const object1 = new SystemDescendantComponent('', path, name, SystemComponentType.storage, '')
		const artifact = new SystemComponentArtifact(object1)

		expect(artifact.name).toBe(name)
		expect(artifact.path).toBe(expectedPath)
		expect(artifact.id).toBeDefined
		expect(artifact.id.length).toBeGreaterThan(10)
	})
})
