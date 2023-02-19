import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const CSharpMandatoryValueTypes = {} as { [key: string]: string }
CSharpMandatoryValueTypes[ValueType.object.name] = 'Object'
CSharpMandatoryValueTypes[ValueType.string.name] = 'string'
CSharpMandatoryValueTypes[ValueType.int.name] = 'long'
CSharpMandatoryValueTypes[ValueType.float.name] = 'double'
CSharpMandatoryValueTypes[ValueType.boolean.name] = 'bool'
CSharpMandatoryValueTypes[ValueType.dateTime.name] = 'DateTime'
CSharpMandatoryValueTypes[ValueType.date.name] = 'DateTime'
CSharpMandatoryValueTypes[ValueType.time.name] = 'DateTime'
CSharpMandatoryValueTypes[ValueType.interval.name] = 'string'
CSharpMandatoryValueTypes[ValueType.decimal.name] = 'decimal'
CSharpMandatoryValueTypes[ValueType.void.name] = 'void'
CSharpMandatoryValueTypes[ValueType.object.name] = 'Object?'
CSharpMandatoryValueTypes[ValueType.string.name] = 'string?'
CSharpMandatoryValueTypes[ValueType.int.name] = 'long?'
CSharpMandatoryValueTypes[ValueType.float.name] = 'double?'
CSharpMandatoryValueTypes[ValueType.boolean.name] = 'bool?'
CSharpMandatoryValueTypes[ValueType.dateTime.name] = 'DateTime?'
CSharpMandatoryValueTypes[ValueType.date.name] = 'DateTime?'
CSharpMandatoryValueTypes[ValueType.time.name] = 'DateTime?'
CSharpMandatoryValueTypes[ValueType.interval.name] = 'string?'
CSharpMandatoryValueTypes[ValueType.decimal.name] = 'decimal?'
CSharpMandatoryValueTypes[ValueType.void.name] = 'void'

export const typeResolvers = {
	CSharp: new SimpleMappedValueTypeResolver(ProgrammingLanguage.cSharp, CSharpMandatoryValueTypes),
}

export const templates = {
	Enum: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Enum.handlebars`).toString() },
	Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() },
	Poco_generated: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.generated.handlebars`).toString() },
}
