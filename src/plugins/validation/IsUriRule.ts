import { AbstractRule } from './AbstractRule'

export class IsUriRule extends AbstractRule {
	constructor(nameSpace: string, name: string, description: string) {
		super('IsUriRule', nameSpace, name, description)
	}
}
