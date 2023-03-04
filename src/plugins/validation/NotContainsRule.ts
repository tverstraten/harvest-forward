import { Rule } from './Rule'

export class NotContainsRule extends Rule {
	value = ''

	constructor(nameSpace: string, name: string, description: string) {
		super('NotContainsRule', nameSpace, name, description)
	}
}
