import { AbstractRule } from './AbstractRule'

export class NotNullRule extends AbstractRule {
	constructor(nameSpace: string, name: string, description: string) {
		super('NotNullRule', nameSpace, name, description)
	}
}
