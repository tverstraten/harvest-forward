import Pluralize from 'pluralize'
import { SystemComponentType } from '../../system/SystemComponentType'
import { DomainValue } from './DomainValue'
import { RelationalComponent } from './RelationalComponent'

export class Domain extends RelationalComponent {
	private _pluralName: string

	private _singularName: string

	definition?: string

	values: DomainValue[]

	constructor(schemaName: string, name: string, description: string, definition: string, values?: DomainValue[]) {
		super('Domain', schemaName, schemaName, name, SystemComponentType.storage, description)
		this.definition = definition
		this.values = values == null ? [] : values

		if (!Pluralize.isPlural(name) && Pluralize.isSingular(name)) {
			this._singularName = name
			this._pluralName = Pluralize.plural(name)
		} else {
			this._singularName = Pluralize.singular(name)
			this._pluralName = name
		}
	}

	protected setNames(name: string, nameSpace: string): void {
		super.setNames(name, nameSpace)

		if (!Pluralize.isPlural(name) && Pluralize.isSingular(name)) {
			this._singularName = name
			this._pluralName = Pluralize.plural(name)
		} else {
			this._singularName = Pluralize.singular(name)
			this._pluralName = name
		}
	}

	get singularName(): string {
		return this._singularName
	}

	get pluralName(): string {
		return this._pluralName
	}
}
