import { System } from '../../system/System'
import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'

export class ServiceLayer extends SystemDescendantComponent {
	constructor(nameSpace: string, name: string, description: string) {
		super('ServiceLayer', nameSpace, name, SystemComponentType.dataAccess, description)
	}

	static fromSystem(system: System): ServiceLayer {
		let model = system.findOneComponent({
			objectTypeName: 'ServiceLayer',
		}) as ServiceLayer
		if (model == null) {
			model = new ServiceLayer(
				'',
				'ServiceLayer',
				'The  data that describes the functionality for performing logic and business actions against raw information in the system'
			)
			system.addChild(model)
		}
		return model
	}
}
