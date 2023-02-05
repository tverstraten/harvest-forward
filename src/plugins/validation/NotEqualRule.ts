import { AbstractRule } from './AbstractRule'

export class NotEqualRule extends AbstractRule {
	value: any

	constructor(nameSpace: string, name: string, description: string) {
		super('NotEqualRule', nameSpace, name, description)
	}
}
