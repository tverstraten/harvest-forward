import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { ValueType } from '../../../system/ValueType'
import { ForeignKey } from '../ForeignKey'
import { RelationalDatabase } from '../RelationalDatabase'
import { Schema } from '../Schema'
import { Table } from '../Table'

export class RdbmsFkStitcher extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'ForeignKey',
		})
		super(
			'A transformer that collects foreign keys and ensures their relationships and names are rationalized with their related tables',
			{
				repeatFor: {
					name: 'Repeat for',
					required: true,
					description:
						'A parsable string of JSON that represents the properties values of the component that should be iterated on, review the documentation for SystemDescendantComponent and derivations for most available for use',
					valueType: ValueType.string,
					defaultValue: ``,
				},
			},
			nonNullConfigurationValues
		)
	}

	async buildInternal(system: System, component: SystemComponent): Promise<Artifact[]> {
		const fk = component as ForeignKey
		const schema = fk.parent as Schema
		const sourceTableName = SystemComponent.fullConstantCase(schema.fullConstantCaseName, fk.sourceTableName)
		const sourceTable = system.descendants[sourceTableName] as Table
		if (sourceTable != null) {
			const fkColumn = sourceTable.columns[System.constantCase(fk.sourceColumnName)]
			sourceTable.addChild(fk)
			if (fkColumn != null) {
				fkColumn.foreignKey = fk
				fk.sourceColumn = fkColumn
				fk.sourceTable = sourceTable
			} else this.logger.warn(`FK ${fk.constantCaseFullName} has no matching column ${fk.sourceColumnName}`)
		} else this.logger.warn(`FK ${fk.constantCaseFullName} has no matching table ${sourceTableName}`)

		// target could be in a different schema
		const db = schema.parent as RelationalDatabase
		const fullTargetSchemaName = SystemComponent.fullConstantCase(db.fullConstantCaseName, fk.targetSchemaName)
		const targetSchema = system.descendants[fullTargetSchemaName] as Table
		const fullTargetTableName = SystemComponent.fullConstantCase(targetSchema.fullConstantCaseName, fk.targetTableName)
		const targetTable = system.descendants[fullTargetTableName] as Table
		if (targetTable != null) {
			fk.targetTable = targetTable
		}

		return []
	}
}
