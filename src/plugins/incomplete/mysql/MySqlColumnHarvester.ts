import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { EnumeratedValue } from '../../information-architecture'
import { RelationalDatabase, Domain, Column } from '../../rdbms-basic'
import { AbstractMySqlSchemaHarvester } from './AbstractMySqlSchemaHarvester'

export class MySqlColumnHarvester extends AbstractMySqlSchemaHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['queryText'] = `SELECT * FROM information_schema.columns`
		super('A harvester of basic rdbms columns from a specified database', nonNullConfigurationValues)
	}

	// eslint-disable-next-line max-lines-per-function
	protected harvestRow(system: System, __db: RelationalDatabase, row: any): Artifact[] {
		const results = [] as Artifact[]

		const dataType = (row['DATA_TYPE'] as string).toUpperCase()
		let valueType = this.columnTypeToValueTypeMap[dataType]
		let domain: Domain | undefined
		if (dataType.includes('ENUM')) {
			const rawColumnType = row['COLUMN_TYPE'] as string
			const valuesAsString = rawColumnType.replace(/^enum\(/, '').replace(/\)$/, '')
			const matches = valuesAsString.split(',')
			const values = [] as EnumeratedValue[]
			matches.forEach((value) => {
				const enumValue = new EnumeratedValue(`e_${value}`, 'InformationModel', '', value)
				values.push(enumValue)
			})
			domain = new Domain(row['TABLE_SCHEMA'], `${row['TABLE_NAME']}.${row['COLUMN_NAME']}`, 'The set of values for the column', rawColumnType, values)
			results.push(new SystemComponentArtifact(domain))
		}
		const nullable = row['IS_NULLABLE'] == 'YES'
		if (nullable) valueType = valueType.asOptional

		const newRow = new Column(row['TABLE_SCHEMA'], row['TABLE_NAME'], row['COLUMN_NAME'], row['COLUMN_COMMENT'], valueType, row['CHARACTER_MAXIMUM_LENGTH'])
		newRow.ordinalPosition = row['ORDINAL_POSITION']
		newRow.columnDefault = row['COLUMN_DEFAULT']
		newRow.autoIncrement = row['EXTRA'] == 'auto_increment'
		newRow.inDomain = domain

		if (this.validColumn(newRow)) {
			system.addChild(newRow)
			results.push(new SystemComponentArtifact(newRow))
		}

		return results
	}
}
