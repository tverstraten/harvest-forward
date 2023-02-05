import { AbstractRule } from './AbstractRule'

export class ContainsRule extends AbstractRule {
	value = ''

	constructor(nameSpace: string, name: string, description: string) {
		super('ContainsRule', nameSpace, name, description)
	}
}
