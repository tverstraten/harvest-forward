import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../system/ValueType'

/**
 * Value types for sql 92.
 * TODO: update this.
 * TODO: add another version for sql2016.
 */
const Sql92ValueTypes: Map<ValueType, string> = new Map<ValueType, string>([
	[ValueType.object, 'VARCHAR'],
	[ValueType.string, 'VARCHAR'],
	[ValueType.int, 'INTEGER'],
	[ValueType.float, 'DOUBLE PRECISION'],
	[ValueType.boolean, 'SMALLINT'],
	[ValueType.dateTime, 'TIMESTAMP'],
	[ValueType.date, 'DATE'],
	[ValueType.time, 'TIME'],
	[ValueType.interval, 'INTERVAL'],
	[ValueType.decimal, 'DECIMAL'],
	[ValueType.object.asOptional, 'VARCHAR'],
	[ValueType.string.asOptional, 'VARCHAR'],
	[ValueType.int.asOptional, 'INTEGER'],
	[ValueType.float.asOptional, 'DOUBLE'],
	[ValueType.boolean.asOptional, 'BIT'],
	[ValueType.dateTime.asOptional, 'TIMESTAMP'],
	[ValueType.date.asOptional, 'DATE'],
	[ValueType.time.asOptional, 'TIME'],
	[ValueType.interval.asOptional, 'INTERVAL'],
	[ValueType.decimal.asOptional, 'DECIMAL'],
])

export const SQL92_TYPE_RESOLVER = new SimpleMappedValueTypeResolver(ProgrammingLanguage.sql, Sql92ValueTypes)
