import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'
import { Rule } from './Rule'

export abstract class AbstractRule extends SystemDescendantComponent implements Rule {
	constructor(objectType: string, nameSpace: string, name: string, description: string) {
		super(objectType, nameSpace, name, SystemComponentType.validationRule, description)
	}
}
