import Pluralize from 'pluralize'
import { SystemComponent } from '../../system/SystemComponent'
import { SystemComponentType } from '../../system/SystemComponentType'
import { Column } from './Column'
import { RelationalComponent } from './RelationalComponent'
import { Schema } from './Schema'
import { TableType } from './TableType'

export class RelationalStorage extends RelationalComponent {
	tableType: TableType

	private _pluralName: string

	private _singularName: string

	private _columns: { [key: string]: Column }

	// eslint-disable-next-line max-params
	constructor(objectType: string, schema: Schema, tableName: string, description: string, tableType: TableType, componentType: SystemComponentType) {
		super(objectType, schema.fullConstantCaseName, schema.name, tableName, componentType, description)
		this.tableType = tableType
		this._columns = {}

		if (!Pluralize.isPlural(tableName) && Pluralize.isSingular(tableName)) {
			this._singularName = tableName
			this._pluralName = Pluralize.plural(tableName)
		} else {
			this._singularName = Pluralize.singular(tableName)
			this._pluralName = tableName
		}
	}

	protected setNames(nameSpace: string, name: string): void {
		super.setNames(nameSpace, name)

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

	get columns(): { [key: string]: Column } {
		return this._columns
	}

	addChild(child: SystemComponent): void {
		super.addChild(child)
		this.database.addDescendant(child)
		if (child instanceof Column) this._columns[child.constantCaseName] = child
	}

	removeChild(child: SystemComponent): boolean {
		this.database.removeDescendant(child)
		if (child instanceof Column) delete this._columns[child.constantCaseName]
		return super.removeChild(child)
	}
}
