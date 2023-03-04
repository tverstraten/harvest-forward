import { ValueType } from '../../system/ValueType'
import { Rule } from './Rule'

export class ValueTypeRule extends Rule {
	validTypes: ValueType[] = []

	constructor(nameSpace: string, name: string, description: string) {
		super('ValueTypeRule', nameSpace, name, description)
	}
}
