import { Rule } from './Rule'

export class IsNumberRule extends Rule {
	allowNaN?: boolean

	allowInfinity?: boolean

	maxDecimalPlaces?: number

	constructor(nameSpace: string, name: string, description: string) {
		super('IsNumberRule', nameSpace, name, description)
	}
}
