import { SystemComponentType } from '../../system/SystemComponentType'
import { SystemDescendantComponent } from '../../system/SystemDescendantComponent'
import { RelationalDatabase } from './RelationalDatabase'

export class RelationalComponent extends SystemDescendantComponent {
	private _schemaName: string

	// eslint-disable-next-line max-params
	constructor(objectType: string, nameSpace: string, schemaName: string, name: string, type: SystemComponentType, description: string) {
		super(objectType, nameSpace, name, type, description)
		this._schemaName = schemaName
	}

	get database(): RelationalDatabase {
		return this.parent as RelationalDatabase
	}

	get schemaName(): string {
		return this._schemaName
	}

	set schemaName(value: string) {
		this._schemaName = value
	}
}
