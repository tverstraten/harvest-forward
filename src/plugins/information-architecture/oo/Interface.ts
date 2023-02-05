import { StringIdentifiable } from '../../../system/StringIdentifiable'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentComparator } from '../../../system/SystemComponentComparator'
import { SystemComponentType } from '../../../system/SystemComponentType'
import { ValueType } from '../../../system/ValueType'
import { ObjectType } from '../information/ObjectType'
import { Method } from './Method'
import { Property } from './Property'

export class Interface extends ObjectType implements StringIdentifiable {
	private _properties: { [key: string]: Property }

	private _methods: { [key: string]: Method }

	constructor(nameSpace: string, name: string, description: string, role: SystemComponentType) {
		super('Interface', nameSpace, name, description, role)
		this._properties = {}
		this._methods = {}
	}

	addChild(child: SystemComponent): void {
		super.addChild(child)
		if (child instanceof Property) {
			this._properties[child.name] = child
		} else if (child instanceof Method) {
			this._methods[child.name] = child
		}
	}

	removeChild(child: SystemComponent): boolean {
		if (child instanceof Property) {
			delete this._properties[child.name]
		} else if (child instanceof Method) {
			delete this._methods[child.name]
		}
		return super.removeChild(child)
	}

	get propertiesMap(): { [key: string]: Property } {
		return this._properties
	}

	get properties(): Property[] {
		return Object.values(this._properties).sort(SystemComponentComparator)
	}

	get methodsMap(): { [key: string]: Method } {
		return this._methods
	}

	get methods(): Method[] {
		return Object.values(this._methods).sort(SystemComponentComparator)
	}

	get classReferences(): ValueType[] {
		return this.allReferences.filter((item) => item.objectTypeName === 'Class')
	}
}
