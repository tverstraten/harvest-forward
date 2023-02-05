import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { ValueType } from '../../../system/ValueType'
import { Column } from '../Column'
import { Schema } from '../Schema'
import { Table } from '../Table'
import { View } from '../View'

export class RdbmsColumnStitcher extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'Column',
		})
		super(
			'An transformer that take rdbms columns and ensures that they are attached as children to their containing table',
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
		const column = component as Column
		const schema = column.parent as Schema
		const fullTableName = SystemComponent.fullConstantCase(schema.constantCaseFullName, column.tableName)
		const storage = system.descendants[fullTableName] as Table | View
		if (storage != null) {
			storage.addChild(column)
			column.storage = storage
		} else this.logger.warn(`Column  ${column.constantCaseFullName} has no matching storage named ${fullTableName}`)

		return []
	}
}
