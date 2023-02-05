import { System } from '../../system/System'
import { SystemComponentType } from '../../system/SystemComponentType'
import { Column } from './Column'
import { RelationalComponent } from './RelationalComponent'

export class PrimaryKey extends RelationalComponent {
	private _tableName: string

	columnName: string

	column?: Column

	constructor(schemaName: string, tableName: string, name: string, columnName: string, description: string) {
		super('PrimaryKey', System.fullConstantCase(schemaName, tableName), schemaName, name, SystemComponentType.storage, description)
		this._tableName = tableName
		this.columnName = columnName
	}

	get tableName(): string {
		return this._tableName
	}

	set tableName(value: string) {
		this._tableName = value
		this.setNames(this.name, System.fullConstantCase(this.schemaName, this._tableName))
	}

	set nameSpace(value: string) {
		super.nameSpace = value
		const lastSlash = value.lastIndexOf('/')
		this._tableName = value.substring(lastSlash + 1)
		this.schemaName = value.substring(0, lastSlash)
	}
}
