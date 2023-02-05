import { AbstractRule } from './AbstractRule'

export class RegexRule extends AbstractRule {
	pattern = ''

	constructor(nameSpace: string, name: string, description: string) {
		super('RegexRule', nameSpace, name, description)
	}
}
