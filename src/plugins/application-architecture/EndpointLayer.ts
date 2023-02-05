import { System } from '../../system/System'
import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'

export class EndpointLayer extends SystemDescendantComponent {
	constructor(nameSpace: string, name: string, description: string) {
		super('EndpointLayer', nameSpace, name, SystemComponentType.dataAccess, description)
	}

	static fromSystem(system: System): EndpointLayer {
		let model = system.findOneComponent({
			objectTypeName: 'EndpointLayer',
		}) as EndpointLayer
		if (model == null) {
			model = new EndpointLayer(
				'',
				'EndpointLayer',
				'The  data that describes the functionality for accessing data and services in the system from external systems'
			)
			system.addChild(model)
		}
		return model
	}
}
