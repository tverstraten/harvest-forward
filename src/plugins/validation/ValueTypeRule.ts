import { ValueType } from '../../system/ValueType'
import { AbstractRule } from './AbstractRule'

export class ValueTypeRule extends AbstractRule {
	validTypes: ValueType[] = []

	constructor(nameSpace: string, name: string, description: string) {
		super('ValueTypeRule', nameSpace, name, description)
	}
}
