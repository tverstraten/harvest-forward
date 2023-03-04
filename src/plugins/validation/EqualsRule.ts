import { Rule } from './Rule'

export class EqualsRule extends Rule {
	value: any

	constructor(nameSpace: string, name: string, description: string) {
		super('EqualsRule', nameSpace, name, description)
	}
}
