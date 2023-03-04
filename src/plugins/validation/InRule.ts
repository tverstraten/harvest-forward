import { Rule } from './Rule'

export class InRule extends Rule {
	value: any[] = []

	constructor(nameSpace: string, name: string, description: string) {
		super('InRule', nameSpace, name, description)
	}
}
