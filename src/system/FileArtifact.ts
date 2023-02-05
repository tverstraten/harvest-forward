import { AbstractArtifact } from './AbstractArtifact'

export class FileArtifact extends AbstractArtifact {
	constructor(name: string, path: string) {
		super(undefined, name, path)
	}
}
