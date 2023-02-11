import Pluralize from 'pluralize'
import { StringIdentifiable } from '../../../system/StringIdentifiable'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentComparator } from '../../../system/SystemComponentComparator'
import { SystemComponentType } from '../../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../../system/SystemDescendantComponent'
import { ValueType } from '../../../system/ValueType'
import { AbstractRule, Rule } from '../../validation'
import { ObjectTypeDataMember } from './ObjectTypeDataMember'
import { ObjectTypeMember } from './ObjectTypeMember'

export class ObjectType extends ValueType implements StringIdentifiable {
	singularName: string

	pluralName: string

	inheritsFrom: string[]

	implements: string[]

	derivations: string[]

	private _members: { [key: string]: ObjectTypeMember }

	private _dataMembers: { [key: string]: ObjectTypeDataMember }

	specifiedDependencies: ObjectType[]

	private _rules: Rule[]

	constructor(objectType: string, nameSpace: string, name: string, description: string, role: SystemComponentType) {
		super(objectType, nameSpace, name, description)
		this.componentType = role
		this.inheritsFrom = []
		this.derivations = []
		this.implements = []
		this._members = {}
		this._dataMembers = {}
		this._rules = []
		this.updateable = true
		if (Pluralize.isPlural(name)) this.pluralName = name
		else this.pluralName = Pluralize.plural(name)
		if (Pluralize.isSingular(name)) this.singularName = name
		else this.singularName = Pluralize.singular(name)
		this.specifiedDependencies = []
	}

	get isObject(): boolean {
		return !this.isExternal
	}

	get membersMap(): { [key: string]: ObjectTypeMember } {
		return this._members
	}

	get members(): ObjectTypeMember[] {
		return Object.values(this._members).sort(SystemComponentComparator)
	}

	get dataMembersMap(): { [key: string]: ObjectTypeDataMember } {
		return this._dataMembers
	}

	get dataMembers(): ObjectTypeDataMember[] {
		return Object.values(this._dataMembers).sort(SystemComponentComparator)
	}

	addChild(child: SystemComponent): void {
		super.addChild(child)
		if (child instanceof ObjectTypeDataMember) {
			this._members[child.name] = child
			this._dataMembers[child.name] = child
		} else if (child instanceof ObjectTypeMember) {
			this._members[child.name] = child
		} else if (child instanceof AbstractRule) {
			this._rules.push(child)
		}
	}

	removeChild(child: SystemComponent): boolean {
		if (child instanceof ObjectTypeDataMember) {
			delete this._members[child.name]
			delete this._dataMembers[child.name]
		} else if (child instanceof ObjectTypeMember) {
			delete this._members[child.name]
		} else if (child instanceof AbstractRule) {
			const index = this._rules.indexOf(child)
			this._rules.splice(index, 1)
		}
		return super.removeChild(child)
	}

	get allReferences(): ValueType[] {
		const result = [] as ValueType[]
		const _thisThis = this

		Object.keys(this._members).forEach((memberName) => {
			const member = this._members[memberName]
			const referents = member.allReferences
			referents.forEach((referent) => {
				let eventualReferent = referent
				while (eventualReferent.isCollection && eventualReferent.collectedType != null) {
					eventualReferent = eventualReferent.collectedType
				}
				if (!result.includes(eventualReferent) && eventualReferent != _thisThis) result.push(eventualReferent)
			})
		})

		return result.sort(SystemComponentComparator)
	}

	get nonPrimitiveReferences(): ValueType[] {
		return this.allReferences.filter((item) => !item.primitive)
	}

	get primitiveReferences(): ValueType[] {
		return this.allReferences.filter((item) => item.primitive)
	}

	get allDependencies(): ValueType[] {
		const result = this.allReferences

		this.specifiedDependencies.forEach((reference) => {
			if (!result.includes(reference)) result.push(reference)
		})

		return result
	}

	get packageName(): string {
		const parent = this.parent as SystemDescendantComponent
		const parentName = parent.fullConstantCaseName
		const packageName = this.fullConstantCaseName.replace(`${parentName}/`, '')

		return packageName
	}

	get rules(): Rule[] {
		return this._rules
	}
}
