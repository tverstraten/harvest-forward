import Pluralize from 'pluralize'
import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { ComponentOrigin } from '../../../system/ComponentOrigin'
import { Permanence } from '../../../system/Permanence'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { ValueType } from '../../../system/ValueType'
import { Class, ObjectTypeDataMember, Property } from '../../information-architecture'
import { ForeignKey, RelationalDatabase, Schema, Table } from '../../rdbms-basic'

export class PropertyToForeignKeyTransformer extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'Class',
			permanence: 'persistent',
			componentType: 'informationModel',
			isAbstract: false,
		})
		super(
			'A transformer that creates columns in tables for properties in classes',
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
		const rdbms = RelationalDatabase.fromSystem(system) as RelationalDatabase
		const informationClass = component as Class
		const sourceTableName = Pluralize(`${informationClass.name}`)
		const table = rdbms.findOneComponent({ name: sourceTableName }) as Table
		if (table == undefined) throw new RangeError(`Table ${sourceTableName} was not found in the database for class ${informationClass.name}`)
		const schema = table.parent as Schema

		informationClass.allDataMembers.forEach((member: ObjectTypeDataMember) => {
			const property = member as Property
			const valueType = property.type.asMandatory
			const sourceColumnName = `${property.name}Id`

			if (!valueType.primitive && valueType.objectTypeName != 'Enumeration') {
				const targetTable = Pluralize(`${valueType.name}`)
				const keyName = `FK-${sourceTableName}-${property.name}`
				const targetSchema = 'MODEL'
				const key = new ForeignKey(schema.fullConstantCaseName, sourceTableName, keyName, sourceColumnName, targetSchema, targetTable, '')
				key.permanence = Permanence.constant
				key.informational = false
				key.functional = true
				key.origin = ComponentOrigin.manufactured

				table.addChild(key)
			}
		})

		return [new SystemComponentArtifact(table)]
	}
}
