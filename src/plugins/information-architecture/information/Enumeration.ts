import { Permanence } from '../../../system/Permanence'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentComparator } from '../../../system/SystemComponentComparator'
import { ValueType } from '../../../system/ValueType'
import { EnumeratedValue } from './EnumeratedValue'

export class Enumeration extends ValueType {
	isEnumeration = true

	private _values: { [key: string]: EnumeratedValue }

	constructor(nameSpace: string, name: string, description: string, values: EnumeratedValue[]) {
		super('Enumeration', nameSpace, name, description, false)
		this.permanence = Permanence.transient
		this._values = {}
		values.forEach((value) => {
			this.addChild(value)
		})
	}

	get valuesMap(): { [key: string]: EnumeratedValue } {
		return this._values
	}

	get values(): EnumeratedValue[] {
		return Object.values(this._values).sort(SystemComponentComparator)
	}

	addChild(child: SystemComponent): void {
		super.addChild(child)
		if (child instanceof EnumeratedValue) {
			this._values[child.name] = child
		}
	}

	removeChild(child: SystemComponent): boolean {
		if (child instanceof EnumeratedValue) {
			delete this._values[child.name]
		}
		return super.removeChild(child)
	}
}
