import { System } from '../../system/System'
import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'

export class DataAccessLayer extends SystemDescendantComponent {
	constructor(nameSpace: string, name: string, description: string) {
		super('DataAccessLayer', nameSpace, name, SystemComponentType.dataAccess, description)
	}

	static fromSystem(system: System): DataAccessLayer {
		let model = system.findOneComponent({
			objectTypeName: 'DataAccessLayer',
		}) as DataAccessLayer
		if (model == null) {
			model = new DataAccessLayer('', 'DataAccessLayer', 'The  data that describes the functionality for accessing data in the system')
			system.addChild(model)
		}
		return model
	}
}
