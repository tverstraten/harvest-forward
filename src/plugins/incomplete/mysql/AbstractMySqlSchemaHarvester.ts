import { Level } from '@tverstraten/log-annotations'
import { Artifact } from '../../../system/Artifact'
import { System } from '../../../system/System'
import { ValueType } from '../../../system/ValueType'
import { AbstractSqlSchemaHarvester, RelationalDatabase } from '../../rdbms-basic'
import mariadb from 'mariadb'

export abstract class AbstractMySqlSchemaHarvester extends AbstractSqlSchemaHarvester {
	private pool?: mariadb.Pool

	private _connection?: mariadb.PoolConnection

	columnTypeToValueTypeMap = {
		TINYINT: ValueType.int,
		BOOLEAN: ValueType.boolean,
		SMALLINT: ValueType.int,
		MEDIUMINT: ValueType.int,
		INT: ValueType.int,
		INTEGER: ValueType.int,
		BIGINT: ValueType.int,
		DECIMAL: ValueType.decimal,
		DEC: ValueType.decimal,
		NUMERIC: ValueType.float,
		FIXED: ValueType.float,
		NUMBER: ValueType.float,
		FLOAT: ValueType.float,
		DOUBLE: ValueType.float,
		BIT: ValueType.boolean,
		INT1: ValueType.int,
		INT2: ValueType.int,
		INT3: ValueType.int,
		INT4: ValueType.int,
		INT8: ValueType.int,
		CHAR: ValueType.string,
		VARCHAR: ValueType.string,
		BINARY: ValueType.string,
		CHARBYTE: ValueType.string,
		VARBINARY: ValueType.string,
		TINYBLOB: ValueType.string,
		BLOB: ValueType.string,
		MEDIUMBLOB: ValueType.string,
		LONGBLOB: ValueType.string,
		TINYTEXT: ValueType.string,
		TEXT: ValueType.string,
		MEDIUMTEXT: ValueType.string,
		LONGTEXT: ValueType.string,
		INET6: ValueType.string,
		JSON: ValueType.string,
		SET: ValueType.string,
		ENUM: ValueType.string,
		DATE: ValueType.date,
		TIME: ValueType.dateTime,
		DATETIME: ValueType.dateTime,
		TIMESTAMP: ValueType.dateTime,
		YEAR: ValueType.int,
	} as { [key: string]: ValueType }

	protected connection(): mariadb.PoolConnection {
		if (this._connection == null) throw RangeError(`Not connected`)
		return this._connection
	}

	protected async connect(): Promise<void> {
		try {
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`connect(${this.name}) enter`) : ''
			this.pool = mariadb.createPool({
				host: this.getConfiguredValue('serverUrl'),
				user: this.getConfiguredValue('userName'),
				password: this.getConfiguredValue('password'),
				connectionLimit: 5,
			})
			this._connection = await this.pool.getConnection()
			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`connect(${this.name}) exit`) : ''
		} catch (problem) {
			this.logger.error(`connect(${this.name}) failed ${problem}`)
			throw problem
		}
	}

	protected async disconnect(): Promise<void> {
		this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`disconnect() enter`) : ''
		if (this.connection != null) this._connection?.release()
	}

	protected abstract harvestRow(system: System, db: RelationalDatabase, row: any): Artifact[]

	protected async performQuery(system: System): Promise<Artifact[]> {
		this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`performQuery(${this.name}) enter`) : ''
		try {
			const server = this.getConfiguredValue('serverUrl')
			const database = this.getConfiguredValue('database')
			const queryText = this.getConfiguredValue('queryText')
			const fullDbName = System.fullConstantCase(server, database)
			const db = system.descendants[fullDbName] as RelationalDatabase

			const request = await this.connection().query(queryText)
			const results = [] as Artifact[]
			if (request.recordset != null) {
				this.logger.isLevelEnabled(Level.debug)
					? this.logger.debug(`performQuery(${this.name}) decoding data with ${request.recordsets.length} recordsets`)
					: ''
				request.recordsets.forEach((recordset: any) => {
					recordset.forEach((row: any) => {
						const rowResults = this.harvestRow(system, db, row)
						rowResults.forEach((rowArtifact) => results.push(rowArtifact))
					})
				})
			}

			this.logger.isLevelEnabled(Level.debug) ? this.logger.debug(`performQuery(${this.name}) exit`) : ''
			return results
		} catch (problem) {
			this.logger.error(`performQuery(${this.name}) failed ${problem}`)
			throw problem
		}
	}

	protected getValueToValueTypeMap(): { [key: string]: ValueType } {
		return this.columnTypeToValueTypeMap
	}
}
