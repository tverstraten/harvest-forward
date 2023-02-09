import { SystemComponentType } from '../../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../../system/SystemDescendantComponent'
import { ValueType } from '../../../system/ValueType'
import { Rule } from '../../validation'

export abstract class ObjectTypeMember extends SystemDescendantComponent {
	private _rules: Rule[]

	static = false

	constructor(typeName: string, nameSpace: string, name: string, description: string, role: SystemComponentType) {
		super(typeName, nameSpace, name, role, description)
		this._rules = []
	}

	abstract allReferences: ValueType[]

	get rules(): Rule[] {
		return this._rules
	}
}
