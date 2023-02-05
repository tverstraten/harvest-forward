import { AbstractRule } from './AbstractRule'

export class EqualsRule extends AbstractRule {
	value: any

	constructor(nameSpace: string, name: string, description: string) {
		super('EqualsRule', nameSpace, name, description)
	}
}
