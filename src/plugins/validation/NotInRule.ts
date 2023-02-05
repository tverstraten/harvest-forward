import { AbstractRule } from './AbstractRule'

export class NotInRule extends AbstractRule {
	value: any[] = []

	constructor(nameSpace: string, name: string, description: string) {
		super('NotInRule', nameSpace, name, description)
	}
}
