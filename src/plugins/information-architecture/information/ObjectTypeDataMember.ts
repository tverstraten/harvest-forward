import { Permanence } from '../../../system/Permanence'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentType } from '../../../system/SystemComponentType'
import { ValueSpecification } from '../../../system/ValueSpecification'
import { ValueType } from '../../../system/ValueType'
import { AbstractRule } from '../../validation'
import { ObjectTypeMember } from './ObjectTypeMember'

export class ObjectTypeDataMember extends ObjectTypeMember implements ValueSpecification {
	type: ValueType

	length: number

	optional = false

	significantDigits = 0

	foreignIdentityFor?: ObjectTypeDataMember

	foreignIdentifiedBy?: ObjectTypeDataMember

	static = false

	// eslint-disable-next-line max-params
	constructor(typeName: string, nameSpace: string, name: string, description: string, type: ValueType, length: number) {
		super(typeName, nameSpace, name, description, SystemComponentType.informationModel)
		this.type = type
		this.length = length
		this.permanence = Permanence.persistent
	}

	addChild(child: SystemComponent): void {
		super.addChild(child)
		if (child instanceof AbstractRule) {
			this.rules.push(child)
		}
	}

	removeChild(child: SystemComponent): boolean {
		if (child instanceof AbstractRule) {
			const index = this.rules.indexOf(child)
			this.rules.splice(index, 1)
		}
		return super.removeChild(child)
	}

	get allReferences(): ValueType[] {
		let referent = this.type
		while (referent.isCollection && referent.collectedType != null) {
			referent = referent.collectedType
		}

		return [referent]
	}

	get classTypeField(): boolean {
		const mapping = (this as any).orMapping as any
		return mapping.discriminator ? true : false
	}
}
