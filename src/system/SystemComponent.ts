import * as ChangeCase from 'change-case'
import { SystemComponentType } from './SystemComponentType'

export abstract class SystemComponent {
	/**
	 * NOTE: since this is indexed by name all child objects must have a unique name.
	 */
	private _children: Record<string, SystemComponent>

	/**
	 * NOTE: since this is indexed by full name all descendant objects must have a unique full name.
	 */
	private _descendants: Record<string, SystemComponent>

	parent?: SystemComponent

	private _componentType: SystemComponentType

	constructor(componentType: SystemComponentType) {
		this._children = {}
		this._descendants = {}
		this._componentType = componentType
	}

	disconnectRecursion(): void {
		Object.values(this._children).forEach((element) => {
			element.disconnectRecursion()
		})
	}

	reconnectRecursion(system: SystemComponent): void {
		Object.values(this._children).forEach((element) => {
			element.reconnectRecursion(system)
		})
	}

	static constantCase(name: string, preserveSlashes = false): string {
		let constantCaseName = ''
		if (preserveSlashes) {
			const pieces = name.split('/')
			pieces.forEach((piece) => {
				if (constantCaseName !== '') constantCaseName += '/'
				constantCaseName += ChangeCase.constantCase(piece)
			})
		} else constantCaseName = ChangeCase.constantCase(name)

		return this.normalizePathSlashes(constantCaseName.replace(/[\\ !#\.]/g, '/'))
	}

	static normalizePathSlashes(name: string): string {
		return name.replace(/^\//, '').replace(/\/$/, '').replace(/\/\//, '/')
	}

	static fullConstantCase(nameSpace: string, name: string): string {
		const adjustedNameSpace = this.constantCase(nameSpace, true)
		const adjustedName = this.constantCase(name)
		return `${adjustedNameSpace}/${adjustedName}`
	}

	get componentType(): SystemComponentType {
		return this._componentType
	}

	set componentType(newValue: SystemComponentType) {
		this._componentType = newValue
	}

	get children(): Record<string, SystemComponent> {
		return this._children
	}

	hasChild(component: SystemComponent): boolean {
		const fullName = (component as any).fullConstantCaseName
		return this._children[fullName] != null
	}

	addChild(child: SystemComponent): void {
		if (!this.hasChild(child)) {
			const fullName = (child as any).fullConstantCaseName
			this._children[fullName] = child
			child.parent = this
			this.addDescendant(child)
		}
	}

	removeChild(child: SystemComponent): boolean {
		if (this.hasChild(child)) {
			const fullName = (child as any).fullConstantCaseName
			delete this._children[fullName]
			this.removeDescendant(child)
			child.parent = undefined
			return true
		}
		return false
	}

	removeChildByName(childName: string): boolean {
		if (!childName) throw RangeError(`childName must be defined`)
		const child = this._children[childName]
		return child ? this.removeChild(child) : false
	}

	get descendants(): Record<string, SystemComponent> {
		return this._descendants
	}

	hasDescendant(component: SystemComponent): boolean {
		const fullName = (component as any).fullConstantCaseName
		return this._descendants[fullName] != null
	}

	protected addDescendant(component: SystemComponent): void {
		if (!this.hasDescendant(component)) {
			const fullName = (component as any).fullConstantCaseName
			this._descendants[fullName] = component

			if (this.parent != null) this.parent.addDescendant(component)

			Object.values(component.descendants).forEach((grandDescendant) => {
				this.addDescendant(grandDescendant)
				//this.parent?.addDescendant(grandDescendant)
			})
		}
	}

	removeDescendant(component: SystemComponent): void {
		if (this.hasDescendant(component)) {
			const fullName = (component as any).fullConstantCaseName
			delete this._descendants[fullName]
			if (this.parent != null) this.parent.removeDescendant(component)

			Object.values(component._children).forEach((grandChild) => {
				this.removeDescendant(grandChild)
			})
		}
	}

	findComponentsByString(searchString: string): SystemComponent[] {
		if (searchString == null || searchString.length == 0) return [this]
		try {
			const searchJson = JSON.parse(searchString)
			return this.findComponents(searchJson)
		} catch (problem) {
			throw new RangeError(`Cannot extract search criteria from JSON string ${searchString}`)
		}
	}

	findOneComponent(search: Record<string, string | number | boolean | (string | number | boolean)[]>): SystemComponent | undefined {
		const results = this._findComponents(search, true) // throws error if more than 1 found
		if (results.length === 1) return results[0]
		return undefined
	}

	/**
	 * Get the components that match the specified search. Search is a json encoded string that has property values
	 * of system components that are used to match against actual components. That is, if you want transient components only
	 * specify "permanence": "transient". In the case of multiple values for the same property provide an array such as
	 * "permanence": ["transient","constant"].
	 *
	 * @param search - The search specification string. This is a json encoded object where by the key represents a property of a system component
	 * and the value represents the matching value. This is generally a string and coerced into other forms as needed, it can also be a regex if it
	 * starts and ends with a forward slash / (like a regex string). It can also be an array of strings in which case an item will be matched if it has
	 * the value of either of those, thus it behaves like a logical OR.
	 * @returns All components that match the specified criteria.
	 */
	findComponents(search: Record<string, string | number | boolean | (string | number | boolean)[]>): SystemComponent[] {
		return this._findComponents(search)
	}

	findByFullName(fullConstantCaseName: string): SystemComponent[] {
		const searchValues = Array.isArray(fullConstantCaseName) ? fullConstantCaseName : [fullConstantCaseName]
		let matched = [] as SystemComponent[]
		searchValues.forEach((searchValue) => {
			const found = this.descendants[searchValue]
			if (found) matched = [found]
		})
		return matched
	}

	private transformSearchCriteria(search: Record<string, string | number | boolean | (string | number | boolean)[]>): Record<string, (string | number)[]> {
		const searchEntries = Object.entries(search)
		const adjustedSearch = {} as Record<string, (string | number)[]>
		for (const [key, searchValueSpec] of searchEntries) {
			const searchValues = Array.isArray(searchValueSpec) ? searchValueSpec : [searchValueSpec]
			const adjustedSearchValues = [] as any[]
			searchValues.forEach((searchValue) => {
				// regex
				if (typeof searchValue === 'string' && searchValue.startsWith('/') && searchValue.endsWith('/')) {
					const regexString = searchValue.substring(1, searchValue.length - 1)
					const searchRegex = new RegExp(regexString)
					adjustedSearchValues.push(searchRegex)
				} else adjustedSearchValues.push(searchValue)
			})
			adjustedSearch[key] = adjustedSearchValues
		}

		return adjustedSearch
	}

	private doesObjectMatch(adjustedSearchEntries: [string, (string | number)[]][], component: any): boolean {
		let matches = true
		for (const [key, searchValues] of adjustedSearchEntries) {
			const componentValue = component[key]
			let oneValueMatches = false

			searchValues.forEach((searchValue: any) => {
				// regex
				if (searchValue instanceof RegExp && typeof componentValue === 'string') {
					if (componentValue.match(searchValue)) oneValueMatches = true
				} else if (searchValue == componentValue) {
					oneValueMatches = true
				}
			})

			if (!oneValueMatches) matches = false
		}

		return matches
	}

	/**
	 * Get the components that match the specified search. Search is a json encoded string that has property values
	 * of system components that are used to match against actual components. That is, if you want transient components only
	 * specify "permanence": "transient". In the case of multiple values for the same property provide an array such as
	 * "permanence": ["transient","constant"].
	 *
	 * @param search - The search specification string. This is a json encoded object where by the key represents a property of a system component
	 * and the value represents the matching value. This is generally a string and coerced into other forms as needed, it can also be a regex if it
	 * starts and ends with a forward slash / (like a regex string). It can also be an array of strings in which case an item will be matched if it has
	 * the value of either of those, thus it behaves like a logical OR.
	 * @param stopAtOne - If true, the search is supposed to stop at on,e if more than one is found an error will be thrown.
	 * @returns All components that match the specified criteria.
	 */
	private _findComponents(search: Record<string, string | number | boolean | (string | number | boolean)[]>, stopAtOne = false): SystemComponent[] {
		if (search == null || Object.keys(search).length === 0) return [this]

		// TODO: reduce the size of dependants here by using indexed value of the search properties
		const searchedName = search['fullConstantCaseName'] as string
		if (searchedName) return this.findByFullName(searchedName)

		// transform the search object into something closer to what we need to use for the search comparisons
		const adjustedSearch = this.transformSearchCriteria(search)

		const matchedComponents = [] as SystemComponent[]
		const descendants = Object.values(this.descendants)
		const adjustedSearchEntries = Object.entries(adjustedSearch)
		for (let index = 0; index < descendants.length; index++) {
			const component = descendants[index] as any
			const matches = this.doesObjectMatch(adjustedSearchEntries, component)
			if (matches && !matchedComponents.includes(component)) {
				matchedComponents.push(component)

				if (stopAtOne && matchedComponents.length > 1) throw RangeError(`More than 1 component matched ${JSON.stringify(search)}`)
			}
		}

		return matchedComponents
	}
}
