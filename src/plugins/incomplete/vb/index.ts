/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs'
import { ProgrammingLanguage } from '../../../system/ProgrammingLanguage'
import { SimpleMappedValueTypeResolver } from '../../../system/SimpleMappedValueTypeResolver'
import { ValueType } from '../../../system/ValueType'

const VisualBasicValueTypes: Map<ValueType, string> = new Map<ValueType, string>([
	[ValueType.object, 'Object'],
	[ValueType.string, 'String'],
	[ValueType.int, 'long'],
	[ValueType.float, 'double'],
	[ValueType.boolean, 'bool'],
	[ValueType.dateTime, 'DateTime'],
	[ValueType.date, 'DateTime'],
	[ValueType.time, 'DateTime'],
	[ValueType.interval, 'string'],
	[ValueType.decimal, 'decimal'],
	[ValueType.object.asOptional, 'Object?'],
	[ValueType.string.asOptional, 'String?'],
	[ValueType.int.asOptional, 'long?'],
	[ValueType.float.asOptional, 'double?'],
	[ValueType.boolean.asOptional, 'bool?'],
	[ValueType.dateTime.asOptional, 'DateTime?'],
	[ValueType.date.asOptional, 'DateTime?'],
	[ValueType.time.asOptional, 'DateTime?'],
	[ValueType.interval.asOptional, 'string?'],
	[ValueType.decimal.asOptional, 'decimal?'],
])

export const typeResolvers = {
	// eslint-disable-next-line id-length
	VisualBasic: new SimpleMappedValueTypeResolver(ProgrammingLanguage.visualBasic, VisualBasicValueTypes),
}

export const templates = { Poco: { type: 'handlebars', contents: (): string => fs.readFileSync(`${__dirname}/Poco.handlebars`).toString() } }
