import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { RelationalDatabase } from '../../rdbms-basic'
import { AbstractMySqlSchemaHarvester } from './AbstractMySqlSchemaHarvester'

export class MySqlDomainHarvester extends AbstractMySqlSchemaHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['queryText'] = ``
		super('A harvester of basic rdbms domains from a specified database', nonNullConfigurationValues)
	}

	protected harvestRow(__system: System, __db: RelationalDatabase, __row: any): Artifact[] {
		return []
	}
}
