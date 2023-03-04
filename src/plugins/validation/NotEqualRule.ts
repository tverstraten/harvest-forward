import { Rule } from './Rule'

export class NotEqualRule extends Rule {
	value: any

	constructor(nameSpace: string, name: string, description: string) {
		super('NotEqualRule', nameSpace, name, description)
	}
}
