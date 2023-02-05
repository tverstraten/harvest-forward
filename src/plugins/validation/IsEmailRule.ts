import { AbstractRule } from './AbstractRule'

export class IsEmailRule extends AbstractRule {
	constructor(nameSpace: string, name: string, description: string) {
		super('IsEmailRule', nameSpace, name, description)
	}
}
