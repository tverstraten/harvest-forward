import { AbstractValueSpecification } from '../../../system/AbstractValueSpecification'
import { ValueType } from '../../../system/ValueType'
import { Rule } from '../../validation'

export class Parameter extends AbstractValueSpecification {
	required = true

	private _rules: Rule[]

	constructor(nameSpace: string, name: string, description: string, type: ValueType, length: number) {
		super('Parameter', nameSpace, name, description, type, length)
		this._rules = []
	}

	get rules(): Rule[] {
		return this._rules
	}
}
