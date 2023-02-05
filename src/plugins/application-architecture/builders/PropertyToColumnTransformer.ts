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
import { Property } from '../../information-architecture'
import { Column, RelationalDatabase, Schema, Table } from '../../rdbms-basic'
import { LengthRule } from '../../validation'

export class PropertyToColumnTransformer extends AbstractSingularBuilder {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['repeatFor'] = JSON.stringify({
			objectTypeName: 'Property',
			permanence: 'persistent',
			componentType: 'informationModel',
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
		const property = component as Property
		const informationClass = property.parent as Class

		const tableName = Pluralize(`${informationClass.name}`)
		const table = rdbms.findOneComponent({ name: tableName }) as Table
		if (table == undefined) throw new RangeError(`Table ${tableName} was not found in the database for property ${property.name}`)
		const schema = table.parent as Schema
		const columnName = `${property.name}`
		const columnDescription = property.description
		let dataType
		const valueType = property.type
		let ansiTypeDeclaration
		const hasLengthRule = property.rules?.find((rule) => rule instanceof LengthRule)
		const length = hasLengthRule ? (hasLengthRule as LengthRule).length : 255
		switch (property.type) {
			case ValueType.dateTime:
				dataType = 'DATETIME'
				ansiTypeDeclaration = 'DATETIME'
				break
			case ValueType.float:
				dataType = 'NUMBER'
				ansiTypeDeclaration = 'NUMBER'
				break
			case ValueType.boolean:
				dataType = 'BIT'
				ansiTypeDeclaration = 'BIT'
				break
			case ValueType.dateTime:
				dataType = 'DATETIME'
				ansiTypeDeclaration = 'DATETIME'
				break
			default:
				dataType = `VARCHAR(${length})`
				ansiTypeDeclaration = `VARCHAR(${length})`
		}
		const column = new Column(schema.fullConstantCaseName, tableName, columnName, columnDescription, dataType, valueType, length, ansiTypeDeclaration)
		column.permanence = Permanence.constant
		column.informational = false
		column.ansiTypeDeclaration = ansiTypeDeclaration
		column.functional = true
		column.origin = ComponentOrigin.manufactured
		column.isIdentity = columnName == 'id'
		if (column.isIdentity) table.primaryKey = column
		table.addChild(column)

		return [new SystemComponentArtifact(column)]
	}
}
