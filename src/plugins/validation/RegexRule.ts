import { Rule } from './Rule'

export class RegexRule extends Rule {
	pattern = ''

	constructor(nameSpace: string, name: string, description: string) {
		super('RegexRule', nameSpace, name, description)
	}
}
