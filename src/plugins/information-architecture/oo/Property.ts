import { ValueType } from '../../../system/ValueType'
import { ObjectTypeDataMember } from '../information/ObjectTypeDataMember'
import { Field } from './Field'

export class Property extends ObjectTypeDataMember {
	backingField?: Field

	constructor(nameSpace: string, name: string, description: string, type: ValueType, length: number) {
		super('Property', nameSpace, name, description, type, length)
		this.type = type
		this.length = length
	}
}
