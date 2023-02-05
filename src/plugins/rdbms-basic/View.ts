import { SystemComponentType } from '../../system/SystemComponentType'
import { Column } from './Column'
import { RelationalStorage } from './RelationalStorage'
import { Schema } from './Schema'
import { TableType } from './TableType'

export class View extends RelationalStorage {
	queryText: string

	updateable = false

	baseTableName?: string

	baseTableSchemaName?: string

	discriminatorColumn?: Column

	discriminatorValue?: string

	constructor(schema: Schema, viewName: string, queryText: string, description: string) {
		super('View', schema, viewName, description, TableType.view, SystemComponentType.storageProjection)
		this.queryText = queryText
	}
}
