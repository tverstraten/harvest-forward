import { Rule } from './Rule'

export class LengthRule extends Rule {
	minimum: number = Number.NEGATIVE_INFINITY

	maximum: number = Number.POSITIVE_INFINITY

	length = 0

	constructor(nameSpace: string, name: string, description: string) {
		super('LengthRule', nameSpace, name, description)
	}
}
