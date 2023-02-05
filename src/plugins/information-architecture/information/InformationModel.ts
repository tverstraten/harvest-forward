import { Permanence } from '../../../system/Permanence'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentComparator } from '../../../system/SystemComponentComparator'
import { SystemComponentType } from '../../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../../system/SystemDescendantComponent'
import { Enumeration } from './Enumeration'
import { ObjectType } from './ObjectType'
import { Projection } from './Projection'

export class InformationModel extends SystemDescendantComponent {
	private _persistentTypes: ObjectType[] = []

	private _fixedTypes: ObjectType[] = []

	private _projections: Projection[] = []

	private _enumerations: Enumeration[] = []

	constructor(nameSpace: string, name: string, description: string) {
		super('InformationModel', nameSpace, name, SystemComponentType.informationModel, description)
	}

	static fromSystem(system: System): InformationModel {
		let model = system.findOneComponent({
			objectTypeName: 'InformationModel',
		}) as InformationModel
		if (model == null) {
			model = new InformationModel('', 'InformationModel', 'The  data that describe the information that will be tracked and used in the system')
			system.addChild(model)
			// TODO: need to add the information model to the created artifacts
		}
		return model
	}

	addDescendant(descendant: SystemComponent): void {
		super.addDescendant(descendant)
		if (descendant instanceof Enumeration) {
			if (!this._enumerations.includes(descendant)) {
				this._enumerations.push(descendant)
				this._enumerations.sort(SystemComponentComparator)
			}
		} else {
			if (descendant instanceof ObjectType && descendant.permanence === Permanence.persistent) {
				if (!this._persistentTypes.includes(descendant)) {
					this._persistentTypes.push(descendant)
					this._persistentTypes.sort(SystemComponentComparator)
				}
			}
			if (descendant instanceof Projection) {
				if (!this._projections.includes(descendant)) {
					this._projections.push(descendant)
					this._projections.sort(SystemComponentComparator)
				}
			} else if (descendant instanceof ObjectType) {
				if (!this._fixedTypes.includes(descendant)) {
					this._fixedTypes.push(descendant)
					this._fixedTypes.sort(SystemComponentComparator)
				}
			}
		}
	}

	removeChild(child: SystemComponent): boolean {
		const result = super.removeChild(child)
		this.removeDescendant(child)
		return result
	}

	removeDescendant(descendant: SystemComponent): void {
		let index
		if (descendant instanceof Enumeration) {
			index = this._enumerations.indexOf(descendant, 0)
			if (index > -1) this._enumerations.splice(index, 1)
		} else {
			if (descendant instanceof ObjectType && descendant.permanence === Permanence.persistent) {
				index = this._persistentTypes.indexOf(descendant, 0)
				if (index > -1) this._persistentTypes.splice(index, 1)
			}
			if (descendant instanceof Projection) {
				index = this._projections.indexOf(descendant, 0)
				if (index > -1) this._projections.splice(index, 1)
			} else if (descendant instanceof ObjectType) {
				index = this._fixedTypes.indexOf(descendant, 0)
				if (index > -1) this._fixedTypes.splice(index, 1)
			}
		}
	}

	get persistentTypes(): ObjectType[] {
		return this._persistentTypes
	}

	get fixedTypes(): ObjectType[] {
		return this._fixedTypes
	}

	get projections(): Projection[] {
		return this._projections
	}

	get enumerations(): Enumeration[] {
		return this._enumerations
	}
}
