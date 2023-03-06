import { Rule } from './Rule'

export class IsDecimalRule extends Rule {
	forceDecimal?: boolean

	decimalDigits?: number

	locale?: string

	constructor(nameSpace: string, name: string, description: string) {
		super('IsDecimal', nameSpace, name, description)
	}
}
