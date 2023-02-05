import * as ChangeCase from 'change-case'
import { ComponentOrigin } from './ComponentOrigin'
import { Describable } from './Describable'
import { Nameable } from './Nameable'
import { Permanence } from './Permanence'
import { StringIdentifiable } from './StringIdentifiable'
import { SystemComponent } from './SystemComponent'
import { SystemComponentType } from './SystemComponentType'
// eslint-disable-next-line spellcheck/spell-checker
import { v4 as uuidv4 } from 'uuid'

/**
 * TODO: items like permanence, test, etc need to be refactored to be features or tags in a generic manner so that at least at the root level, the
 * system structure is not opinionated.
 */
export class SystemDescendantComponent extends SystemComponent implements StringIdentifiable, Nameable, Describable {
	readonly id: string

	private _name: string

	private _constantCaseName: string

	private _pascalCaseName?: string

	private _snakeCaseName?: string

	private _camelCaseName?: string

	private _nameSpace: string

	private _constantCaseNameSpace: string

	private _pascalCaseNameSpace?: string

	private _snakeCaseNameSpace?: string

	private _camelCaseNameSpace?: string

	private _fullConstantCaseName = ''

	description: string

	permanence?: Permanence

	readonly objectTypeName: string

	origin?: ComponentOrigin

	informational = false

	functional = false

	isExternal = false

	isTest = false

	constructor(objectType: string, nameSpace: string, name: string, componentType: SystemComponentType, description: string) {
		super(componentType)
		if (objectType == null) throw new RangeError(`objectType cannot be null`)
		if (name == null) throw new RangeError(`name cannot be null`)
		if (nameSpace == null) throw new RangeError(`nameSpace cannot be null`)
		this.objectTypeName = objectType
		// eslint-disable-next-line spellcheck/spell-checker
		this.id = uuidv4()
		this._name = SystemComponent.normalizePathSlashes(name)
		this._nameSpace = SystemComponent.normalizePathSlashes(nameSpace)
		this._constantCaseName = ''
		this._constantCaseNameSpace = ''
		this.setNames(nameSpace, name)
		this.description = description
	}

	get name(): string {
		return this._name
	}

	set name(value: string) {
		this.setNames(this._nameSpace, value)
	}

	disconnectRecursion(): void {
		super.disconnectRecursion()
		const thisAny = this as any
		for (const [key, value] of Object.entries(this)) {
			if (key === 'parent' || value instanceof SystemDescendantComponent) {
				const newName = `sysref_${key}`
				thisAny[newName] = value.constantCaseFullName
				delete thisAny[key]
			}
		}
	}

	reconnectRecursion(system: SystemComponent): void {
		const thisAny = this as any
		for (const [key, value] of Object.entries(this)) {
			if (key.startsWith('sysref_')) {
				//SystemDescendantComponent
				const realName = key.substring(7)
				const referencedValue = system.descendants[value]
				thisAny[realName] = referencedValue ? referencedValue : system
				delete thisAny[key]
			}
		}
		super.reconnectRecursion(system)
	}

	protected setNames(nameSpace: string, name: string): void {
		this._name = SystemComponent.normalizePathSlashes(name)
		this._nameSpace = SystemComponent.normalizePathSlashes(nameSpace)

		this._constantCaseName = SystemComponent.constantCase(this._name)

		// using constant case directly removes slashes which is wrong in name space's
		this._constantCaseNameSpace = SystemComponent.constantCase(this._nameSpace, true)

		this._pascalCaseName = undefined
		this._snakeCaseName = undefined
		this._camelCaseName = undefined
		this._pascalCaseNameSpace = undefined
		this._snakeCaseNameSpace = undefined
		this._camelCaseNameSpace = undefined
		const oldFullConstantCaseName = this._fullConstantCaseName
		this._fullConstantCaseName = `${this._constantCaseNameSpace}/${this._constantCaseName}`

		// now the parent caching
		if (this.parent != null) {
			delete this.parent.children[oldFullConstantCaseName]
			this.parent.children[this._fullConstantCaseName] = this
			if (this.parent instanceof SystemDescendantComponent) this.parent.updateDescendentName(oldFullConstantCaseName, this)
		}
	}

	protected updateDescendentName(oldFullConstantCaseName: string, descendant: SystemDescendantComponent): void {
		delete this.descendants[oldFullConstantCaseName]
		this.descendants[descendant._fullConstantCaseName] = descendant

		if (this.parent != null && this.parent instanceof SystemDescendantComponent) {
			this.parent.updateDescendentName(oldFullConstantCaseName, descendant)
		}
	}

	get constantCaseName(): string {
		return this._constantCaseName
	}

	get fullConstantCaseName(): string {
		return this._fullConstantCaseName
	}

	get pascalCaseName(): string {
		if (this._pascalCaseName == null) this._pascalCaseName = ChangeCase.pascalCase(this._constantCaseName)
		return this._pascalCaseName as string
	}

	get snakeCaseName(): string {
		if (this._snakeCaseName == null) this._snakeCaseName = ChangeCase.snakeCase(this._constantCaseName)
		return this._snakeCaseName as string
	}

	get camelCaseName(): string {
		if (this._camelCaseName == null) this._camelCaseName = ChangeCase.camelCase(this._constantCaseName)
		return this._camelCaseName as string
	}

	get nameSpace(): string {
		return this._nameSpace
	}

	set nameSpace(value: string) {
		this._nameSpace = value
		this.setNames(value, this._name)
	}

	get constantCaseNameSpace(): string {
		return this._constantCaseNameSpace
	}

	get pascalCaseNameSpace(): string {
		if (this._pascalCaseNameSpace == null) {
			this._pascalCaseNameSpace = ''
			const pieces = this._constantCaseNameSpace.split('/')
			pieces.forEach((piece) => {
				if (this._pascalCaseNameSpace !== '') this._pascalCaseNameSpace += '/'
				this._pascalCaseNameSpace += ChangeCase.pascalCase(piece)
			})
		}
		return this._pascalCaseNameSpace
	}

	get snakeCaseNameSpace(): string {
		if (this._snakeCaseNameSpace == null) {
			this._snakeCaseNameSpace = ''
			const pieces = this._constantCaseNameSpace.split('/')
			pieces.forEach((piece) => {
				if (this._snakeCaseNameSpace !== '') this._snakeCaseNameSpace += '/'
				this._snakeCaseNameSpace += ChangeCase.snakeCase(piece)
			})
		}

		return this._snakeCaseNameSpace
	}

	get camelCaseNameSpace(): string {
		if (this._camelCaseNameSpace == null) {
			this._camelCaseNameSpace = ''
			const pieces = this._constantCaseNameSpace.split('/')
			pieces.forEach((piece) => {
				if (this._camelCaseNameSpace !== '') this._camelCaseNameSpace += '/'
				this._camelCaseNameSpace += ChangeCase.camelCase(piece)
			})
		}

		return this._camelCaseNameSpace
	}

	get constantCaseFullName(): string {
		return this._fullConstantCaseName
	}
}
