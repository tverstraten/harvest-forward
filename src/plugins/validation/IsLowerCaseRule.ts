import { AbstractRule } from './AbstractRule'

export class IsLowerCaseRule extends AbstractRule {
	constructor(nameSpace: string, name: string, description: string) {
		super('IsLowerCaseRule', nameSpace, name, description)
	}
}
