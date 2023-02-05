import { ProgrammingLanguage } from '../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../system/ValueType'

/**
 * Value types for sql 92.
 * TODO: update this.
 * TODO: add another version for sql2016.
 */
const Sql92MandatoryValueTypes = {} as { [key: string]: string }
Sql92MandatoryValueTypes[ValueType.object.name] = 'VARCHAR(%l) NOT NULL'
Sql92MandatoryValueTypes[ValueType.string.name] = 'VARCHAR(%l) NOT NULL'
Sql92MandatoryValueTypes[ValueType.int.name] = 'INTEGER NOT NULL'
Sql92MandatoryValueTypes[ValueType.float.name] = 'DOUBLE PRECISION NOT NULL'
Sql92MandatoryValueTypes[ValueType.boolean.name] = 'BIT NOT NULL'
Sql92MandatoryValueTypes[ValueType.dateTime.name] = 'TIMESTAMP NOT NULL'
Sql92MandatoryValueTypes[ValueType.date.name] = 'DATE NOT NULL'
Sql92MandatoryValueTypes[ValueType.time.name] = 'TIME NOT NULL'
Sql92MandatoryValueTypes[ValueType.interval.name] = 'INTERVAL NOT NULL'
Sql92MandatoryValueTypes[ValueType.decimal.name] = 'DECIMAL NOT NULL'

const Sql92OptionalValueTypes = {} as { [key: string]: string }
Sql92OptionalValueTypes[ValueType.object.name] = 'VARCHAR(%l) NULL'
Sql92OptionalValueTypes[ValueType.string.name] = 'VARCHAR(%l) NULL'
Sql92OptionalValueTypes[ValueType.int.name] = 'INTEGER NULL'
Sql92OptionalValueTypes[ValueType.float.name] = 'DOUBLE PRECISION NULL'
Sql92OptionalValueTypes[ValueType.boolean.name] = 'BIT NULL'
Sql92OptionalValueTypes[ValueType.dateTime.name] = 'TIMESTAMP NULL'
Sql92OptionalValueTypes[ValueType.date.name] = 'DATE NULL'
Sql92OptionalValueTypes[ValueType.time.name] = 'TIME NULL'
Sql92OptionalValueTypes[ValueType.interval.name] = 'INTERVAL NULL'
Sql92OptionalValueTypes[ValueType.decimal.name] = 'DECIMAL NULL'

export const SQL92_TYPE_RESOLVER = new SimpleMappedValueTypeResolver(ProgrammingLanguage.sql, Sql92MandatoryValueTypes, Sql92OptionalValueTypes)
