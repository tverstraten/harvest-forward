import { Builder } from '../../runtime/Builder'
import { RdbmsColumnStitcher } from './builders/RdbmsColumnStitcher'
import { RdbmsConstraintStitcher } from './builders/RdbmsConstraintStitcher'
import { RdbmsFkStitcher } from './builders/RdbmsFkStitcher'
import { RdbmsPkStitcher } from './builders/RdbmsPkStitcher'
import { SQL92_TYPE_RESOLVER } from './Sql92Types'

export const BUILDERS = {
	columnStitcher: (settings: any): Builder => new RdbmsColumnStitcher(settings),
	constraintStitcher: (settings: any): Builder => new RdbmsConstraintStitcher(settings),
	fkStitcher: (settings: any): Builder => new RdbmsFkStitcher(settings),
	pkStitcher: (settings: any): Builder => new RdbmsPkStitcher(settings),
}
export const TYPE_RESOLVERS = { sql: SQL92_TYPE_RESOLVER }

export * from './builders/AbstractSqlSchemaHarvester'
export * from './builders/RdbmsColumnStitcher'
export * from './builders/RdbmsConstraintStitcher'
export * from './builders/RdbmsFkStitcher'
export * from './builders/RdbmsPkStitcher'
export * from './Column'
export * from './Constraint'
export * from './Domain'
export * from './DomainValue'
export * from './ForeignKey'
export * from './PrimaryKey'
export * from './RelationalComponent'
export * from './RelationalDatabase'
export * from './RelationalStorage'
export * from './Schema'
export * from './Sql92Types'
export * from './Table'
export * from './TableType'
export * from './TableTypeInfo'
export * from './View'
