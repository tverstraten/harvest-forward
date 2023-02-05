import { AbstractRule } from './AbstractRule'

export class IsUpperCaseRule extends AbstractRule {
	constructor(nameSpace: string, name: string, description: string) {
		super('IsUpperCaseRule', nameSpace, name, description)
	}
}
