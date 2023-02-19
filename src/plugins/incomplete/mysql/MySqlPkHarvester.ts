import { System } from 'typescript'
import { Artifact } from '../../../system/Artifact'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { RelationalDatabase, PrimaryKey } from '../../rdbms-basic'
import { AbstractMySqlSchemaHarvester } from './AbstractMySqlSchemaHarvester'

export class MySqlPkHarvester extends AbstractMySqlSchemaHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['queryText'] = `SELECT * FROM information_schema.KEY_COLUMN_USAGE WHERE CONSTRAINT_NAME = 'PRIMARY'`
		super('A harvester of basic rdbms primary keys from a specified database', nonNullConfigurationValues)
	}

	protected harvestRow(system: System, __db: RelationalDatabase, row: any): Artifact[] {
		const results = [] as Artifact[]

		const newRow = new PrimaryKey(row['TABLE_SCHEMA'], row['TABLE_NAME'], row['CONSTRAINT_NAME'], row['COLUMN_NAME'], '')

		if (this.validPrimaryKey(newRow)) {
			system.addChild(newRow)
			results.push(new SystemComponentArtifact(newRow))
		}

		return results
	}
}
