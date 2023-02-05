import { SystemComponentType } from './SystemComponentType'
import { SystemDescendantComponent } from './SystemDescendantComponent'
import { ValueSpecification } from './ValueSpecification'
import { ValueType } from './ValueType'

export abstract class AbstractValueSpecification extends SystemDescendantComponent implements ValueSpecification {
	type: ValueType

	length: number

	optional = false

	significantDigits = 0

	// eslint-disable-next-line max-params
	constructor(objectType: string, nameSpace: string, name: string, description: string, type: ValueType, length: number) {
		super(objectType, nameSpace, name, SystemComponentType.informationModel, description)
		this.type = type
		this.length = length
	}
}
