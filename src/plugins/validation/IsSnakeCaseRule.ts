import { AbstractRule } from './AbstractRule'

export class IsSnakeCaseRule extends AbstractRule {
	constructor(nameSpace: string, name: string, description: string) {
		super('IsSnakeCaseRule', nameSpace, name, description)
	}
}
