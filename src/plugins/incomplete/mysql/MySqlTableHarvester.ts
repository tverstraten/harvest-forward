import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { RelationalDatabase, TableTypeInfo, TableType, Table, View } from '../../rdbms-basic'
import { AbstractMySqlSchemaHarvester } from './AbstractMySqlSchemaHarvester'

export class MySqlTableHarvester extends AbstractMySqlSchemaHarvester {
	constructor(configurationValues?: { [key: string]: any }) {
		const nonNullConfigurationValues = configurationValues ? configurationValues : []
		nonNullConfigurationValues['queryText'] = `SELECT * FROM information_schema.tables`
		super('A harvester of basic rdbms tables from a specified database', nonNullConfigurationValues)
	}

	protected harvestRow(system: System, __db: RelationalDatabase, row: any): Artifact[] {
		const results = [] as Artifact[]

		const name = row['TABLE_NAME']
		if (TableTypeInfo.hasName(row['TABLE_TYPE'])) {
			const type = TableTypeInfo.fromName(row['TABLE_TYPE'])
			if (type == TableType.table) {
				const newRow = new Table(row['TABLE_SCHEMA'], name, row['TABLE_COMMENT'], TableTypeInfo.fromName(row['TABLE_TYPE']))

				if (this.validTable(newRow)) {
					system.addChild(newRow)
					results.push(new SystemComponentArtifact(newRow))
				}
			} else {
				const fullName = System.fullConstantCase(name, row['TABLE_SCHEMA'])
				const view = system.children[fullName] as View
				if (view == null) {
					const newRow = new View(row['TABLE_SCHEMA'], name, '', row['TABLE_COMMENT'])

					if (this.validView(newRow)) {
						system.addChild(newRow)
						results.push(new SystemComponentArtifact(newRow))
					}
				}
			}
		}

		return results
	}
}
