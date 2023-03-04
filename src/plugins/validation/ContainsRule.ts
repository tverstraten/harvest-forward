import { Rule } from './Rule'

export class ContainsRule extends Rule {
	value = ''

	constructor(nameSpace: string, name: string, description: string) {
		super('ContainsRule', nameSpace, name, description)
	}
}
