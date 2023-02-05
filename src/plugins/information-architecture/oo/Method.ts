import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentComparator } from '../../../system/SystemComponentComparator'
import { SystemComponentType } from '../../../system/SystemComponentType'
import { ValueSpecification } from '../../../system/ValueSpecification'
import { ValueType } from '../../../system/ValueType'
import { ObjectTypeMember } from '../information/ObjectTypeMember'
import { Parameter } from './Parameter'

/**
 * TODO: the http stuff needs to be split into a derivation for rest endpoints.
 */
export class Method extends ObjectTypeMember {
	private _parameters: { [key: string]: Parameter }

	returns?: ValueSpecification

	constructor(nameSpace: string, name: string, description: string) {
		super('Method', nameSpace, name, description, SystemComponentType.informationModel)
		this._parameters = {}
	}

	addChild(child: SystemComponent): void {
		super.addChild(child)
		if (child instanceof Parameter) {
			this._parameters[child.name] = child
		}
	}

	removeChild(child: SystemComponent): boolean {
		if (child instanceof Parameter) {
			delete this._parameters[child.name]
		}
		return super.removeChild(child)
	}

	get allReferences(): ValueType[] {
		const result = this.returns && this.returns.type ? [this.returns.type] : []

		Object.keys(this._parameters).forEach((parameterName) => {
			const parameter = this._parameters[parameterName]
			let referent = parameter.type
			while (referent.isCollection && referent.collectedType != null) {
				referent = referent.collectedType
			}
			if (!result.includes(referent)) result.push(referent)
		})

		return result.sort(SystemComponentComparator)
	}

	get primitiveReferences(): ValueType[] {
		return this.allReferences.filter((parameter) => parameter.primitive)
	}

	get nonPrimitiveReferences(): ValueType[] {
		return this.allReferences.filter((parameter) => !parameter.primitive)
	}

	get parameters(): { [key: string]: Parameter } {
		return this._parameters
	}
}
