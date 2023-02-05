import { Permanence } from '../../../system/Permanence'
import { StringIdentifiable } from '../../../system/StringIdentifiable'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentComparator } from '../../../system/SystemComponentComparator'
import { SystemComponentType } from '../../../system/SystemComponentType'
import { ValueType } from '../../../system/ValueType'
import { ObjectType } from '../information/ObjectType'
import { Field } from './Field'
import { Method } from './Method'
import { Property } from './Property'

export class Class extends ObjectType implements StringIdentifiable {
	isClass = true

	identifyingProperty?: Property

	/**
	 * The information class that this class effectively operates on. Generally this is assigned for functional classes to the
	 * information class. For example, if this class is a Dal, operatesOnBehalfOf would be assigned the informational class
	 * that the dal primarily acts on.
	 */
	operatesOnBehalfOf?: Class

	isAbstract = false

	private _fields: { [key: string]: Field }

	private _properties: { [key: string]: Property }

	private _methods: { [key: string]: Method }

	constructor(nameSpace: string, name: string, description: string, role: SystemComponentType) {
		super('Class', nameSpace, name, description, role)
		this.updateable = true
		this.permanence = Permanence.transient
		this._fields = {}
		this._properties = {}
		this._methods = {}
	}

	get isObject(): boolean {
		return !this.isExternal
	}

	get identifiable(): boolean {
		return this.identifyingProperty != null
	}

	addChild(child: SystemComponent): void {
		super.addChild(child)
		if (child instanceof Property) {
			this._properties[child.name] = child
		} else if (child instanceof Method) {
			this._methods[child.name] = child
		} else if (child instanceof Field) {
			this._fields[child.name] = child
		}
	}

	removeChild(child: SystemComponent): boolean {
		if (child instanceof Property) {
			delete this._properties[child.name]
		} else if (child instanceof Method) {
			delete this._methods[child.name]
		} else if (child instanceof Field) {
			delete this._fields[child.name]
		}
		return super.removeChild(child)
	}

	get fieldsMap(): { [key: string]: Field } {
		return this._fields
	}

	get fields(): Field[] {
		return Object.values(this._fields).sort(SystemComponentComparator)
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
