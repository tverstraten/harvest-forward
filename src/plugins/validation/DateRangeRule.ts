import { Rule } from './Rule'

export class DateRangeRule extends Rule {
	minimum: Date = new Date(0, 0, 0)

	maximum: Date = new Date(9999, 12, 31)

	constructor(nameSpace: string, name: string, description: string) {
		super('DateRangeRule', nameSpace, name, description)
	}
}
