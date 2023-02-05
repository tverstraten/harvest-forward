import { AbstractRule } from './AbstractRule'

export class NotContainsRule extends AbstractRule {
	value = ''

	constructor(nameSpace: string, name: string, description: string) {
		super('NotContainsRule', nameSpace, name, description)
	}
}
