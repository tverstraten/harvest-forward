import { Artifact } from './Artifact'
// eslint-disable-next-line spellcheck/spell-checker
import { v4 as uuidv4 } from 'uuid'

export abstract class AbstractArtifact implements Artifact {
	readonly id: string

	readonly name: string

	readonly path: string

	constructor(id: string | undefined, name: string, path: string) {
		// eslint-disable-next-line spellcheck/spell-checker
		this.id = id ? id : uuidv4()
		this.name = name
		this.path = path
	}
}
