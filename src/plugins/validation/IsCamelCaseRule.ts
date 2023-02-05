import { AbstractRule } from './AbstractRule'

export class IsCamelCaseRule extends AbstractRule {
	constructor(nameSpace: string, name: string, description: string) {
		super('IsCamelCaseRule', nameSpace, name, description)
	}
}
