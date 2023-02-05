import { SystemComponentType } from '../../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../../system/SystemDescendantComponent'

export class EnumeratedValue extends SystemDescendantComponent {
	value: string

	constructor(nameSpace: string, name: string, description: string, value: string) {
		super('EnumeratedValue', nameSpace, name, SystemComponentType.informationModel, description)
		this.value = value
	}
}
