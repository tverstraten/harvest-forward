import { AbstractRule } from './AbstractRule'

export class InRule extends AbstractRule {
	value: any[] = []

	constructor(nameSpace: string, name: string, description: string) {
		super('InRule', nameSpace, name, description)
	}
}
