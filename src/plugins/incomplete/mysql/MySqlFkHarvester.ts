import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { RelationalDatabase, ForeignKey } from '../../rdbms-basic'
import { AbstractMySqlSchemaHarvester } from './AbstractMySqlSchemaHarvester'

export class MySqlFkHarvester extends AbstractMySqlSchemaHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['queryText'] = `SELECT * FROM information_schema.KEY_COLUMN_USAGE WHERE CONSTRAINT_NAME <> 'PRIMARY'`
		super('A harvester of basic rdbms foreign keys from a specified database', nonNullConfigurationValues)
	}

	protected harvestRow(system: System, __db: RelationalDatabase, row: any): Artifact[] {
		const results = [] as Artifact[]

		const newRow = new ForeignKey(
			row['TABLE_SCHEMA'],
			row['TABLE_NAME'],
			row['CONSTRAINT_NAME'],
			row['COLUMN_NAME'],
			row['REFERENCED_TABLE_SCHEMA'],
			row['REFERENCED_TABLE_NAME'],
			''
		)

		if (this.validForeignKey(newRow)) {
			system.addChild(newRow)
			results.push(new SystemComponentArtifact(newRow))
		}

		return results
	}
}
