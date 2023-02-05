import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { ValueType } from '../../../system/ValueType'
import { Constraint } from '../Constraint'
import { Schema } from '../Schema'
import { Table } from '../Table'

export class RdbmsConstraintStitcher extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'Constraint',
		})
		super(
			'A transformer that ensures that constraints are properly connected to their related tables and values',
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
		const constraint = component as Constraint
		const schema = constraint.parent as Schema
		const fullTableName = SystemComponent.fullConstantCase(schema.constantCaseFullName, constraint.schemaName)
		const table = system.descendants[fullTableName] as Table
		if (table != null) {
			if (constraint.columnName != null) {
				const constraintColumn = table.columns[System.constantCase(constraint.columnName)]
				constraintColumn.constraint = constraint
				table.addChild(constraint)
				constraint.table = table
				constraint.column = constraintColumn
			} else table.addChild(constraint)
		} else this.logger.warn(`Constraint has no matching table ${constraint.constantCaseFullName}`)

		return []
	}
}
