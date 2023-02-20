/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const CSharpValueTypes: Map<ValueType, string> = new Map<ValueType, string>([
	[ValueType.object, 'Object'],
	[ValueType.string, 'string'],
	[ValueType.int, 'long'],
	[ValueType.float, 'double'],
	[ValueType.boolean, 'bool'],
	[ValueType.dateTime, 'DateTime'],
	[ValueType.date, 'DateTime'],
	[ValueType.time, 'DateTime'],
	[ValueType.interval, 'string'],
	[ValueType.decimal, 'decimal'],
	[ValueType.void, 'void'],
	[ValueType.object.asOptional, 'Object?'],
	[ValueType.string.asOptional, 'string?'],
	[ValueType.int.asOptional, 'long?'],
	[ValueType.float.asOptional, 'double?'],
	[ValueType.boolean.asOptional, 'bool?'],
	[ValueType.dateTime.asOptional, 'DateTime?'],
	[ValueType.date.asOptional, 'DateTime?'],
	[ValueType.time.asOptional, 'DateTime?'],
	[ValueType.interval.asOptional, 'string?'],
	[ValueType.decimal.asOptional, 'decimal?'],
	[ValueType.void.asOptional, 'void'],
])

export const typeResolvers = {
	CSharp: new SimpleMappedValueTypeResolver(ProgrammingLanguage.cSharp, CSharpValueTypes),
}

export const templates = {
	Enum: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Enum.handlebars`).toString() },
	Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() },
	Poco_generated: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.generated.handlebars`).toString() },
}
