import { Level } from '@tverstraten/log-annotations'
import { AbstractSingularBuilder } from '../../../runtime/AbstractSingularBuilder'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { SystemComponent } from '../../../system/SystemComponent'
import { SystemComponentArtifact } from '../../../system/SystemComponentArtifact'
import { ValueType } from '../../../system/ValueType'
import { Column } from '../Column'
import { Constraint } from '../Constraint'
import { Domain } from '../Domain'
import { ForeignKey } from '../ForeignKey'
import { PrimaryKey } from '../PrimaryKey'
import { RelationalDatabase } from '../RelationalDatabase'
import { Schema } from '../Schema'
import { Table } from '../Table'
import { View } from '../View'

export abstract class AbstractSqlSchemaHarvester extends AbstractSingularBuilder {
	protected schemaRegex: RegExp

	protected tableRegex: RegExp

	protected columnRegex: RegExp

	private regexSet = false

	// eslint-disable-next-line max-lines-per-function
	constructor(description: string, configurationValues?: { [key: string]: any }) {
		super(
			description,
			{
				serverUrl: {
					name: 'Server URL',
					required: true,
					description: 'The url to the server to connect to',
					valueType: ValueType.string,
				},
				database: {
					name: 'Database Name',
					required: true,
					description: 'The name of the database in the server to connect to',
					valueType: ValueType.string,
				},
				userName: {
					name: 'User Name',
					required: true,
					description: 'The user name to present to sql server for authentication',
					valueType: ValueType.string,
				},
				password: {
					name: 'User Password',
					required: true,
					description: 'The character sequence that validates the user name',
					valueType: ValueType.string,
				},
				queryText: {
					name: 'Query Text',
					required: true,
					description: 'The sql text to execute against the database, each row of which will result in a call to harvestRow',
					valueType: ValueType.string,
					defaultValue: '.*',
				},
				schemaPattern: {
					name: 'Schema pattern',
					required: true,
					description: 'A regex used against the schema name to determine if it should be included in the harvesting',
					valueType: ValueType.string,
					defaultValue: '.*',
				},
				tablePattern: {
					name: 'Table pattern',
					required: true,
					description: 'A regex used against the non-qualified table/view name to determine if it should be included in the harvesting',
					valueType: ValueType.string,
					defaultValue: '.*',
				},
				columnPattern: {
					name: 'Column pattern',
					required: true,
					description: 'A regex used against the non-qualified column name to determine if it should be included in the harvesting',
					valueType: ValueType.string,
					defaultValue: '.*',
				},
			},
			configurationValues
		)

		this.schemaRegex = new RegExp('.*')
		this.tableRegex = new RegExp('.*')
		this.columnRegex = new RegExp('.*')
	}

	async _doesConfigurationWork(): Promise<boolean> {
		try {
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`_doesConfigurationWork(${this.name}) enter`) : ''
			await this.connect()
			// make sure the regex's can compile
			this.ensureRegexes()
			return true
		} catch (problem) {
			this.logger.error(`_doesConfigurationWork(${this.name}) failed ${problem}`)
			return false
		} finally {
			await this.disconnect()
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`_doesConfigurationWork(${this.name}) exit`) : ''
		}
	}

	protected ensureRegexes(): void {
		if (!this.regexSet) {
			// remember to look for flags
			this.schemaRegex = this.regexFromConfigurationString(this.getConfiguredValue('schemaPattern'))
			this.tableRegex = this.regexFromConfigurationString(this.getConfiguredValue('tablePattern'))
			this.columnRegex = this.regexFromConfigurationString(this.getConfiguredValue('columnPattern'))
			this.regexSet = true
		}
	}

	protected validSchema(schema: Schema): boolean {
		return this.schemaRegex.test(schema.name)
	}

	protected validTable(table: Table): boolean {
		return this.schemaRegex.test(table.nameSpace) && this.tableRegex.test(table.name)
	}

	protected validView(view: View): boolean {
		return this.schemaRegex.test(view.nameSpace) && this.tableRegex.test(view.name)
	}

	protected validColumn(column: Column): boolean {
		return this.schemaRegex.test(column.schemaName) && this.tableRegex.test(column.tableName) && this.columnRegex.test(column.name)
	}

	protected validDomain(domain: Domain): boolean {
		return this.schemaRegex.test(domain.nameSpace)
	}

	protected validForeignKey(fk: ForeignKey): boolean {
		return (
			this.schemaRegex.test(fk.schemaName) &&
			this.schemaRegex.test(fk.targetSchemaName) &&
			this.tableRegex.test(fk.sourceTableName) &&
			this.tableRegex.test(fk.targetTableName) &&
			this.columnRegex.test(fk.sourceColumnName)
		)
	}

	protected validPrimaryKey(pk: PrimaryKey): boolean {
		return this.schemaRegex.test(pk.schemaName) && this.tableRegex.test(pk.tableName) && this.columnRegex.test(pk.columnName)
	}

	protected validConstraint(constraint: Constraint): boolean {
		return this.schemaRegex.test(constraint.nameSpace) && this.tableRegex.test(constraint.name)
	}

	async buildInternal(system: System, __component: SystemComponent): Promise<Artifact[]> {
		const results = [] as Artifact[]
		try {
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`buildInternal(${system.name}) enter`) : ''
			this.ensureRegexes()

			const server = this.getConfiguredValue('serverUrl')
			const database = this.getConfiguredValue('database')
			const fullDbName = System.fullConstantCase(server, database)
			let db = system.descendants[fullDbName] as RelationalDatabase
			if (db == null) {
				db = new RelationalDatabase(server, database, '')
				system.addChild(db)
				results.push(new SystemComponentArtifact(db))
			}

			await this.connect()

			const queryResults = await this.performQuery(system)
			results.concat(queryResults)

			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`buildInternal(${system.name}) exit`) : ''
			return results
		} catch (problem) {
			this.logger.error(`buildInternal(${system.name}) failed ${problem}`)
			throw problem
		} finally {
			await this.disconnect()
		}
	}

	protected abstract connect(): void

	protected abstract performQuery(system: System): Promise<Artifact[]>

	protected abstract disconnect(): void
}
