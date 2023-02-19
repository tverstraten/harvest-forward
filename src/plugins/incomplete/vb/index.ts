import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const VisualBasicMandatoryValueTypes = {} as { [key: string]: string }
VisualBasicMandatoryValueTypes[ValueType.object.name] = 'Object'
VisualBasicMandatoryValueTypes[ValueType.string.name] = 'String'
VisualBasicMandatoryValueTypes[ValueType.int.name] = 'long'
VisualBasicMandatoryValueTypes[ValueType.float.name] = 'double'
VisualBasicMandatoryValueTypes[ValueType.boolean.name] = 'bool'
VisualBasicMandatoryValueTypes[ValueType.dateTime.name] = 'DateTime'
VisualBasicMandatoryValueTypes[ValueType.date.name] = 'DateTime'
VisualBasicMandatoryValueTypes[ValueType.time.name] = 'DateTime'
VisualBasicMandatoryValueTypes[ValueType.interval.name] = 'string'
VisualBasicMandatoryValueTypes[ValueType.decimal.name] = 'decimal'

const VisualBasicOptionalValueTypes = {} as { [key: string]: string }
VisualBasicOptionalValueTypes[ValueType.object.name] = 'Object?'
VisualBasicOptionalValueTypes[ValueType.string.name] = 'String?'
VisualBasicOptionalValueTypes[ValueType.int.name] = 'long?'
VisualBasicOptionalValueTypes[ValueType.float.name] = 'double?'
VisualBasicOptionalValueTypes[ValueType.boolean.name] = 'bool?'
VisualBasicOptionalValueTypes[ValueType.dateTime.name] = 'DateTime?'
VisualBasicOptionalValueTypes[ValueType.date.name] = 'DateTime?'
VisualBasicOptionalValueTypes[ValueType.time.name] = 'DateTime?'
VisualBasicOptionalValueTypes[ValueType.interval.name] = 'string?'
VisualBasicOptionalValueTypes[ValueType.decimal.name] = 'decimal?'

export const typeResolvers = {
	// eslint-disable-next-line id-length
	VisualBasic: new SimpleMappedValueTypeResolver(ProgrammingLanguage.visualBasic, VisualBasicMandatoryValueTypes, VisualBasicOptionalValueTypes),
}

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
