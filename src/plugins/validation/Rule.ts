import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'

export class Rule extends SystemDescendantComponent {
	constructor(objectType: string, nameSpace: string, name: string, description: string) {
		super(objectType, nameSpace, name, SystemComponentType.validationRule, description)
	}
}
