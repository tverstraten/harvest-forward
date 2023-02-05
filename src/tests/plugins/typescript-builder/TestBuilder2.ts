import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'

export class TestBuilder extends AbstractSingularBuilder {
	protected async buildInternal(system: System, __component: SystemComponent): Promise<Artifact[]> {
		const item = `${system.name}` as unknown as Artifact
		return [item]
	}
}
