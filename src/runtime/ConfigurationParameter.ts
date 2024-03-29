import { Describable } from '../system/Describable'
import { Nameable } from '../system/Nameable'
import { ValueType } from '../system/ValueType'

export interface ConfigurationParameter extends Nameable, Describable {
	readonly name: string

	readonly description: string

	readonly valueType: ValueType

	required: boolean

	readonly defaultValue?: any
}
