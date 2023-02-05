import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { ValueType } from '../../../system/ValueType'
import { PrimaryKey } from '../PrimaryKey'
import { Schema } from '../Schema'
import { Table } from '../Table'

export class RdbmsPkStitcher extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'PrimaryKey',
		})
		super(
			'A transformer that ensure primary keys are properly connected to their respective table and columns',
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
		const pk = component as PrimaryKey
		const schema = pk.parent as Schema
		const fullTableName = SystemComponent.fullConstantCase(schema.fullConstantCaseName, pk.tableName)
		const table = system.descendants[fullTableName] as Table
		if (table != null) {
			const pkColumn = table.columns[System.constantCase(pk.columnName)]
			if (pkColumn != null) {
				table.primaryKey = pkColumn
				table.addChild(pk)
				pk.column = pkColumn
			} else this.logger.warn(`PK ${pk.constantCaseFullName} has no matching column ${pk.columnName}`)
		} else this.logger.warn(`PK ${pk.constantCaseFullName} has no matching table ${fullTableName}`)

		return []
	}
}
