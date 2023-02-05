import { System } from '../../system/System'
import { SystemComponentType } from '../../system/SystemComponentType'
import { Column } from './Column'
import { RelationalComponent } from './RelationalComponent'
import { Table } from './Table'

export class Constraint extends RelationalComponent {
	tableName: string

	table?: Table

	columnName?: string

	column?: Column

	checkClause: string

	// eslint-disable-next-line max-params
	constructor(schemaName: string, tableName: string, name: string, columnName: string, description: string, checkClause: string) {
		super('Constraint', System.fullConstantCase(schemaName, tableName), schemaName, name, SystemComponentType.storage, description)
		this.tableName = tableName
		this.columnName = columnName
		this.checkClause = checkClause
	}
}
