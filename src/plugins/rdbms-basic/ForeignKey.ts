import { System } from '../../system/System'
import { SystemComponentType } from '../../system/SystemComponentType'
import { Column } from './Column'
import { RelationalComponent } from './RelationalComponent'
import { Table } from './Table'

export class ForeignKey extends RelationalComponent {
	sourceTableName: string

	sourceTableFullName: string

	sourceTable?: Table

	sourceColumnName: string

	sourceColumn?: Column

	targetSchemaName: string

	targetTableName: string

	targetTableFullName: string

	targetTable?: Table

	// eslint-disable-next-line max-params
	constructor(
		sourceSchemaName: string,
		sourceTableName: string,
		name: string,
		sourceColumnName: string,
		targetSchemaName: string,
		targetTableName: string,
		description: string
	) {
		super('ForeignKey', System.fullConstantCase(sourceSchemaName, sourceTableName), sourceSchemaName, name, SystemComponentType.storage, description)
		this.sourceTableName = sourceTableName
		this.sourceColumnName = sourceColumnName
		this.targetSchemaName = targetSchemaName
		this.targetTableName = targetTableName
		this.sourceTableFullName = System.fullConstantCase(sourceSchemaName, sourceTableName)
		this.targetTableFullName = System.fullConstantCase(targetSchemaName, targetTableName)
	}
}
