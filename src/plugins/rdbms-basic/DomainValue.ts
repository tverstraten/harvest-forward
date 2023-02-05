import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'

export class DomainValue extends SystemDescendantComponent {
	value: string

	constructor(nameSpace: string, name: string, description: string, value: string) {
		super('DomainValue', nameSpace, name, SystemComponentType.informationModel, description)
		this.value = value
	}
}
