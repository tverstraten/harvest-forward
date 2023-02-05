import { AbstractArtifact } from './AbstractArtifact'
import { SystemDescendantComponent } from './SystemDescendantComponent'

export class SystemComponentArtifact extends AbstractArtifact {
	constructor(component: SystemDescendantComponent) {
		super(undefined, component.name, component.fullConstantCaseName)
	}
}
