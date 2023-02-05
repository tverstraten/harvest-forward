import { AbstractRule } from './AbstractRule'

export class CardinalityRule extends AbstractRule {
	minimum: number = Number.NEGATIVE_INFINITY

	maximum: number = Number.POSITIVE_INFINITY

	constructor(nameSpace: string, name: string, description: string) {
		super('CardinalityRule', nameSpace, name, description)
	}
}
