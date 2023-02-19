import Pluralize from 'pluralize'
import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { ComponentOrigin } from '../../../system/ComponentOrigin'
import { Permanence } from '../../../system/Permanence'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { ValueType } from '../../../system/ValueType'
import { Class } from '../../information-architecture'
import { RelationalDatabase, Schema, Table, TableType } from '../../rdbms-basic'

export class ClassToTableTransformer extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'Class',
			permanence: 'persistent',
			componentType: 'informationModel',
			isAbstract: false,
		})
		super(
			'A transformer that creates a table in an rdbms database for each concrete class in the model',
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

	// eslint-disable-next-line max-lines-per-function
	protected async buildInternal(system: System, component: SystemComponent): Promise<Artifact[]> {
		const rdbms = RelationalDatabase.fromSystem(system)

		const informationClass = component as Class
		const results = []

		// find schema, if not exists create
		const schemaName = 'MODEL'
		const fullSchemaName = System.fullConstantCase(rdbms.fullConstantCaseName, schemaName)
		let schema = rdbms.descendants[fullSchemaName] as Schema
		if (schema == null) {
			schema = new Schema(rdbms.fullConstantCaseName, schemaName, '')
			rdbms.addChild(schema)
			results.push(new SystemComponentArtifact(schema))
		}

		// first search for table
		const tableName = Pluralize(`${informationClass.name}`)
		const fullTableName = System.fullConstantCase(schema.fullConstantCaseName, tableName)
		let table = schema.descendants[fullTableName] as Table

		if (!table) {
			const tableDescription = informationClass.description
			table = new Table(schema, tableName, tableDescription, TableType.table)
			table.permanence = Permanence.constant
			table.informational = false
			table.functional = true
			table.origin = ComponentOrigin.manufactured
			schema.addChild(table)
			results.push(new SystemComponentArtifact(table))
		}

		return results
	}
}
