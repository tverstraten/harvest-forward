import { AbstractRule } from './AbstractRule'

export class NumericRangeRule extends AbstractRule {
	minimum: number = Number.NEGATIVE_INFINITY

	maximum: number = Number.POSITIVE_INFINITY

	constructor(nameSpace: string, name: string, description: string) {
		super('NumericRangeRule', nameSpace, name, description)
	}
}
