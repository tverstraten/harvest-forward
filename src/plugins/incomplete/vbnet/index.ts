import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const VisualBasicNetMandatoryValueTypes = {} as { [key: string]: string }
VisualBasicNetMandatoryValueTypes[ValueType.object.name] = 'Object'
VisualBasicNetMandatoryValueTypes[ValueType.string.name] = 'String'
VisualBasicNetMandatoryValueTypes[ValueType.int.name] = 'Integer'
VisualBasicNetMandatoryValueTypes[ValueType.float.name] = 'double'
VisualBasicNetMandatoryValueTypes[ValueType.boolean.name] = 'bool'
VisualBasicNetMandatoryValueTypes[ValueType.dateTime.name] = 'DateTime'
VisualBasicNetMandatoryValueTypes[ValueType.date.name] = 'DateTime'
VisualBasicNetMandatoryValueTypes[ValueType.time.name] = 'DateTime'
VisualBasicNetMandatoryValueTypes[ValueType.interval.name] = 'string'
VisualBasicNetMandatoryValueTypes[ValueType.decimal.name] = 'decimal'
VisualBasicNetMandatoryValueTypes[ValueType.void.name] = 'void'

const VisualBasicNetOptionalValueTypes = {} as { [key: string]: string }
VisualBasicNetOptionalValueTypes[ValueType.object.name] = 'Object?'
VisualBasicNetOptionalValueTypes[ValueType.string.name] = 'String?'
VisualBasicNetOptionalValueTypes[ValueType.int.name] = 'Integer?'
VisualBasicNetOptionalValueTypes[ValueType.float.name] = 'double?'
VisualBasicNetOptionalValueTypes[ValueType.boolean.name] = 'bool?'
VisualBasicNetOptionalValueTypes[ValueType.dateTime.name] = 'DateTime?'
VisualBasicNetOptionalValueTypes[ValueType.date.name] = 'DateTime?'
VisualBasicNetOptionalValueTypes[ValueType.time.name] = 'DateTime?'
VisualBasicNetOptionalValueTypes[ValueType.interval.name] = 'string?'
VisualBasicNetOptionalValueTypes[ValueType.decimal.name] = 'decimal?'
VisualBasicNetOptionalValueTypes[ValueType.void.name] = 'void'

export const typeResolvers = {
	VisualBasicNet: new SimpleMappedValueTypeResolver(ProgrammingLanguage.visualBasicNet, VisualBasicNetMandatoryValueTypes, VisualBasicNetOptionalValueTypes),
}

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
