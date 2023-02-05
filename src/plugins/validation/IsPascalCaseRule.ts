import { AbstractRule } from './AbstractRule'

export class IsPascalCaseRule extends AbstractRule {
	constructor(nameSpace: string, name: string, description: string) {
		super('IsPascalCaseRule', nameSpace, name, description)
	}
}
