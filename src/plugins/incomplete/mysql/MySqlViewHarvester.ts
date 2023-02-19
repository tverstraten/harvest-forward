import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { RelationalDatabase, View } from '../../rdbms-basic'
import { AbstractMySqlSchemaHarvester } from './AbstractMySqlSchemaHarvester'

export class MySqlViewHarvester extends AbstractMySqlSchemaHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['queryText'] = `SELECT * FROM information_schema.views`
		super('A harvester of basic rdbms views from a specified database', nonNullConfigurationValues)
	}

	protected harvestRow(system: System, __db: RelationalDatabase, row: any): Artifact[] {
		const results = [] as Artifact[]

		const viewName = row['TABLE_NAME']
		const schemaName = row['TABLE_SCHEMA']
		const fullName = System.fullConstantCase(viewName, schemaName)
		let view = system.children[fullName] as View
		if (view == null) {
			view = new View(schemaName, viewName, '', row['description'])
			results.push(new SystemComponentArtifact(view))
		} else {
			view.queryText = row['VIEW_DEFINITION']
			if (row['description'] != null) view.description = row['description']
		}

		return results
	}
}
