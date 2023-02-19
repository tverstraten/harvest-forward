import { SystemDescendantComponent } from './SystemDescendantComponent'
import { ValueType } from './ValueType'

export interface ValueSpecification extends SystemDescendantComponent {
	type: ValueType

	length: number

	significantDigits: number
}
