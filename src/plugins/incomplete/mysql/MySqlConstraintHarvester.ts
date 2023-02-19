import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { RelationalDatabase, Constraint } from '../../rdbms-basic'
import { AbstractMySqlSchemaHarvester } from './AbstractMySqlSchemaHarvester'

export class MySqlConstraintHarvester extends AbstractMySqlSchemaHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['queryText'] = `SELECT * FROM information_schema.CHECK_CONSTRAINTS`
		super('A harvester of basic rdbms constraints from a specified database', nonNullConfigurationValues)
	}

	protected harvestRow(system: System, __db: RelationalDatabase, row: any): Artifact[] {
		const results = [] as Artifact[]

		const newRow = new Constraint(
			row['CONSTRAINT_SCHEMA'],
			row['TABLE_NAME'],
			row['CONSTRAINT_NAME'],
			'', // column
			'',
			row['CHECK_CLAUSE']
		)

		if (this.validConstraint(newRow)) {
			system.addChild(newRow)
			results.push(new SystemComponentArtifact(newRow))
		}

		return results
	}
}
