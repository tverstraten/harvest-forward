import { ValueType } from '../../../system/ValueType'
import { ObjectTypeDataMember } from '../information/ObjectTypeDataMember'

export class Field extends ObjectTypeDataMember {
	constructor(nameSpace: string, name: string, description: string, type: ValueType, length: number) {
		super('Field', nameSpace, name, description, type, length)
		this.type = type
		this.length = length
	}
}
